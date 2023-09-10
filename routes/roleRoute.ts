const express = require("express");
const errorHandler = require("../middleware/errorHandler");
const { auths } = require("../middleware/auth");
const RolesController = require("../controller/rolesController")
import { tryCatch } from "../utils/tryCatch";
const roleRoutes = express.Router();

const role  = new RolesController;

roleRoutes.post("/",auths,tryCatch(role.createRole),errorHandler)
roleRoutes.get("/",auths,tryCatch(role.getRole),errorHandler)

module.exports = roleRoutes;