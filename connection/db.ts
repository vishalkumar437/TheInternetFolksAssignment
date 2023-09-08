export const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connection = () => {
    mongoose.connect(process.env.DB_URL_VISHAL,{useNewUrlParser:true,useUnifiedTopology:true},)
    .then((res:any) => {
        console.log("Connected to DB");
      })
      .catch((err:any) => {
        console.log(err.message);
      });
  };

module.exports = connection;