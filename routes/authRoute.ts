import { request, response } from "../interface/interface";

const express = require("express");
const AuthController = require("../controller/authController");
const errorHandler = require("../middleware/errorhandler");
const { auths } = require("../middleware/auth");


const authRoutes = express.Router();

// welcome routes
authRoutes.get("/welcome",function(req:request ,res:response){
    res.send("its a welcome route")
})

const tryCatch = (controller:any)=> async (req:request,res:response,next:any)=>{
    try {
     await controller(req, res)
   
    } catch (error) {
        return next(error)
    }
}

const auth  = new AuthController;

authRoutes.post("/signup",tryCatch(auth.signup),errorHandler)

authRoutes.post("/signin",tryCatch(auth.signin),errorHandler)

authRoutes.get("/me",  auths,tryCatch(auth.get_me),errorHandler)



module.exports = authRoutes;