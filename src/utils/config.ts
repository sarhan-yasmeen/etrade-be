import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT;
export const MONGO_URI = process.env.MONGO_URI;
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_LIFE_TIME = process.env.JWT_LIFE_TIME;
export const ADMIN_ID = process.env.ADMIN_ID;
export const NODE_ENV = process.env.NODE_ENV;
