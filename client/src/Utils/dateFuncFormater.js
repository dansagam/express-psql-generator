export const transformDate = (dateString) => {
   const options = { year: 'numeric', month: 'short', day: '2-digit' }
   const date = new Date(dateString)
   return date.toLocaleDateString(undefined, options)
}
export const currentAge = (dateString) => {
   let myDate = new Date(dateString)
   let diffDate = (Date.now() - myDate.getTime())
   return Math.round(diffDate / 31557600000)
}
export const currentAgeDatePicker = (dataString) => {
   let diffDate = (Date.now() - dataString.getTime())
   return Math.round(diffDate / 31557600000)
}

export const phoneNumberFormat = (phoneNumber) => {
   //normalised the phone number format
   if (!phoneNumber) {
      return phoneNumber
   } else {
      phoneNumber = phoneNumber.replace(/[^\d]/g, '')
      // if(phoneNumber.length ===3){
      //    return phoneNumber.replace(/(\d{3})/, '$1-')
      // }
      if (phoneNumber.length === 6) {
         return phoneNumber.replace(/(\d{3})(\d{3})/, '$1-$2')

      } else if (phoneNumber.length === 10 || phoneNumber.length > 6) {
         return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")
      }
      return phoneNumber

   }
}

export const phoneTestFunc = (inputTxt) => {
   // let phoneMatch = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/
   // const phoneMatch = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
   // const phoneMatch = /^\+?([0-9]?)\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
   // const phoneMatch = /^\+?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
   const phoneMatch = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
   if (inputTxt.match(phoneMatch)) {
      return true
   } else return false
}
