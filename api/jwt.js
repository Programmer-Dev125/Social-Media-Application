import jwt from "jsonwebtoken";

export const token = jwt.sign(process.env.PAYLOAD, process.env.KEY, {
  algorithm: "HS256",
});

export function tokenVerify(token) {
  return jwt.verify(token, process.env.KEY, { algorithms: "HS256" });
}
