import { handleState } from "../../../user/state";
export async function handleCreatePosts(
  id,
  title,
  img,
  sending,
  update,
  Response,
  setTitle,
  setImg
) {
  if (!title || !img) return;
  sending(true);
  const isFetch = await fetch(
    "https://social-media-application-eight.vercel.app/api/app",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-request-path": "/add-post",
        "x-current-user": JSON.stringify({ id: id }),
      },
      body: JSON.stringify({
        title: title,
        img: Array.from(new Uint8Array(img)),
      }),
      credentials: "include",
    }
  );
  const isResp = await isFetch.json();
  switch (isFetch.status) {
    case 200:
      sending(false);
      update((prev) => (prev = !prev));
      setTitle("");
      setImg("");
      return handleState(Response, isResp, false);
    case 400:
      sending(false);
      return handleState(Response, isResp, true);
    default:
      return handleState(Response, isResp, true);
  }
}
