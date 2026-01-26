import mongoose from "mongoose"
import { ENV } from "./env.js"


export const connectDB = async ()=> {

    // console.log("db string log",ENV.DB)
    try {
        const conn = await mongoose.connect(ENV.DB_URL)
        
        // console.log("inside conn.connection",conn.connection)
        console.log("host log",conn.connection.host)
    } catch (error) {
        console.error("Error connecting to MongoDB",error)
    }
}
