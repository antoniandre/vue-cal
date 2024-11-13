/**
 * Converts minutes in the day to a percentage position.
 *
 * @param {Number} minutes time in minutes
 */
export const minutesToPercentage = (minutes, config) => {
  const dayRangeMinutes = config.timeTo - config.timeFrom
  return (minutes - config.timeFrom) * 100 / dayRangeMinutes
}

/**
 * Converts percentage position to minutes in the day.
 *
 * @param {Number} percentage time in percentage
 */
export const percentageToMinutes = (percentage, config) => {
  const dayRangeMinutes = config.timeTo - config.timeFrom
  return ~~((percentage * dayRangeMinutes / 100) + config.timeFrom)
}
