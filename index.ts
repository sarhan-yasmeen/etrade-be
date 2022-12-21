import express, { Express, Request, Response } from "express";
import { connectDB } from "./src/db";
import { PORT } from "./src/utils/config";
import { authRouter } from "./src/modules/auth/auth.routes";

const app: Express = express();

app.use(express.json());
app.use("/auth", authRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

async function startServer() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
  });
}

startServer();
