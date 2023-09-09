import { request, response } from "../interface/interface";

const jwt = require("jsonwebtoken");
const responseTemp = require("../utils/ResponseTemp");
const Error = require("../utils/Error");
const userSchema = require("../model/user");

exports.auths = async (req: response, res: request, next: any) => {
  try {
    const token =
      req.cookies.access_token ||
      req.header("Authorization").replace("Bearer ", "") ||
      req.body.token;

    if (!token) {
      return res.status(404).json("token is missing, Please login");
    } else {
      const decode = jwt.verify(token, process.env.SECRET_KEY);
      if (!decode) {
        return new responseTemp(false, "invalid token", 400);
      }

      const userDetails = await userSchema.findById(decode.id);

      if (userDetails) {
        req.user = userDetails;
      } else {
        throw new Error(false, "user not found", 404);
      }
      return next();
    }
  } catch (error) {
    return res.send(error);
  }
};
