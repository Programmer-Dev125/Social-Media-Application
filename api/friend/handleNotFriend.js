export async function handleNotFriend(model, req, res) {
  const currUser = JSON.parse(req.headers["x-current-user"]).id;
  if (!currUser) {
    res.writeHead(400);
    return res.end(JSON.stringify({ error: "Missing current user header" }));
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
}
