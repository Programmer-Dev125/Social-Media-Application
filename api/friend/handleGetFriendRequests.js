export async function handleGetFriendRequests(model, req, res) {
  const currUser = JSON.parse(req.headers["x-current-user"]).id;
  if (!currUser) {
    res.writeHead(400);
    return res.end(JSON.stringify({ error: "Missing the Current user" }));
  }
  const hasUser = await model.findOne({ id: currUser }, { _id: 0, __v: 0 });
  if (!hasUser) {
    res.writeHead(400);
    return res.end(JSON.stringify({ error: "You account doesn't exists" }));
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
}
