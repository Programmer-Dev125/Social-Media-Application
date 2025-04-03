export function handleAccount(model, req, res) {
  const currUser = JSON.parse(req.headers["x-current-user"]);
  if (!currUser) {
    res.writeHead(400);
    return res.end(JSON.stringify({ error: "Missing Current user" }));
  }
  if (!Object.hasOwn(currUser, "id")) {
    res.writeHead(400);
    return res.end(JSON.stringify({ error: "Incorrect Current User" }));
  }
  const currId = parseInt(currUser.id);
  if (!/^[0-9]*$/.test(currId)) {
    res.writeHead(400);
    return res.end(JSON.stringify({ error: "Invalid credentials" }));
  }

  let body = "";
  req.on("data", (data) => {
    body += data;
  });
  req.on("end", async () => {
    const isObj = JSON.parse(body);
    if (
      !Object.hasOwn(isObj, "name") ||
      !Object.hasOwn(isObj, "email") ||
      !Object.hasOwn(isObj, "password")
    ) {
      res.writeHead(400);
      return res.end(JSON.stringify({ error: "Invalid Request Body" }));
    }
    const { name, email, password } = isObj;
    const nameCheck = /^[0-9A-Za-z ]*$/.test(name);
    const emailCheck = /^[0-9A-Za-z]*@gmail\.com$/.test(email);
    const passCheck = /^[0-9A-Za-z]*$/.test(password);
    if (!nameCheck || !emailCheck || !passCheck) {
      res.writeHead(400);
      return res.end(JSON.stringify({ error: "Invalid credentials" }));
    }

    const hasExists = await model.exists({
      $or: [
        { name: { $regex: `^${name}$`, $options: "i" } },
        { email: { $regex: `^${email}$`, $options: "i" } },
      ],
      id: { $ne: currId },
    });

    if (hasExists !== null) {
      res.writeHead(409);
      return res.end(JSON.stringify({ error: "user or email already exists" }));
    }

    const toUpdate = await model.updateOne(
      { id: currId },
      { name: name.trim(), email: email, password: password }
    );
    if (!toUpdate) {
      res.writeHead(500);
      return res.end(JSON.stringify({ error: "Server failed to update" }));
    }
    res.writeHead(200);
    return res.end(
      JSON.stringify({ success: "Account Updated", user: toUpdate })
    );
  });
}
