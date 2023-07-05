export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments (appointment objects) for that day
  const dayObject = state.days.find(dayElement => dayElement.name === day);

  if (!dayObject) {
    return [];
  }
  
  return dayObject.appointments.map(id => {
    for (const appointment of Object.values(state.appointments)) {
      if (id === appointment.id) {
        return appointment;
      }
    }
    return false;
  });
};

export function getInterviewersForDay(state, day) {
  //... returns an array of interviewers (interviewer objects) for that day
  const dayObject = state.days.find(dayElement => dayElement.name === day);

  if (!dayObject) {
    return [];
  }
  
  return dayObject.interviewers.map(id => {
    for (const interviewer of Object.values(state.interviewers)) {
      if (id === interviewer.id) {
        return interviewer;
      }
    }
    return false;
  });
};

export function getInterview(state, interview) {
  // replace interview id with interview object
  return interview ? { ...interview, interviewer: state.interviewers[interview.interviewer] } : null;
};