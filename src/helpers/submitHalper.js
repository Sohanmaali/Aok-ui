// // src/utils/validationHelper.js

// import { object } from 'prop-types'

// export const submitHalper = (initialValues, validationRules, dispatch) => {
//   const errors = {}

//   Object.keys(validationRules).forEach((field) => {
//     const fieldRules = validationRules[field]
//     const value = initialValues[field] || '' // Default to an empty string if value is undefined or null
//     console.log(`${field}`, typeof value)

//     if (value !== object && fieldRules.required && !value.trim()) {
//       errors[field] = `${field.replace('_', ' ')} is required`
//     }
//     // Add more validation rules here if needed
//   })

//   if (Object.keys(errors).length > 0) {
//     // Dispatch the errors
//     dispatch({ type: 'SET_ERRORS', payload: errors })
//     return false // Validation failed
//   }

//   // No errors, return the form values
//   return initialValues
// }

// src/utils/validationHelper.js
// src/utils/validationHelper.js

import { object } from 'prop-types'

const isValidDate = (date) => {
  const parsedDate = Date.parse(date)
  return !isNaN(parsedDate) && new Date(parsedDate).toISOString().split('T')[0] === date
}

export const submitHalper = (initialValues, validationRules, dispatch) => {
  const errors = {}

  Object.keys(validationRules).forEach((field) => {
    const fieldRules = validationRules[field]
    const value = initialValues[field] || '' // Default to an empty string if value is undefined or null
    const stringValue = String(value).trim() // Ensure value is a string and trim it
    // console.log(`${field}`, typeof stringValue)

    if (fieldRules.required && !stringValue) {
      errors[field] = `${field.replace('_', ' ')} is required`
    }

    // Check if the field is supposed to be a date and validate it
    if (fieldRules.type === 'date' && !isValidDate(value)) {
      errors[field] = `${field.replace('_', ' ')} is not a valid date`
    }

    // Add more validation rules here if needed
  })

  if (Object.keys(errors).length > 0) {
    // Dispatch the errors
    dispatch({ type: 'SET_ERRORS', payload: errors })
    return false // Validation failed
  }

  // No errors, return the form values
  return initialValues
}
