const mongoose = require("mongoose");
const communitySchema = require("./community");
const userSchema = require("./user");
const roleSchema = require("./role");

const memberSchema = new mongoose.Schema({
  community:{
    type: String,
    ref:communitySchema
  },
  user:{
    type: String,
    ref:userSchema
  },
  role:{
    type: String,
    ref:roleSchema
  },

}, { timestamps: true })
module.exports = mongoose.model("memberSchmea", memberSchema);