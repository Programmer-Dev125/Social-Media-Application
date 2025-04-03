import { handleDb } from "../signup/handleDb";
import { handleState } from "../../../state";
export async function handleLogin(bio, response, sending, toLog, update) {
  if (!bio.email || !bio.password) return;
  const checkEmail = /^[0-9A-Za-z]*@gmail\.com$/.test(bio.email);
  const checkPassword = /^[0-9A-Za-z]*$/.test(bio.password);
  if (!checkEmail) {
    return handleState(response, { error: "Invalid Email" }, true);
  }
  if (!checkPassword) {
    return handleState(response, { error: "Invalid Password" }, true);
  }
  sending(true);
  const isFetch = await fetch(
    "https://social-media-application-eight.vercel.app/api/app",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-request-path": "/login",
      },
      body: JSON.stringify({ email: bio.email, password: bio.password }),
      credentials: "include",
    }
  );

  const isResp = await isFetch.json();
  switch (isFetch.status) {
    case 200:
      sending(false);
      const { id, name, email, password, img } = isResp.user;
      handleDb(id, name, email, password, img.data);
      localStorage.setItem("id", id);
      toLog((prev) => (prev = !prev));
      handleState(response, isResp, false);
      return update((prev) => (prev = !prev));
    case 400:
      sending(false);
      return handleState(response, isResp, true);
    default:
      return handleState(response, isResp, true);
  }
}
