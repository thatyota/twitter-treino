import express from "express";
import { ENV } from "./config/env.js";

import {  startserver } from "./config/db.js";

const app = express();


startserver();

app.get("/",(req,res) => res.send("Hello from server "))


app.listen(ENV.PORT, () => console.log("Server is app and running on PORT:",ENV.PORT));