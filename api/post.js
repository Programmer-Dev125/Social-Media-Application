import mongoose, { Schema } from "mongoose";
import { tokenVerify } from "./jwt.js";
import { handleCookie } from "./handleCookie.js";
import { handleSignUp } from "./sign/signup.js";
import { handleLogin } from "./sign/login.js";
import { handleFriendRequest } from "./friend/handleFriendRequest.js";
import { handleFriendAccept } from "./friend/handleFriendAccept.js";
import { handleCreatePosts } from "./posts/handleCreatePosts.js";

export async function handleDb() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_URL);
  }
}
const schemaOptions = {
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  sex: { type: String, required: true },
  password: { type: String, required: true },
  img: { type: Buffer, required: true },
  date: { type: Date, required: true },
  posts: [
    new Schema(
      {
        id: { type: Number, required: true, unique: true },
        postImage: { type: Buffer, required: true },
        postTitle: { type: String, required: true },
      },
      { autoIndex: false, autoCreate: false }
    ),
  ],
  friends: { type: Array },
  requests: { type: Array },
};

const model = mongoose.model(
  "usermodel",
  new Schema(schemaOptions, { autoIndex: false, autoCreate: false }),
  process.env.COLLECTION
);

export default async function handleServer(req, res) {
  await handleDb();
  res.setHeader(
    "access-control-allow-origin",
    "https://social-media-application-eight.vercel.app"
  );
  res.setHeader(
    "access-control-allow-headers",
    "content-type, x-request-path, x-current-user"
  );
  res.setHeader(
    "access-control-allow-methods",
    "GET, POST, DELETE, PUT, OPTIONS"
  );
  res.setHeader("content-type", "application/json");
  res.setHeader("access-control-allow-credentials", true);

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    return res.end();
  }

  const reqPath = req.headers["x-request-path"];
  if (!reqPath) {
    res.writeHead(400);
    return res.end(JSON.stringify({ error: "Request path not included" }));
  }
  switch (reqPath) {
    case "/add-friend":
      handleCookie(req, res, tokenVerify);
      handleFriendRequest(model, req, res);
      break;
    case "/accept-friend":
      handleCookie(req, res, tokenVerify);
      handleFriendAccept(model, req, res);
      break;
    case "/add-post":
      handleCookie(req, res, tokenVerify);
      handleCreatePosts(model, req, res);
      break;
    case "/friend-request":
      handleCookie(req, res, tokenVerify);
      handleFriendRequest(model, req, res);
      break;
    case "/signup":
      handleSignUp(model, req, res);
      break;
    case "/login":
      handleLogin(model, req, res);
      break;
    default:
      res.writeHead(405);
      res.end(JSON.stringify({ error: "Invalid Request or method" }));
      break;
  }
}
