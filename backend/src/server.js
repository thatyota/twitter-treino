import express from "express";
import cors from "cors"
import {clerkMiddleware} from "@clerk/express";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";

import { ENV } from "./config/env.js";
import {  connectdb } from "./config/db.js";

const app = express();

app.use(cors())
app.use(express.json())
app.use(clerkMiddleware());

app.get("/",(req,res) => res.send("Hello from server "))

app.use("/api/users",userRoutes);
app.use("/api/posts",postRoutes);


//error handling middleware
//error handling middleware
app.use((err, req, res, next) => {
    console.error("Unhandled error:", err);
    res.status(500).json({error: err.message || "Internal server error"});
});
const startserver = async () => {
  try{
   await connectdb();
    
   app.listen(ENV.PORT, () => console.log("Server is app and running on PORT:",ENV.PORT));

  } catch (error) {
     console.error("Failed to connect to server", error.message || error); 
     process.exit(1);
  }
  
   
};

startserver();