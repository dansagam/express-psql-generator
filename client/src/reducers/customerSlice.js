import { createSlice } from "@reduxjs/toolkit";
import { addNewCustomerToServer, deleteCustomerFromServer, getCustomerByIdFromServer, getCustomersFromServer, updatedCustomerToServer } from "./AsyncSlice/customerAsync";
export const DEFAULT_STATE = {
   customers: [],
   customer: { first_name: '' },
   isLoading: false,
   success: {
      getSuccess: false,
      getAllSuccess: false,
      addSuccess: false,
      updateSuccess: false,
      deleteSuccess: false
   },
   customerError: {
      msg: '',
      status: null
   }
}
export const customerSlice = createSlice({
   name: 'customer',
   initialState: DEFAULT_STATE,
   reducers: {
      clearError: (state, action) => {
         return {
            ...state,
            customerError: {
               msg: '',
               status: null
            }
         }
      },
      clearSuccess: (state, action) => {
         return {
            ...state,
            success: {
               getSuccess: false,
               getAllSuccess: false,
               addSuccess: false,
               updateSuccess: false,
               deleteSuccess: false
            }
         }
      }

   },
   extraReducers: {
      [getCustomersFromServer.pending]: (state, action) => {
         return {
            ...state,
            isLoading: true
         }
      },
      [getCustomersFromServer.fulfilled]: (state, action) => {
         if (action.payload != null && typeof action.payload !== 'undefined') {
            return {
               ...state,
               isLoading: false,
               customers: action.payload,
               success: {
                  getSuccess: false,
                  addSuccess: false,
                  updateSuccess: false,
                  deleteSuccess: false,
                  getAllSuccess: true
               }
            }
         } else {
            return state
         }
      },
      [getCustomersFromServer.rejected]: (state, action) => {
         return {
            ...state,
            isLoading: false,
            customerError: {
               msg: action.payload.data.message,
               status: action.payload.status
            }
         }
      },
      [getCustomerByIdFromServer.pending]: (state, action) => {
         return {
            ...state,
            isLoading: true
         }
      },
      [getCustomerByIdFromServer.fulfilled]: (state, action) => {
         if (action.payload != null && typeof action.payload !== 'undefined') {
            return {
               ...state,
               isLoading: false,
               customer: action.payload,
               success: {
                  getSuccess: true,
                  addSuccess: false,
                  updateSuccess: false,
                  deleteSuccess: false,
                  getAllSuccess: true
               }
            }
         } else {
            return state
         }
      },
      [getCustomerByIdFromServer.rejected]: (state, action) => {
         return {
            ...state,
            isLoading: false,
            customerError: {
               msg: action.payload.data.message,
               status: action.payload.status
            }
         }
      },
      [addNewCustomerToServer.pending]: (state, action) => {
         return {
            ...state,
            isLoading: true
         }
      },
      [addNewCustomerToServer.fulfilled]: (state, action) => {
         if (action.payload != null && typeof action.payload !== 'undefined') {
            return {
               ...state,
               isLoading: false,
               customers: [action.payload, ...state.customers],
               customer: action.payload,
               success: {
                  getSuccess: false,
                  getAllSuccess: false,
                  updateSuccess: false,
                  deleteSuccess: false,
                  addSuccess: true,
               }
            }
         } else {
            return state
         }

      },
      [addNewCustomerToServer.rejected]: (state, action) => {
         return {
            ...state,
            isLoading: false,
            customerError: {
               msg: action.payload.data.message,
               status: action.payload.status
            }
         }
      },
      [deleteCustomerFromServer.pending]: (state, action) => {
         return {
            ...state,
            isLoading: true
         }
      },
      [deleteCustomerFromServer.fulfilled]: (state, action) => {
         if (action.payload != null && typeof action.payload !== 'undefined') {
            return {
               ...state,
               customers: state.customers.filter(customer => customer._id !== action.payload),
               isLoading: false,
               success: {
                  getSuccess: false,
                  getAllSuccess: false,
                  addSuccess: false,
                  updateSuccess: false,
                  deleteSuccess: true
               }
            }
         } else {
            return state
         }
      },
      [deleteCustomerFromServer.rejected]: (state, action) => {
         return {
            ...state,
            isLoading: false,
            customerError: {
               msg: action.payload.data.message,
               status: action.payload.status
            }
         }
      },
      [updatedCustomerToServer.pending]: (state, action) => {
         return {
            ...state,
            isLoading: true
         }
      },
      [updatedCustomerToServer.fulfilled]: (state, action) => {
         console.log(action.payload)
         if (action.payload != null && typeof action.payload !== 'undefined') {
            return {
               ...state,
               isLoading: false,
               customer: action.payload,
               success: {
                  getSuccess: false,
                  getAllSuccess: false,
                  addSuccess: false,
                  deleteSuccess: false,
                  updateSuccess: true
               }
            }
         } else {
            return state
         }

      },
      [updatedCustomerToServer.rejected]: (state, action) => {
         return {
            ...state,
            isLoading: false,
            customerError: {
               msg: action.payload.data.message,
               status: action.payload.status
            }
         }
      },
   }
})

export const { clearError, clearSuccess } = customerSlice.actions



export default customerSlice.reducer