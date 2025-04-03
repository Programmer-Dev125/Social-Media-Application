import { handleState } from "../../../state.jsx";
import { handleDb } from "./handleDb.jsx";
export async function handleSubmit(bio, img, sending, response, toLog, update) {
  if (
    !bio.username ||
    !bio.userage ||
    !bio.useremail ||
    !bio.usersex ||
    !bio.userpassword ||
    !img
  )
    return;
  sending(true);
  const isFetch = await fetch(
    "https://social-media-application-eight.vercel.app/api/app",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-request-path": "/signup",
      },
      body: JSON.stringify({
        name: bio.username,
        age: bio.userage,
        email: bio.useremail,
        sex: bio.usersex,
        password: bio.userpassword,
        img: Array.from(new Uint8Array(img)),
      }),
      credentials: "include",
    }
  );
  const isResp = await isFetch.json();
  switch (isFetch.status) {
    case 200:
      sending(false);
      handleDb(isResp.id, bio.username, bio.useremail, bio.userpassword, img);
      localStorage.setItem("id", parseInt(isResp.id));
      toLog((prev) => (prev = !prev));
      handleState(response, isResp, false);
      return update((prev) => (prev = !prev));
    case 400:
      sending(false);
      return handleState(response, isResp, true);
    case 500:
      sending(false);
      return handleState(response, isResp, true);
    default:
      sending(false);
      return handleState(response, isResp, true);
  }
}
