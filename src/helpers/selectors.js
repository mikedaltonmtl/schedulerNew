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
  });
}