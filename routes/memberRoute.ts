
const errorHandler = require("../middleware/errorhandler");
const { auths } = require("../middleware/auth");
const MemberController = require("../controller/memberController");
const verifyRoles = require("../middleware/verifyRoles");
const express = require("express");


import { tryCatch } from "../utils/tryCatch";

const memberRoutes = express.Router();



const member  = new MemberController;

// Create
memberRoutes.post("/",auths,verifyRoles("Community Admin"),tryCatch(member.createMember),errorHandler)

// delete
memberRoutes.delete("/",auths,verifyRoles("Community Admin","Community Member"),tryCatch(member.removeMember),errorHandler)






module.exports = memberRoutes;