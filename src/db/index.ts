import mongoose from "mongoose";
import { MONGO_URI } from "../utils/config";

mongoose.connection.on("open", () => {
  console.log("connected to DB successfully");
});

mongoose.connection.on("error", (err) => {
  // console.log("something went wrong");
});

export async function connectDB() {
  await mongoose.connect(MONGO_URI, {
    // serverApi: ServerApiVersion.v1,
  });
}
