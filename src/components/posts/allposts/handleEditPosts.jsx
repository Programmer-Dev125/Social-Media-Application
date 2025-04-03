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
  const isFetch = await fetch("http://localhost:3000", {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      "x-request-path": "/update-post",
      "x-current-user": JSON.stringify({ id: userId }),
    },
  });
  const isResp = await isFetch.json();
  switch (isFetch.status) {
    case 200:
      break;
    case 400:
      break;
    case 500:
      break;
    default:
      sending(false);
      return handleState(response, { error: "Invalid Request" }, true);
  }
}
