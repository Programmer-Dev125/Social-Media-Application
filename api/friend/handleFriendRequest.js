export function handleFriendRequest(model, req, res) {
  const currUser = JSON.parse(req.headers["x-current-user"]).id;
  if (!currUser) {
    res.writeHead(400);
    return res.end(JSON.stringify({ error: "Missing Current User" }));
  }

  let body = "";
  req.on("data", (data) => {
    body += data;
  });

  req.on("end", async () => {
    const hasUser = await model.findOne({ id: currUser }, { _id: 0, __v: 0 });
    if (!hasUser) {
      res.writeHead(400);
      return res.end(JSON.stringify({ error: "Your account doesn't exists" }));
    }
    const isObj = JSON.parse(body);
    const { friends, requests } = hasUser;

    for (let i = 0; i < friends.length; i++) {
      if (friends[i] === isObj.name) {
        res.writeHead(400);
        return res.end(
          JSON.stringify({ error: `The user is already friends` })
        );
      }
    }
    for (let i = 0; i < requests.length; i++) {
      if (requests[i] === isObj.name) {
        res.writeHead(400);
        return res.end(
          JSON.stringify({ error: "The user already sent the friend requests" })
        );
      }
    }

    const toInsertRequest = await model.findOneAndUpdate(
      { id: currUser },
      { $push: { requests: isObj.name } }
    );
    if (!toInsertRequest) {
      res.writeHead(500);
      return res.end(
        JSON.stringify({ error: "Failed to send friend request" })
      );
    }
    res.writeHead(200);
    return res.end(JSON.stringify({ success: "Friend Request sent" }));
  });
}
