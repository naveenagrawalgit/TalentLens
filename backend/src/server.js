
import express from 'express';
import { ENV } from './lib/env.js';
import path from 'path';
import { connectDB } from './lib/DB.js';
import cors from "cors";
import {serve} from "Inngest/express";
import { inngest, functions } from "./lib/inngest.js";


let __dirname = path.resolve();

const app = express();

const Port = 5000;


app.use(express.json())
app.use(cors({
    
    credentials: true

}))

app.use("/api/inngest",serve({client: inngest, functions})); 



app.get("/health",(req,res)=>{
    res.status(200).json({msg: "server is running"});
})

// for serving frontend on backend machine.
if(ENV.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

      app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });

}





const startServer = async () => {
    try {
        await connectDB()
        app.listen(ENV.PORT,()=> console.log(`Server is running on port ${ENV.PORT}`))
        
    } catch (error) {
        console.log("Error starting the server", error)
        
    }
}

startServer() 

