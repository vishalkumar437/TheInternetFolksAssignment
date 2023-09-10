const express = require("express");
const errorHandler = require("../middleware/errorHandler");
const { auths } = require("../middleware/auth");
const CommunityController = require("../controller/communityController");

import { tryCatch } from "../utils/tryCatch";

const communityRoutes = express.Router();




const community  = new CommunityController;

// Create
communityRoutes.post("/",auths,tryCatch(community.createCommunity),errorHandler)

// get
communityRoutes.get("/",auths,tryCatch(community.getCommunity),errorHandler)

communityRoutes.get("/:id/members",auths,tryCatch(community.getAllMember),errorHandler)

communityRoutes.get("/me/owner",auths,tryCatch(community.getUserAllCommunity),errorHandler)

communityRoutes.get("/me/member",auths,tryCatch(community.getMyJoinedCommunity),errorHandler)





module.exports = communityRoutes;