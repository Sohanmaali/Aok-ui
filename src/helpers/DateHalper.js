// DateHelper.js
class DateHelper {
  // Static method to format a date as 'MM/DD/YYYY'
  static formatDate(date) {
    if (!(date instanceof Date)) {
      throw new Error('Invalid date')
    }
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const year = date.getFullYear()
    return `${month}/${day}/${year}`
  }

  // Static method to format a date as 'YYYY-MM-DD'
  static formatDateISO(date) {
    if (!(date instanceof Date)) {
      throw new Error('Invalid date')
    }
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  // Static method to get the difference in days between two dates
  static dateDiffInDays(date1, date2) {
    if (!(date1 instanceof Date) || !(date2 instanceof Date)) {
      throw new Error('Invalid dates')
    }
    const timeDiff = Math.abs(date2.getTime() - date1.getTime())
    return Math.ceil(timeDiff / (1000 * 3600 * 24))
  }
}

export default DateHelper
