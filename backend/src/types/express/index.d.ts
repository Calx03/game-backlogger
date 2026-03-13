import { DecodedToken } from "../../middleware/auth.ts";

declare global {
  namespace Express {
    export interface Request {
      user?: DecodedToken;
    }
  }
}
