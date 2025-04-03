export function handleCookie(req, res, tokenVerify) {
  const cookie = req.headers.cookie;
  if (!cookie) {
    res.writeHead(401, {
      "www-authenticate": "Bearer realm='Missing Authentication Key'",
    });
    return res.end(JSON.stringify({ error: "Missing Authentication Key" }));
  }
  try {
    tokenVerify(cookie.split("=")[1]);
  } catch (err) {
    res.writeHead(403, {
      "www-authenticate": "Bearer realm='Invalid Authentication Key'",
    });
    return res.end(JSON.stringify({ error: "Invalid Authentication Key" }));
  }
}
