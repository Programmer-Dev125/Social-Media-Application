import { handleState } from "../../state.jsx";
import { handleDbUpdate } from "./handleDbUpdate.jsx";
export async function handleAccountUpdate(
  info,
  bio,
  response,
  sending,
  update
) {
  const { id, name, email, password } = info;
  if (name === bio.name && email === bio.email && password === bio.password)
    return;
  if (!name || !email || !password) return;
  const checkName = /^[0-9A-Za-z ]*$/.test(name);
  const checkEmail = /^[0-9A-Za-z]*@gmail\.com$/.test(email);
  const checkPassword = /^[0-9A-Za-z]*$/.test(password);
  if (!checkName) {
    return handleState(response, { error: "Incorrect username" }, true);
  }
  if (!checkEmail) {
    return handleState(response, { error: "Incorrect Email" }, true);
  }
  if (!checkPassword) {
    return handleState(response, { error: "Incorrect Password" }, true);
  }
  sending(true);
  const isFetch = await fetch("http://localhost:3000", {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      "x-request-path": "/update-account",
      "x-current-user": JSON.stringify({ id: id }),
    },
    body: JSON.stringify({ name: name, email: email, password: password }),
    credentials: "include",
  });
  const isResp = await isFetch.json();
  switch (isFetch.status) {
    case 200:
      sending(false);
      handleState(response, isResp, false);
      handleDbUpdate(name, email, password);
      update((prev) => (prev = !prev));
      break;
    case 400:
      sending(false);
      handleState(response, isResp, true);
      break;
    case 500:
      sending(false);
      handleState(response, isResp, true);
      break;
    default:
      sending(false);
      handleState(response, isResp, true);
      break;
  }
}
