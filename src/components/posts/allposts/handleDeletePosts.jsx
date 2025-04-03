import { handleState } from "../../user/state";

export async function handlePostDel(
  id,
  userId,
  sending,
  response,
  update,
  onClose
) {
  sending(true);
  const isFetch = await fetch(
    "https://social-media-application-eight.vercel.app/api/app",
    {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        "x-request-path": "/del-post",
        "x-current-user": JSON.stringify({ id: userId, postId: id }),
      },
      credentials: "include",
    }
  );
  const isResp = await isFetch.json();
  switch (isFetch.status) {
    case 200:
      sending(false);
      handleState(response, isResp, false);
      onClose(false);
      return update((prev) => (prev = !prev));
    case 400:
      sending(false);
      return handleState(response, isResp, true);
    default:
      sending(false);
      return handleState(response, { error: "Invalid Request" }, true);
  }
}
