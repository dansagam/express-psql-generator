import Customer from "../models/cutomerModels.js"
import pool from '../db/connectDB.js'


const getAllCustomers = async () => {
   const client = await pool.connect()
   const response = await client.query('SELECT * FROM customer ORDER BY _id ASC')
   if (response.rows && response.rowCount > 0) {
      return response
   } else if (response.rows && response.rowCount === 0) {
      throw new Error('No customer data found')

   } else {
      throw new Error('No Customer found')
   }
}
const getCustomerById = async (id) => {
   const client = await pool.connect()
   const result = await client.query('SELECT * FROM customer WHERE _id = $1', [id])
   if (result.rows) {
      return result
   } else {
      throw new Error('No customer data found')
   }
}
const addCustomer = async (newData) => {
   const {
      first_name, middle_name, last_name, mobile_number, additional_phone_number, age, dob,
   } = newData
   const client = await pool.connect()
   const result = await client.query(
      'INSERT INTO customer (first_name, middle_name, last_name, mobile_number, additional_phone_number, age, dob) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [
         first_name,
         middle_name,
         last_name,
         mobile_number,
         additional_phone_number,
         age,
         dob
      ]
   );
   if (result.rows) {
      return result
   } else {
      throw new Error('Customer could not be ad, please check your data')
   }
}

const deleteCustomerById = async (id) => {
   const client = await pool.connect()
   const result = await client.query('DELETE FROM customer WHERE _id = $1', [id])
   if (result.rowCount > 0) {
      return result
   } else {
      throw new Error('Customer could not be deleted')
   }
}

const updateCustomer = async (id, newData) => {
   const {
      first_name, middle_name, last_name, mobile_number, additional_phone_number, age, dob,
   } = newData
   const client = await pool.connect()
   const result = await client.query(
      'UPDATE customer SET first_name = $1, middle_name = $2, last_name = $3, mobile_number = $4, additional_phone_number = $5, age = $6, dob = $7, updated = now() WHERE _id = $8 RETURNING *',
      [
         first_name,
         middle_name,
         last_name,
         mobile_number,
         additional_phone_number,
         age,
         dob,
         id
      ]
   )
   if (result.rows) {
      // console.log(result)
      return result
   } else {
      throw new Error('Customer detail could not be updated, please check yout data')
   }
}


const customerServices = {
   getAllCustomers: getAllCustomers,
   getCustomerById: getCustomerById,
   addCustomer: addCustomer,
   deleteCustomerById: deleteCustomerById,
   updateCustomer: updateCustomer
}
export default customerServices


// const getAllCustomers = async () => {
//    return new Promise((resolve, reject) => {
//       pool.query('SELECT * FROM customer ORDER BY _id ASC').then((result) => {
//          if (result && result.length > 0) {
//             resolve(result)
//          } else if (result && result.length === 0) {
//             reject(new Error('No Customer found'))
//          } else {
//             reject(new Error('Query not Commplete'))
//          }
//       })
//    })
// }
// const getAllCustomers = async () => {
//    console.log(pool)
//    const client = await pool.connect()
//    try {
//       const result = await client.query('SELECT * FROM customer ORDER BY _id ASC')
//       return result
//    } catch (err) {
//       return (new Error('no customer found'))
//    }
// }
// const getAllCustomers = (newData = {}) => {
//    return new Promise((resolve, reject) => {
//       pool.query('SELECT * FROM customer ORDER BY _id ASC').then((result) => {
//          if (result && result.length > 0) {
//             resolve(result)
//          } else if (result && result.length === 0) {
//             reject(new Error('No Customer found'))
//          } else {
//             reject(new Error('Query not Commplete'))
//          }
//       })
//    })
// }




// const getAllCustomers = (newData, callback) => {
//    Customer.find(newData, callback)
// }
// const getCustomerById = (id, callback) => {
//    Customer.findById(id, callback)
// }
// const addCustomer = (newData, callback) => {
//    Customer.create(newData, callback)
// }

// const deleteCustomerById = (id, callback) => {
//    Customer.findByIdAndDelete(id, callback)
// }

// const updateCustomer = async (id, newData, callback) => {
//    await Customer.findByIdAndUpdate(id, newData, { new: true }, callback)
// }