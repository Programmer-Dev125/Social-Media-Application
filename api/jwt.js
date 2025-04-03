import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const token = jwt.sign(process.env.DATA, process.env.KEY, {
  algorithm: "HS256",
});

export function tokenVerify(token) {
  return jwt.verify(token, process.env.KEY, { algorithms: "HS256" });
}
