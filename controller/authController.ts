import { request, response } from "../interface/interface";
import { Snowflake } from "@theinternetfolks/snowflake";
import AuthHelper from "../helper/authHelper"; // Assuming it's an ES6 module
const responseTemp = require("../utils/ResponseTemp");
const Error = require("../utils/Error");

class AuthController {
  authHelperObject = new AuthHelper();
  signup = async (req: response, res: request) => {
    const { email, password, name } = req.body;
    console.log(req.body)
    if (
      await this.authHelperObject.checkDetailsOfSignup(email, password, name)
    ) {
      const currentTimestamp = Date.now();
      const id = Snowflake.generate({ timestamp: currentTimestamp })
      let response = await this.authHelperObject.createNewUser({
        id,
        email,
        password,
        name,
      });
      // Creating Token
      const respToken = await this.authHelperObject.createToken(
        response.content
      );
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      const access_token = respToken.content.data;
      response.content.meta = {
        access_token,
      };
      res
        .status(response.errorCode)
        .cookie("access_token", access_token, options)
        .json(response);
    }
  };
  signin = async (req: request, res: response) => {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error(false, "Email and Password Missing", 404);
    }
    let response = await this.authHelperObject.login({ email, password });
    let respToken = await this.authHelperObject.createToken(response.content);
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    const access_token = respToken.content.data;

    response.content.meta = {
      access_token,
    };
    res
      .status(response.errorCode)
      .cookie("access_token", access_token, options)
      .json(response);
  };
  // If a user is found, it removes the password from the response and prepares a response object with the found user details.
  //If no user is found, it prepares a response object indicating that user details were not found.
    get_me =  async (req: response, res: request) => {
    const resp = await this.authHelperObject.findUserByEmail(req.user.email);
    let details;
    if (resp) {
      resp.password = undefined;
      details = new responseTemp(true, "found user details", 200, resp);
    } else {
      details = new responseTemp(false, "user details not found", 404);
    }
    return res.status(details.errorCode).json(details);
  };
}

module.exports = AuthController;