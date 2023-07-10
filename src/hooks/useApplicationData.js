import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then(all => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, []);

  // Calculate the new value of available spots for the day in State
  // It will NOT update state directly, but will return an up to date days array to be put in state
  const updateDaySpots = function(updatedAppointments) {

    // Get the day object and update the empty spots for the selected day
    const selectedDay = Object.values(state.days).find(day => day.name === state.day);

    const nbSpots = selectedDay.appointments.filter(appointmentId => {
      return updatedAppointments[appointmentId].interview === null;
    }).length;


    // Just for fun..... the reduce method!
    // const reducerSpots = selectedDay.appointments.reduce((spots, appointmentId) => {
    //   return updatedAppointments[appointmentId].interview === null ? spots + 1 : spots;
    // }, 0);
    // console.log('reducerSpots', reducerSpots);


    const updatedDays = [ ...state.days ];
    return updatedDays.map(day => {
      if (day.name === selectedDay.name) {
        day.spots = nbSpots;
      }
      return day;
    });
  };

  const bookInterview = function(id, interview) {
    // Make copy of our appointment object & add the new interview object
    const appointment = { ...state.appointments[id], interview: { ...interview } };
    // Update the appointments array with the appointment we just created
    const appointments = { ...state.appointments, [id]: appointment };
    // Update the database
    return axios.put(`/api/appointments/${id}`, {
      interview: interview
    })
    .then(() => {
      // Avoid stale state, pass updated appointments to update the day
      setState(prev => ({ ...prev, appointments, days: updateDaySpots(appointments)}));
    });
  };

  // To cancel an interview, we need to set the interview object to null
  const cancelInterview = function(id) {
    // Make copy of our appointment object & add set the interview object to null
    const appointment = { ...state.appointments[id], interview: null };
    // Update the appointments array with the cancelled appointment
    const appointments = { ...state.appointments, [id]: appointment };
    // Update the database
    return axios.delete(`/api/appointments/${id}`, {
      interview: null
    })
    // Update state with this new appointments array
    .then(() => {
      setState(prev => ({ ...prev, appointments, days: updateDaySpots(appointments)}));
    });
  };

  return { state, setDay, bookInterview, cancelInterview };
};