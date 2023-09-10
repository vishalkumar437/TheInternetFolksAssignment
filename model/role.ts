import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique:true,
    },
    name: {
      type: String,
      maxLength: 64,
      unique: true,
    },
    scopes: [],
  },
  { timestamps: true }
);
module.exports = mongoose.model("roleSchema", roleSchema);
