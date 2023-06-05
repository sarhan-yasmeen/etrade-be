require("express-async-errors");
import express, { Express, Request, Response } from "express";
import helmet from "helmet";
import xss from "xss-clean";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./src/db";
import { JWT_SECRET, PORT } from "./src/utils/config";
import { authRouter } from "./src/modules/auth/auth.routes";
import { notFoundMiddleware, errorHandlerMiddleware } from "./src/middleware";
// import { seedProducts } from "./src/utils/seedDB";
import { userRouter } from "./src/modules/user/user.routes";
import { authenticateUser } from "./src/middleware/authentication";

const app: Express = express();

app.use(cors());
app.use(helmet());
app.use(xss());
app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser(JWT_SECRET));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", authenticateUser, userRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

async function startServer () {
  try {
    await connectDB();
    // await seedProducts();
    app.listen(PORT, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("Error", error);
    console.log('string', JSON.stringify(error));
  }
}

startServer();
