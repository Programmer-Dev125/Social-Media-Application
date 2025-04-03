export async function handleFriendList(model, req, res) {
  const currId = JSON.parse(req.headers["x-current-user"]).id;
  const hasUser = await model.findOne({ id: currId }, { _id: 0, __v: 0 });
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
}
