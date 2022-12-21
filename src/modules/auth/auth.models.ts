import mongoose from "mongoose";
import Mongoose from "mongoose";

const UserDB = new Mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

export const User = mongoose.model("Users", UserDB);
