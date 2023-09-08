const userModel = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const ResponseTemp = require("../utils/ResponseTemp");
class AuthService {
  async findUserByEmail(email: string) {
    const data = await userModel.findOne({ email });

    return data ? data : false;
  }

  async checkDetailsOfSignup(
    email: string,
    password: string,
    name: string
  ): Promise<boolean> {
    if (!email) {
      throw new Error("Email not found");
    } else if (!password || password.length < 6) {
      throw new Error("Password not found or less than 6 characters");
    } else if (!name) {
      throw new Error("Name not found");
    }
    return true;
  }

  async createNewUser(data: {
    email: string;
    password: string;
    name: string;
  }): Promise<any> {
    const res = await this.findUserByEmail(data?.email);

    if (res) {
      throw new Error("User already exists");
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(data.password, salt);
      data.password = hashedPassword;

      const newUser = await userModel.create(data);
      await newUser.save();
      newUser.password = undefined;

      if (newUser) {
        return new ResponseTemp(true, "New user created", 200, newUser);
      } else {
        throw new Error("New user not created");
      }
    }
  }

  async login(data: {
    email: string;
    password: string;
  }): Promise<any> {
    const resp = await this.findUserByEmail(data?.email);

    if (resp) {
      if (await this.passwordMatch(resp.password, data?.password)) {
        resp.password = undefined;
        return new ResponseTemp(true, "Login Successfully", 200, resp);
      } else {
        throw new Error("Password not match");
      }
    } else {
      throw new Error("Email not found");
    }
  }

  async passwordMatch(
    savedPassword: string,
    userGivenPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(userGivenPassword, savedPassword);
  }

  async createToken(content: { data: { _id: string } }): Promise<any> {
    const access_token = jwt.sign(
      { id: content?.data?._id },
      process.env.SECRET_KEY || "",
      { expiresIn: "10h" }
    );

    return new ResponseTemp(true, "", 200, access_token);
  }
}

export default AuthService;
