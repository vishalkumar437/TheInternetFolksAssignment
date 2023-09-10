import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique:true
    },
    name: {
      type: String,
      maxLength: 64,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      maxLength: 128,
      minLength: 4,
    },
    password: {
      type: String,
      required: true,
      maxLength: 64,
    },
  },
  { timestamps: true, }
);

module.exports = mongoose.model("userSchema", userSchema);
