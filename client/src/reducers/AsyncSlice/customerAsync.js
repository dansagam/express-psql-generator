import { createAsyncThunk } from "@reduxjs/toolkit";
import {
   addCustomerFunc,
   deleteCustomerFunc,
   getCustomerByIdFunc,
   getCustomersFunc,
   updateCustomerFunc
} from "../../asyncFunction/customerAsyncFunc";

export const getCustomersFromServer = createAsyncThunk('customer/getCustomersFromServer',
   async ({ keyword = '' }, { getState, rejectWithValue }) => {
      try {
         const { data } = await getCustomersFunc(keyword)
         return data.data
      } catch (err) {
         return rejectWithValue(err.response)
      }
   }
)
export const getCustomerByIdFromServer = createAsyncThunk('customer/getCustomerByIdFromServer',
   async (id, { rejectWithValue }) => {
      try {
         const { data } = await getCustomerByIdFunc(id)
         return data.data
      } catch (err) {
         return rejectWithValue(err.response)
      }
   }
)
export const addNewCustomerToServer = createAsyncThunk('customer/addNewCustomerToServer',
   async (newData, { rejectWithValue }) => {
      try {
         const { first_name, last_name, middle_name, mobile_number, additional_phone_number, age, dob } = newData

         const posted = {
            first_name: first_name,
            middle_name: middle_name,
            last_name: last_name,
            mobile_number: mobile_number,
            additional_phone_number: additional_phone_number,
            age: age,
            dob: dob
         }
         const config = {
            headers: {
               "Content-Type": "application/json"
            }
         }

         const { data } = await addCustomerFunc(posted, config)
         return data.data
      } catch (err) {
         return rejectWithValue(err.response)
      }
   }
)


export const deleteCustomerFromServer = createAsyncThunk('customer/deleteCustomerFromServer',
   async (id, { rejectWithValue }) => {
      try {
         const { data } = await deleteCustomerFunc(id)
         return data.data
      } catch (err) {
         return rejectWithValue(err.response)
      }
   }
)

export const updatedCustomerToServer = createAsyncThunk('customer/updatedCustomerToServer',
   async (receivedData, { rejectWithValue }) => {
      try {
         const { _id, first_name, last_name, middle_name, mobile_number, age, dob } = receivedData

         const posted = {
            first_name: first_name,
            middle_name: middle_name,
            last_name: last_name,
            mobile_number: mobile_number,
            age: age,
            dob: dob
         }
         const config = {
            headers: {
               "Content-Type": "application/json"
            }
         }
         const { data } = await updateCustomerFunc(_id, posted, config)
         return data.data
      } catch (err) {
         return rejectWithValue(err.response)
      }

   }
)