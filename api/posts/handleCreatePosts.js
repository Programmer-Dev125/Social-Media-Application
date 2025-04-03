export async function handleCreatePosts(model, req, res) {
  const currUser = JSON.parse(req.headers["x-current-user"]).id;
  if (!currUser) {
    res.writeHead(400);
    return res.end(JSON.stringify({ error: "Missing Current Id" }));
  }
  const hasUser = await model.findOne({ id: currUser });
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
    if (!Object.hasOwn(isObj, "title") || !Object.hasOwn(isObj, "img")) {
      res.writeHead(400);
      return res.end(JSON.stringify({ error: "Invalid Request Body" }));
    }
    const checkTitle = /^[0-9A-Za-z ]*$/.test(isObj.title);
    if (!checkTitle) {
      res.writeHead(400);
      return res.end(JSON.stringify({ error: "Invalid Title" }));
    }

    const { posts } = hasUser;
    const lastId = posts[posts.length - 1];
    const toInsertPosts = await model.findOneAndUpdate(
      {
        id: hasUser.id,
      },
      {
        $push: {
          posts: {
            id: lastId ? lastId.id + 1 : 1,
            postImage: Buffer.from(isObj.img),
            postTitle: isObj.title.trim(),
          },
        },
      }
    );
    if (!toInsertPosts) {
      res.writeHead(400);
      return res.end(JSON.stringify({ error: "Error Creating Posts" }));
    }
    res.writeHead(200);
    return res.end(JSON.stringify({ success: "Post Created" }));
  });
}
