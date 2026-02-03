import express from "express";
import { ENV } from "./config/env.js";
import cors from "cors"
import {clerkMiddleware} from "@clerk/express"
import userRoutes from "./routes/user.route.js"
import {  connectdb } from "./config/db.js";

const app = express();

app.use(cors())
app.use(express.json())
app.use(clerkMiddleware());

app.get("/",(req,res) => res.send("Hello from server "))

app.use("/api/users",userRoutes)

const startserver = async () => {
  try{
   await connectdb();
    
   app.listen(ENV.PORT, () => console.log("Server is app and running on PORT:",ENV.PORT));

  } catch (error) {
     console.error("Failed to connect to server", error.mensage);
     process.exit(1);
  }
  
   
};

startserver();