import express from "express";
import { ENV } from "./config/env.js";

import {  connectdb } from "./config/db.js";

const app = express();



app.get("/",(req,res) => res.send("Hello from server "))

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