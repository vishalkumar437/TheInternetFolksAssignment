import { request, response } from "./interface/interface";
const express = require("express");
const app = express();
const cors = require("cors");
const bd = require("body-parser");
const mongooseConn = require("./connection/db");

mongooseConn();
app.use(cors());
app.get("/", (req: request, res: response) => {
  console.log(req);
  res.status(200).send("Welcom To the Assignment");
});

module.exports = app;
