import React, { useEffect } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getCustomersFromServer } from '../../reducers/AsyncSlice/customerAsync'
import CustomerTable from '../CustomerTable/CustomerTable'
import { clearError } from '../../reducers/customerSlice'

const CustomerRoutes = () => {
   const history = useNavigate()
   const dispatch = useDispatch()
   const { keyword } = useParams()
   useEffect(() => {
      dispatch(getCustomersFromServer({ keyword }))
      return () => {
         dispatch(clearError())
      }
   }, [dispatch, keyword])
   return (
      <div>
         <CustomerTable history={history} />
         <Outlet />
      </div>
   )
}

export default CustomerRoutes
