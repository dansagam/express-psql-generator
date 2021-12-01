
import {
   Grid,
   TextField,
   Button,
   Box,
   // Alert,
} from '@mui/material'
// import Stack from '@mui/material/Stack';
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AppForm from '../../modules/AppForm/AppForm'
import { addNewCustomerToServer } from '../../reducers/AsyncSlice/customerAsync'
import { currentAgeDatePicker, phoneNumberFormat, phoneTestFunc } from '../../Utils/dateFuncFormater'
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterDateFns'
import DatePicker from '@mui/lab/DatePicker';
// import { clearError, clearSuccess } from '../../reducers/customerSlice'
// import AdapterDateFns from '@mui/lab/AdapterDayjs';
const CustomerNew = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const [value, setValue] = useState(null);
   const { success } = useSelector(({ customer }) => customer)
   const [firstName, setFirstName] = useState('')
   const [lastName, setLastName] = useState('')
   const [middleName, setMiddleName] = useState('')
   const [phoneNumber, setPhoneNumber] = useState('')
   const [aphoneNumber, setAPhoneNumber] = useState('')
   const [age, setAge] = useState(0)
   const [pMsg, setPMsg] = useState(false)
   const [apMsg, setAPMsg] = useState(false)
   const handleChange = useCallback((e) => {
      if (e.target.name === 'first_name') {
         return setFirstName(e.target.value)
      } else if (e.target.name === 'last_name') {
         return setLastName(e.target.value)
      } else if (e.target.name === 'middle_name') {
         return setMiddleName(e.target.value)
      } else if (e.target.name === 'mobile_number') {
         if (e.target.value.length > 12) {
            return setPhoneNumber(phoneNumber)
         } else {
            if (phoneTestFunc(e.target.value)) {
               setPMsg(false)
            } else {
               setPMsg(true)
            }
            return setPhoneNumber(phoneNumberFormat(e.target.value))
         }
      } else if (e.target.name === 'additional_phone_number') {
         if (e.target.value.length > 12) {
            return setAPhoneNumber(aphoneNumber)
         } else {
            if (phoneTestFunc(e.target.value)) {
               setAPMsg(false)
            } else {
               setAPMsg(true)
            }
            return setAPhoneNumber(phoneNumberFormat(e.target.value))
         }
      } else if (e.target.name === 'age') {
         return setAge(e.target.value)
      } else return
   }, [aphoneNumber, phoneNumber])
   const newData = {
      first_name: firstName,
      middle_name: middleName,
      last_name: lastName,
      age: age,
      mobile_number: phoneNumber,
      additional_phone_number: aphoneNumber || '',
      dob: value
   }

   const handleSubmit = (event) => {
      event.preventDefault();
      if (apMsg && pMsg) {
         return
      }
      dispatch(addNewCustomerToServer(newData))
      navigate('/customers')
   };
   // console.log(value)
   // console.log(currentAgeDatePicker(value))
   useEffect(() => {
      if (success.addSuccess) {
         navigate('/customers')
      }
   }, [success, navigate])
   return (
      <LocalizationProvider dateAdapter={DateAdapter}>
         <AppForm>
            <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 6 }}>
               <Grid container spacing={2} flexWrap={'wrap'}>
                  <Grid item xs={12} sm={6}>
                     <TextField
                        id='first-name-input'
                        name='first_name'
                        label='First Name'
                        type='text'
                        value={firstName}
                        onChange={handleChange}
                     />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                     <TextField
                        id='last-name-input'
                        name='last_name'
                        label='Last Name'
                        type='text'
                        value={lastName}
                        onChange={handleChange}
                     />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                     <TextField
                        id='middle-name-input'
                        name='middle_name'
                        label='Middle Name'
                        type='text'
                        value={middleName}
                        onChange={handleChange}
                     />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                     <TextField
                        id="age-input"
                        name="age"
                        label="Age"
                        type="number"
                        value={age}
                        readOnly
                     // onChange={handleChange}
                     />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                     <TextField
                        error={pMsg}
                        id="mpn_input"
                        name="mobile_number"
                        label="Mobile Number"
                        type="text"
                        value={phoneNumber}
                        onChange={handleChange}
                     />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                     <TextField
                        error={apMsg}
                        id="aphn-input"
                        name="additional_phone_number"
                        label="Addition Number"
                        type="text"
                        value={aphoneNumber}
                        onChange={handleChange}
                     />
                  </Grid>
               </Grid>
               <Grid item xs={12} sm={12} sx={{ mt: 2 }}>
                  <DatePicker
                     label="Date of Birth"
                     value={value}
                     onChange={(newValue) => {
                        setValue(newValue);
                        setAge(currentAgeDatePicker(newValue))
                     }}
                     renderInput={(params) => <TextField {...params} />}
                  />
               </Grid>
               <Grid item xs={12} sm={12} sx={{ mt: 2 }}>
                  <Button variant="contained" color="primary" type="submit">
                     Submit
                  </Button>
               </Grid>
            </Box>

         </AppForm>

      </LocalizationProvider>
   )
}
// <Paper sx={{
//    flexGrow: 1,
//    minWidth: 400, margin: 'auto', mt: 4,
//    maxWidth: 500, overflow: 'hidden', px: 3
// }}>
//    <form onSubmit={''}>
//       <Grid container alignItems={'center'} justifyContent={'center'}
//          columns={{ xs: 4, sm: 8, md: 12 }}
//          minWidth={'500px'} sx={{ mt: 3 }}
//       >
//          <Grid item xs={4} sm={4} md={4}>
//             <TextField
//                id="name-input"
//                name="first_name"
//                label="First Name"
//                type="text"
//                value={'firstName'}
//                arial-
//                onChange={'handleChange'}
//             />
//          </Grid>
//          <Grid item>
//             <Button variant="contained" color="primary" type="submit">
//                Submit
//             </Button>
//          </Grid>
//       </Grid>
//    </form>
// </Paper>

export default CustomerNew
