import React, { useState, useCallback, useEffect } from 'react'
import {
   Grid,
   TextField,
   Button,
   Paper,
   Alert,
   // Stack
} from '@mui/material'
// import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { currentAge, currentAgeDatePicker, phoneNumberFormat, phoneTestFunc } from '../../Utils/dateFuncFormater';
import { useDispatch, useSelector } from 'react-redux';
import {
   getCustomerByIdFromServer,
   updatedCustomerToServer
} from '../../reducers/AsyncSlice/customerAsync';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Link, useParams } from 'react-router-dom';
import { clearError, clearSuccess } from '../../reducers/customerSlice';
import DatePicker from '@mui/lab/DatePicker';


const CustomerEdit = () => {
   const dispatch = useDispatch()
   const { customerId } = useParams()
   const [value, setValue] = useState(null);
   const { customer, success } = useSelector(({ customer }) => customer)
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
      } else if (e.target.name === 'mobile_phone_number') {
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
      } else if (e.target.name === 'additional_number') {
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

   let newData = {
      _id: customer._id,
      first_name: firstName,
      middle_name: middleName,
      last_name: lastName,
      age: age,
      mobile_number: phoneNumber,
      dob: customer.dob
   }
   const handleSubmit = (event) => {
      event.preventDefault();
      if (apMsg && pMsg) {
         return
      }
      dispatch(updatedCustomerToServer(newData))
   };

   useEffect(() => {
      if (!customer.first_name) {
         dispatch(getCustomerByIdFromServer(customerId))
      } else {
         setFirstName(customer.first_name)
         setLastName(customer.last_name)
         setMiddleName(customer.middle_name)
         setPhoneNumber(phoneNumberFormat(customer.mobile_number))
         setAge(currentAge(customer.dob))
         setAPhoneNumber(phoneNumberFormat(customer.additional_phone_number))
         setValue(customer.dob)
      }
      return () => {
         dispatch(clearError())
         dispatch(clearSuccess())
      }

   }, [dispatch, customerId, customer])
   return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
         <Paper sx={{
            flexGrow: 1,
            minWidth: 400, margin: 'auto', mt: 4,
            maxWidth: 500, overflow: 'hidden', px: 3
         }}>
            {success.updateSuccess && <Alert variant='success'>Customer Details updated</Alert>}
            <form onSubmit={handleSubmit}>
               <Grid container alignItems="center"
                  justifyContent={'center'} spacing={2}
                  justify="center"
                  columns={{ xs: 4, sm: 8, md: 12 }}
                  minWidth={'500px'} sx={{ mt: 3 }}
               >
                  <Grid item xs={4} sm={4} md={4}>
                     <TextField
                        id="name-input"
                        name="first_name"
                        label="First Name"
                        type="text"
                        value={firstName}
                        onChange={handleChange}
                     />
                  </Grid>
                  <Grid item xs={4} sm={4} md={4}>
                     <TextField
                        id="name-input"
                        name="middle_name"
                        label="Middle Name"
                        type="text"
                        value={middleName}
                        onChange={handleChange}
                     />
                  </Grid>
                  <Grid item xs={4} sm={4} md={4}>
                     <TextField
                        id="name-input"
                        name="last_name"
                        label="Last Name"
                        type="text"
                        value={lastName}
                        onChange={handleChange}
                     />
                  </Grid>
                  <Grid item xs={4} sm={4} md={4}>
                     <TextField
                        id="age-input"
                        name="age"
                        label="Age"
                        type="number"
                        value={age}
                        readOnly
                     />
                  </Grid>
                  <Grid item xs={4} sm={4} md={4}>
                     <TextField
                        error={pMsg}
                        id="mpn_input"
                        name="mobile_phone_number"
                        label="Mobile Number"
                        type="text"
                        value={phoneNumber}
                        onChange={handleChange}
                     />
                  </Grid>
                  <Grid item xs={2} sm={4} md={4}>
                     <TextField
                        error={apMsg}
                        id="aphn-input"
                        name="additional_number"
                        label="Addition Number"
                        type="text"
                        value={aphoneNumber}
                        onChange={handleChange}
                     />
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
                  <Grid item>
                     <Button variant="contained" color="primary" type="submit">
                        Submit
                     </Button>
                  </Grid>
                  <Grid item>
                     <Button variant="contained" color="primary" type="submit">
                        <Link to={'/customernew'} style={{ textDecoration: "none", color: "inherit" }} >
                           Add new Customer
                        </Link>
                     </Button>
                  </Grid>
               </Grid>
            </form>
         </Paper>

      </LocalizationProvider>
   )
}

export default CustomerEdit
