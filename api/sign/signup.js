import { token } from "../jwt.js";

export function handleSignUp(model, req, res) {
  let body = "";
  req.on("data", (data) => {
    body += data;
  });
  req.on("end", async () => {
    const isObj = JSON.parse(body);
    if (
      !Object.hasOwn(isObj, "name") ||
      !Object.hasOwn(isObj, "age") ||
      !Object.hasOwn(isObj, "email") ||
      !Object.hasOwn(isObj, "sex") ||
      !Object.hasOwn(isObj, "password") ||
      !Object.hasOwn(isObj, "img")
    ) {
      res.writeHead(400);
      return res.end(JSON.stringify({ error: "Invalid Request Body" }));
    }
    const { name, age, email, sex, password, img } = isObj;
    const checkName = /^[0-9A-Za-z ]*$/.test(name);
    const checkAge = /^[0-9]*$/.test(age);
    const checkEmail = /^[0-9A-Za-z]*@gmail\.com$/.test(email);
    const checkPassword = /^[0-9A-Za-z]*$/.test(password);

    if (!checkName || !checkAge || !checkEmail || !checkPassword) {
      res.writeHead(400);
      return res.end(JSON.stringify({ error: "Enter valid values" }));
    }

    const hasExists = await model.exists({
      $or: [
        { name: { $regex: new RegExp(`^${isObj.name}$`, "i") } },
        { email: { $regex: new RegExp(`^${isObj.email}$`, "i") } },
      ],
    });
    if (hasExists !== null) {
      res.writeHead(409);
      return res.end(
        JSON.stringify({ error: "name and email should be unique" })
      );
    }

    const lastId = await model.findOne({}, { id: 1 }).sort({ _id: -1 });
    const isId = lastId ? lastId.id + 1 : 1;
    const isInsert = await new model({
      id: isId,
      name: name.trim(),
      age: parseInt(age),
      email: email,
      sex: sex,
      password: password,
      img: Buffer.from(img),
      date: new Date().toISOString(),
    });
    const isSaved = await isInsert.save();
    if (!isSaved) {
      res.writeHead(500);
      return res.end(JSON.stringify({ error: "user failed to get submitted" }));
    }
    res.writeHead(200, { "set-cookie": `key=${token}` });
    return res.end(JSON.stringify({ success: "user submitted", id: isId }));
  });
}
