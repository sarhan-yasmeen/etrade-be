import { model, Schema, Model, InferSchemaType, Document } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_LIFE_TIME, JWT_SECRET } from "../../utils/config";
import { CustomAPIError } from "../../errors";

interface IUser {
  name: string;
  email: string;
  password: string;
  role: string;
  phone: string;
}

export interface IUserDocument extends IUser, Document {
  createJWT(): string;
  comparePassword(password: string): Promise<boolean>;
}

const UserSchema: Schema<IUserDocument> = new Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  email: {
    type: String,
    required: [true, "Please provide an Email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    unique: true,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    trim: true,
    index: true,
    unique: true,
    sparse: true,
    match: [
      /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,
      "Please provide a valid phone number",
    ],
  },

  password: {
    type: String,
    required: [true, "Please provide a Password"],
    minlength: 6,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id, name: this.name }, JWT_SECRET, {
    expiresIn: JWT_LIFE_TIME,
  });
};

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

export const User = model("User", UserSchema);
