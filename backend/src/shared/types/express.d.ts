import "express-serve-static-core";
import { JwtPayload } from "../../modules/auth/auth.types";

declare module "express-serve-static-core" {
  interface Request {
    user?: JwtPayload;
  }
}