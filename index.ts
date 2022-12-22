import express, { Express, Request, Response } from "express";
import helmet from "helmet";
import xss from "xss-clean";
import { connectDB } from "./src/db";
import { PORT } from "./src/utils/config";
import { authRouter } from "./src/modules/auth/auth.routes";
import { notFoundMiddleware, errorHandlerMiddleware } from "./src/middleware";

const app: Express = express();

app.use(helmet());

app.use(xss());

app.use(express.json());
app.use("/api/v1/auth", authRouter);

app.get("*", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

async function startServer() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
  });
}

startServer();
