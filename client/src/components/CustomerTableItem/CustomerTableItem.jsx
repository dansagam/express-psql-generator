import React, { Fragment, useCallback, useState } from 'react'
import {
   Table, TableBody, TableHead, TableRow,
   TableCell, IconButton, Collapse, Box, Typography
} from '@mui/material'
// import { useHistory } from 'react-router-dom'
import {
   Edit,
   KeyboardArrowDown as KeyboardArrowDownIcon,
   KeyboardArrowUp as KeyboardArrowUpIcon
} from '@mui/icons-material'
import PropTypes from 'prop-types'
// import { useSelector } from 'react-redux'
import { currentAge, transformDate } from '../../Utils/dateFuncFormater'



const Row = (props) => {
   // const history = useHistory()
   const { customerRow, history } = props
   const [open, setOpen] = useState(false)

   const handlerCustomerItemDoubleClick = useCallback(() => {
      return history(`/customers/${customerRow._id}`)
   }, [history, customerRow])

   return (
      <Fragment>
         <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} >
            <TableCell>
               <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={() => setOpen(!open)}
               >
                  {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
               </IconButton>
            </TableCell>
            <TableCell component={'th'} scope='row'>
               {customerRow.first_name + " " + customerRow.last_name}
            </TableCell>
            <TableCell component={'th'} scope='row'>
               {customerRow.mobile_number}
            </TableCell>
            <TableCell component={'th'} scope='row'>{transformDate(customerRow.created)}</TableCell>
            <TableCell>
               <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={handlerCustomerItemDoubleClick}
               >
                  <Edit />
               </IconButton>
            </TableCell>
         </TableRow>
         <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
               <Collapse in={open} timeout={'auto'} unmountOnExit>
                  <Box sx={{ margin: 1 }}>
                     <Typography variant='h6' gutterBottom component={'div'}>
                        Customer's Details
                     </Typography>
                     <Table size='small' aria-label='details'>
                        <TableHead>
                           <TableRow>
                              <TableCell>First Name</TableCell>
                              <TableCell>Last Name</TableCell>
                              <TableCell>Phone Number</TableCell>
                              <TableCell align='right'>Age</TableCell>
                              <TableCell align='right'>Date of Birth</TableCell>
                              <TableCell align='right'>Registered Date</TableCell>
                           </TableRow>
                        </TableHead>
                        <TableBody>
                           <TableRow>
                              <TableCell>{customerRow.first_name}</TableCell>
                              <TableCell>{customerRow.last_name}</TableCell>
                              <TableCell>
                                 {customerRow.mobile_number}
                              </TableCell>
                              <TableCell align='right'>
                                 {`${currentAge(customerRow.dob)}`}
                              </TableCell>
                              <TableCell align='right'>
                                 {transformDate(customerRow.dob)}
                              </TableCell>
                              <TableCell align='right'>
                                 {transformDate(customerRow.created)}
                              </TableCell>
                           </TableRow>
                        </TableBody>
                     </Table>
                  </Box>
               </Collapse>

            </TableCell>
         </TableRow>
      </Fragment>
   )
}


Row.propTypes = {
   customerRow: PropTypes.shape({
      _id: PropTypes.number.isRequired,
      first_name: PropTypes.string.isRequired,
      last_name: PropTypes.string.isRequired,
      phone_number: {
         mobile_phone_number: PropTypes.number.isRequired
      },
      date_of_birth: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired

   })
}
const CustomerTableItem = ({ customer, history }) => {
   return (
      <Row key={customer._id} customerRow={customer} history={history} />
   )
}

export default CustomerTableItem
