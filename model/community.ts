import mongoose from "mongoose";
const slug = require("mongoose-slug-generator");
const userModel = require("./user");

mongoose.plugin(slug);

const communitySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique:true,
  },
  name: {
    type: String,
    max: 255,
  },
  slug:{
    type:String,
    slug:"name",
    maxLength:255,
    minLength:0,
  },
  owner: {
    type: String,
    ref: userModel,
  },
}, { timestamps: true })

communitySchema.pre("save", function(next) {
  this.slug = this.name?.replace(/[-\s]/g, "").toLowerCase();
  next();
})

module.exports = mongoose.model("communitySchema", communitySchema);
