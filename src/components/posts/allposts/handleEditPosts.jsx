import { handleState } from "../../user/state";
export async function handleEditPosts(
  id,
  userId,
  name,
  newImage,
  update,
  sending,
  response
) {
  if (!name || !newImage) return;
  sending(true);
  const isFetch = await fetch(
    "https://social-media-application-eight.vercel.app/api/put",
    {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        "x-request-path": "/update-post",
        "x-current-user": JSON.stringify({ id: userId, postId: id }),
      },
      body: JSON.stringify({
        name: name,
        img: Array.from(new Uint8Array(newImage)),
      }),
      credentials: "include",
    }
  );
  const isResp = await isFetch.json();
  switch (isFetch.status) {
    case 200:
      sending(false);
      handleState(response, isResp, false);
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
      return handleState(response, { error: "Invalid Request" }, true);
  }
}
