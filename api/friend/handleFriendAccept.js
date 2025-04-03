export async function handleFriendAccept(model, req, res) {
  const currUser = JSON.parse(req.headers["x-current-user"]).id;
  if (!currUser) {
    res.writeHead(400);
    return res.end(JSON.stringify({ error: "Missing Current User" }));
  }
  const hasUser = await model.findOne(
    { id: currUser },
    { _id: 0, __v: 0, age: 0, email: 0, password: 0, img: 0, posts: 0 }
  );
  if (!hasUser) {
    res.writeHead(400);
    return res.end(JSON.stringify({ error: "Your account doesn't exists" }));
  }
  let body = "";
  req.on("data", (data) => {
    body += data;
  });
  req.on("end", async () => {
    const isObj = JSON.parse(body);
    if (!Object.hasOwn(isObj, "name")) {
      res.writeHead(400);
      return res.end(JSON.stringify({ error: "Missing Request Body" }));
    }
    const hasAlreadyFriend = await model.exists({
      id: currUser,
      friends: { $in: isObj.name },
    });
    if (hasAlreadyFriend !== null) {
      res.writeHead(200);
      return res.end(JSON.stringify({ error: "User is already your friend" }));
    }

    const addFriend = await model.findOneAndUpdate(
      {
        id: currUser,
      },
      {
        $push: { friends: isObj.name },
      }
    );
    if (!addFriend) {
      res.writeHead(500);
      return res.end(JSON.stringify({ error: "Failed to add friend" }));
    }
    const removeRequest = await model.findOneAndUpdate(
      {
        name: isObj.name,
      },
      {
        $push: { friends: hasUser.name },
        $pull: { requests: hasUser.name },
      }
    );
    if (!removeRequest) {
      res.writeHead(500);
      return res.end(
        JSON.stringify({ error: "Failed to remove original requests" })
      );
    }
    res.writeHead(200);
    return res.end(JSON.stringify({ success: "Friend Added" }));
  });
}
