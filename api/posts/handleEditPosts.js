export async function handleEditPosts(model, req, res) {
  const currUser = JSON.parse(req.headers["x-current-user"]);
  const { id, postId } = currUser;
  if (!id || !postId) {
    res.writeHead(400);
    return res.end(JSON.stringify({ error: "Incorrect Id and Post Id" }));
  }
  const hasUser = await model.findOne({ id: id });
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
    if (!Object.hasOwn(isObj, "name") || !Object.hasOwn(isObj, "img")) {
      res.writeHead(400);
      return res.end(JSON.stringify({ error: "Invalid Request Body" }));
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
      return res.end(JSON.stringify({ error: "Error Updating the document" }));
    }
    res.writeHead(200);
    return res.end(JSON.stringify({ success: "The post has been updated" }));
  });
}
