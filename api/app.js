import { createServer } from "node:http";

createServer((req, res) => {
  res.setHeader("access-control-allow-origin", "*");
  res.setHeader(
    "access-control-allow-headers",
    "content-type. x-request-path, x-current-user"
  );
  res.setHeader("access-control-allow-methods", "GET, POST, DELETE, PUT");
  res.setHeader("access-control-allow-credentials", true);

  const reqPath = req.headers["x-request-path"];
  if (!reqPath) {
    res.writeHead(200);
    return res.end(JSON.stringify({ error: "Request Path not included" }));
  }
  switch (true) {
    case req.method === "GET" && reqPath === "/posts":
      break;
    case req.method === "GET" && reqPath === "/friend-list":
      break;
    case req.method === "POST" && reqPath === "/add-friend":
      break;
    case req.method === "POST" && reqPath === "/accept-friend":
      break;
    case req.method === "POST" && reqPath === "/add-post":
      break;
    case req.method === "DELETE" && reqPath === "/del-post":
      break;
    case req.method === "PUT" && reqPath === "/update-post":
      break;
  }
});
