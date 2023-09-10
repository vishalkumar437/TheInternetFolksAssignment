
import { Snowflake } from "@theinternetfolks/snowflake";
import AuthHelper from "../helper/authHelper"; // Assuming it's an ES6 module
const responseTemp = require("../utils/ResponseTemp");
import {APPError} from "../utils/Error";

class AuthController {
  authHelperObject = new AuthHelper();
  signup = async (req:any, res:any) => {
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
  signin = async (req: { body: { email: any; password: any; }; }, res: {
      status: (arg0: any) => {
        (): any; new(): any; cookie: {
          (arg0: string, arg1: any, arg2: {
            expires: Date // Assuming it's an ES6 module
            ; httpOnly: boolean;
          }): { (): any; new(): any; json: { (arg0: any): void; new(): any; }; }; new(): any;
        };
      };
    }) => {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new APPError(false, "Email and Password Missing", 404);
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
    get_me =  async (req: { user: { email: string; }; }, res: { status: (arg0: any) => { (): any; new(): any; json: { (arg0: any): any; new(): any; }; }; }) => {
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