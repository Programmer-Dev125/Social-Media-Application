export async function handleGetPosts(model, req, res) {
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
    return res.end(JSON.stringify({ error: "Your account doesn't exist" }));
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
}
