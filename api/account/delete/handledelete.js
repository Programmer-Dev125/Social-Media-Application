export async function handleDelete(model, req, res) {
  const currUser = parseInt(req.headers["x-current-user"]);
  if (!currUser) {
    res.writeHead(400);
    return res.end(JSON.stringify({ error: "Invalid credentials" }));
  }

  const toDelete = await model.deleteOne({ id: currUser });

  if (!toDelete.deletedCount) {
    res.writeHead(500);
    return res.end(JSON.stringify({ error: "Failed to delete account" }));
  }

  res.writeHead(200, {
    "set-cookie": `key=; expires=Thu, 01 Jan 1970 00:00:00 UTC`,
  });
  return res.end(JSON.stringify({ success: "Account Deleted" }));
}
