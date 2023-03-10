import { User } from "./src/modules/auth/types";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      PORT: string;
      MONGO_URI: string;
      JWT_SECRET: string;
      JWT_LIFE_TIME: string;
      ADMIN_ID: string;
    }
  }
  namespace Express {
    interface Request {
      user: User;
    }
  }
}
