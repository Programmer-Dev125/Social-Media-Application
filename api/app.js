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
  switch (req.method) {
    case "GET":
      switch (reqPath) {
        case "/posts":
          handleCookie(req, res, tokenVerify);
          (async (model, req, res) => {
            const currUser = JSON.parse(req.headers["x-current-user"]).id;
            if (!currUser) {
              res.writeHead(400);
              return res.end(JSON.stringify({ error: "Invalid userId" }));
            }
            const hasUser = await model.findOne(
              { id: currUser },
              {
                _id: 0,
                __v: 0,
                age: 0,
                email: 0,
                sex: 0,
                password: 0,
                requests: 0,
                img: 0,
              }
            );
            if (!hasUser) {
              res.writeHead(400);
              return res.end(
                JSON.stringify({ error: "Your account doesn't exist" })
              );
            }
            const allOtherPost = await model.find(
              {
                id: { $ne: currUser },
                name: { $in: hasUser.friends },
              },
              {
                _id: 0,
                __v: 0,
                age: 0,
                email: 0,
                sex: 0,
                password: 0,
                friends: 0,
                requests: 0,
              }
            );
            if (!allOtherPost) {
              res.writeHead(400);
              return res.end(JSON.stringify({ error: "Failed to get Posts" }));
            }
            allOtherPost.unshift(hasUser);
            res.writeHead(200);
            return res.end(JSON.stringify(allOtherPost));
          })(model, req, res);
          break;
        case "/not-friend":
          handleCookie(req, res, tokenVerify);
          (async (model, req, res) => {
            const currUser = JSON.parse(req.headers["x-current-user"]).id;
            if (!currUser) {
              res.writeHead(400);
              return res.end(
                JSON.stringify({ error: "Missing current user header" })
              );
            }

            const hasUser = await model.findOne({ id: currUser });
            if (!hasUser) {
              res.writeHead(400);
              return res.end(JSON.stringify({ error: "Invalid user" }));
            }
            const { friends, requests } = hasUser;
            const allOtherUsers = await model.find(
              {
                id: { $ne: hasUser.id },
                name: { $nin: [...friends, ...requests] },
                friends: { $nin: hasUser.name },
                requests: { $nin: hasUser.name },
              },
              {
                _id: 0,
                __v: 0,
                img: 0,
                requests: 0,
                friends: 0,
                password: 0,
                age: 0,
                email: 0,
                posts: 0,
              }
            );
            res.writeHead(200);
            return res.end(JSON.stringify(allOtherUsers));
          })(model, req, res);
          break;
        case "/get-friendrequest":
          handleCookie(req, res, tokenVerify);
          (async (model, req, res) => {
            const currUser = JSON.parse(req.headers["x-current-user"]).id;
            if (!currUser) {
              res.writeHead(400);
              return res.end(
                JSON.stringify({ error: "Missing the Current user" })
              );
            }
            const hasUser = await model.findOne(
              { id: currUser },
              { _id: 0, __v: 0 }
            );
            if (!hasUser) {
              res.writeHead(400);
              return res.end(
                JSON.stringify({ error: "You account doesn't exists" })
              );
            }
            const hasRequests = await model.find(
              {
                id: { $ne: currUser },
                requests: { $in: hasUser.name },
              },
              {
                _id: 0,
                __v: 0,
                age: 0,
                email: 0,
                password: 0,
                friends: 0,
                requests: 0,
                posts: 0,
              }
            );
            if (!hasRequests) {
              res.writeHead(400);
              return res.end(JSON.stringify({ error: "Invalid Requests" }));
            }
            res.writeHead(200);
            return res.end(JSON.stringify(hasRequests));
          })(model, req, res);
          break;
        case "/friend-list":
          handleCookie(req, res, tokenVerify);
          (async (model, req, res) => {
            const currId = JSON.parse(req.headers["x-current-user"]).id;
            const hasUser = await model.findOne(
              { id: currId },
              { _id: 0, __v: 0 }
            );
            if (!hasUser) {
              res.writeHead(400);
              return res.end(JSON.stringify({ error: "Invalid userId" }));
            }
            const hasFriend = await model.find(
              { name: { $in: hasUser.friends } },
              {
                _id: 0,
                __v: 0,
                email: 0,
                age: 0,
                password: 0,
                friends: 0,
                requests: 0,
                posts: 0,
              }
            );
            res.writeHead(200);
            return res.end(JSON.stringify(hasFriend));
          })(model, req, res);
          break;
      }
      break;
    case "POST":
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
      }
      break;
    case "DELETE":
      switch (reqPath) {
        case "/del-account":
          handleCookie(req, res, tokenVerify);
          (async (model, req, res) => {
            const currUser = parseInt(req.headers["x-current-user"]);
            if (!currUser) {
              res.writeHead(400);
              return res.end(JSON.stringify({ error: "Invalid credentials" }));
            }

            const toDelete = await model.deleteOne({ id: currUser });

            if (!toDelete.deletedCount) {
              res.writeHead(500);
              return res.end(
                JSON.stringify({ error: "Failed to delete account" })
              );
            }

            res.writeHead(200, {
              "set-cookie": `key=; expires=Thu, 01 Jan 1970 00:00:00 UTC`,
            });
            return res.end(JSON.stringify({ success: "Account Deleted" }));
          })(model, req, res);
          break;
        case "/del-post":
          handleCookie(req, res, tokenVerify);
          (async (model, req, res) => {
            const currUser = JSON.parse(req.headers["x-current-user"]);
            const { id, postId } = currUser;
            if (!id || !postId) {
              res.writeHead(400);
              return res.end(JSON.stringify({ error: "Invalid Current User" }));
            }
            const hasUser = await model.findOne({ id: id });
            if (!hasUser) {
              res.writeHead(400);
              return res.end(
                JSON.stringify({ error: "Your account doesn't exists" })
              );
            }
            const toDeletePost = await model.findOneAndUpdate(
              {
                id: hasUser.id,
              },
              {
                $pull: { posts: { id: postId } },
              }
            );
            if (!toDeletePost) {
              res.writeHead(400);
              return res.end(
                JSON.stringify({ error: "Failed to delete Posts" })
              );
            }
            res.writeHead(200);
            res.end(JSON.stringify({ success: "Post deleted" }));
          })(model, req, res);
          break;
      }
      break;
    case "PUT":
      switch (reqPath) {
        case "/update-post":
          handleCookie(req, res, tokenVerify);
          (async (model, req, res) => {
            const currUser = JSON.parse(req.headers["x-current-user"]);
            const { id, postId } = currUser;
            if (!id || !postId) {
              res.writeHead(400);
              return res.end(
                JSON.stringify({ error: "Incorrect Id and Post Id" })
              );
            }
            const hasUser = await model.findOne({ id: id });
            if (!hasUser) {
              res.writeHead(400);
              return res.end(
                JSON.stringify({ error: "Your account doesn't exists" })
              );
            }
            let body = "";
            req.on("data", (data) => {
              body += data;
            });
            req.on("end", async () => {
              const isObj = JSON.parse(body);
              if (
                !Object.hasOwn(isObj, "name") ||
                !Object.hasOwn(isObj, "img")
              ) {
                res.writeHead(400);
                return res.end(
                  JSON.stringify({ error: "Invalid Request Body" })
                );
              }
              const toUpdate = await model.findOneAndUpdate(
                {
                  id: hasUser.id,
                  "posts.id": postId,
                },
                {
                  $set: {
                    "posts.$.postImage": Buffer.from(isObj.img),
                    "posts.$.postTitle": isObj.name.trim(),
                  },
                }
              );
              if (!toUpdate) {
                res.writeHead(400);
                return res.end(
                  JSON.stringify({ error: "Error Updating the document" })
                );
              }
              res.writeHead(200);
              return res.end(
                JSON.stringify({ success: "The post has been updated" })
              );
            });
          })(model, req, res);
          break;
        case "/update-account":
          handleCookie(req, res, tokenVerify);
          (async (model, req, res) => {
            const currUser = JSON.parse(req.headers["x-current-user"]);
            if (!currUser) {
              res.writeHead(400);
              return res.end(JSON.stringify({ error: "Missing Current user" }));
            }
            if (!Object.hasOwn(currUser, "id")) {
              res.writeHead(400);
              return res.end(
                JSON.stringify({ error: "Incorrect Current User" })
              );
            }
            const currId = parseInt(currUser.id);
            if (!/^[0-9]*$/.test(currId)) {
              res.writeHead(400);
              return res.end(JSON.stringify({ error: "Invalid credentials" }));
            }

            let body = "";
            req.on("data", (data) => {
              body += data;
            });
            req.on("end", async () => {
              const isObj = JSON.parse(body);
              if (
                !Object.hasOwn(isObj, "name") ||
                !Object.hasOwn(isObj, "email") ||
                !Object.hasOwn(isObj, "password")
              ) {
                res.writeHead(400);
                return res.end(
                  JSON.stringify({ error: "Invalid Request Body" })
                );
              }
              const { name, email, password } = isObj;
              const nameCheck = /^[0-9A-Za-z ]*$/.test(name);
              const emailCheck = /^[0-9A-Za-z]*@gmail\.com$/.test(email);
              const passCheck = /^[0-9A-Za-z]*$/.test(password);
              if (!nameCheck || !emailCheck || !passCheck) {
                res.writeHead(400);
                return res.end(
                  JSON.stringify({ error: "Invalid credentials" })
                );
              }

              const hasExists = await model.exists({
                $or: [
                  { name: { $regex: `^${name}$`, $options: "i" } },
                  { email: { $regex: `^${email}$`, $options: "i" } },
                ],
                id: { $ne: currId },
              });

              if (hasExists !== null) {
                res.writeHead(409);
                return res.end(
                  JSON.stringify({ error: "user or email already exists" })
                );
              }

              const toUpdate = await model.updateOne(
                { id: currId },
                { name: name.trim(), email: email, password: password }
              );
              if (!toUpdate) {
                res.writeHead(500);
                return res.end(
                  JSON.stringify({ error: "Server failed to update" })
                );
              }
              res.writeHead(200);
              return res.end(
                JSON.stringify({ success: "Account Updated", user: toUpdate })
              );
            });
          })(model, req, res);
          break;
      }
      break;
    default:
      res.writeHead(405);
      res.end(JSON.stringify({ error: "Invalid Request or method" }));
      break;
  }
}
