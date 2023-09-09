import { request, response } from "./interface/interface";
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bd = require("body-parser");
const mongooseConn = require("./connection/db");
const authRoute = require("./routes/authRoute");

mongooseConn();
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.get("/", (req: request, res: response) => {
  console.log(req);
  res.status(200).send("Welcom To the Assignment");
});

app.use("/v1/auth",authRoute);

module.exports = app;
