export async function handleDeletePosts(model, req, res) {
  const currUser = JSON.parse(req.headers["x-current-user"]);
  const { id, postId } = currUser;
  if (!id || !postId) {
    res.writeHead(400);
    return res.end(JSON.stringify({ error: "Invalid Current User" }));
  }
  const hasUser = await model.findOne({ id: id });
  if (!hasUser) {
    res.writeHead(400);
    return res.end(JSON.stringify({ error: "Your account doesn't exists" }));
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
    return res.end(JSON.stringify({ error: "Failed to delete Posts" }));
  }
  res.writeHead(200);
  res.end(JSON.stringify({ success: "Post deleted" }));
}
