import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "Please enter your first name"],
    },
    lastname: {
      type: String,
      required: [true, "Please enter your last name"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Password must be greater than 6 characters"],
      select: true,
    },
    location: { type: String },
  },
  { timestamps: true }
);

const Users = mongoose.model("Users", userSchema);

export default Users;
