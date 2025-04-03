import { token } from "../jwt.js";
export function handleLogin(model, req, res) {
  let body = "";
  req.on("data", (data) => {
    body += data;
  });
  req.on("end", async () => {
    const isObj = JSON.parse(body);
    if (!Object.hasOwn(isObj, "email") || !Object.hasOwn(isObj, "password")) {
      res.writeHead(400);
      return res.end(JSON.stringify({ error: "Invalid Request" }));
    }
    const { email, password } = isObj;
    const checkEmail = /^[0-9A-Za-z]*@gmail\.com$/.test(email);
    const checkPassword = /^[0-9A-Za-z]*$/.test(password);
    if (!checkEmail || !checkPassword) {
      res.writeHead(400);
      return res.end(JSON.stringify({ error: "Invalid email or password" }));
    }

    const hasEmail = await model.findOne(
      { email: email, password: password },
      { _id: 0, __v: 0 }
    );
    if (!hasEmail) {
      res.writeHead(400);
      return res.end(JSON.stringify({ error: "Invalid user, Signup" }));
    }

    res.writeHead(200, { "set-cookie": `key=${token}` });
    return res.end(JSON.stringify({ success: "logged in", user: hasEmail }));
  });
}
