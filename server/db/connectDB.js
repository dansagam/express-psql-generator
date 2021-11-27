// import mongoose from 'mongoose'
// import Pool from 'pg-pool'
import pg1 from 'pg'
let Pool = pg1.Pool
import fs from 'fs'
import { config } from "dotenv"
config()

let dbHost = process.env.DB_HOST || 'localhost'
let dbUserName = process.env.DB_USERNAME || 'NO_SET'
let dbPassword = process.env.DB_PASSWORD || 'NO_SET'
let dbPort = process.env.DB_PORT || 5432
let dbDatabaseName = process.env.DB_DATABASE_NAME || 'policydb'
let dbCertFile = process.env.DB_CERTFILE

let ssl = false
if (dbCertFile) {
   ssl = {
      rejectUnauthorized: false,
      ca: fs.readFileSync(process.env.DB_CERTFILE).toString(),
   }
}
const config1 = {
   host: dbHost,
   port: dbPort,
   database: dbDatabaseName,
   user: dbUserName,
   password: dbPassword,
}

if (ssl) {
   config1.ssl = ssl
}

let connectDB = new Pool(config1)

export default connectDB


// const connectDB = async () => {
//    try {
//       mongoose.Promise = global.Promise
//       const conn = await mongoose.connect(process.env.MONGO_URI, {
//          useNewUrlParser: true,
//          useUnifiedTopology: true,
//          // useFindAndModify: false,
//          // useCreateIndex: true,
//       })
//       // console.log(conn)
//       console.log(`💻 ${conn.connection.host} CONNECTED to the DB successfully`)
//    } catch (err) {
//       console.log(`Error ${err.message}`)
//       process.exit(1)

//    }
// }