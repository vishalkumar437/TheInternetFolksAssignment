const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const userModel = require("./user");

mongoose.plugin(slug);

const communitySchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    unique:true,
  },
  name: {
    type: String,
    max: 255,
  },
  slug: {
    type: String,
    slug: "name",
    unique: true,
    slug_padding_size: 2, // Optional: Add padding to make slugs unique
    maxLength: 255,
  },
  owner: {
    type: String,
    ref: userModel,
  },
}, { timestamps: true });


module.exports = mongoose.model("communitySchema", communitySchema);
