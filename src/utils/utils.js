export const getBetweenTwoDates = (date1, date2) => {
  let dTimes = new Date(date1) - new Date(date2)

  let dMins = parseInt(dTimes / (1000 * 60))
  let dHours = parseInt(dMins / 60)
  let dDays = parseInt(dHours / 24)
  let dMonths = parseInt(dDays / 30)
  let dYears = parseInt(dMonths / 12)

  if (dMins < 60) {
    return { value: dMins, unit: dMins > 1 ? 'minutes' : 'minute' }
  } else if ((dHours > 0) & (dHours < 24)) {
    return { value: dHours, unit: dHours > 1 ? 'hours' : 'hour' }
  } else if (dDays > 0 & (dDays < 30)) {
    return { value: dDays, unit: dDays > 1 ? 'days' : 'day' }
  } else if ((dMonths < 30) & (dMonths > 0)) {
    return { value: dMonths, unit: dMonths > 1 ? 'months' : 'month' }
  } else {
    return { value: dYears, unit: dYears > 1 ? 'years' : 'year' }
  }
}
