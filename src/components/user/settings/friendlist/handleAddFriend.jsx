import { handleState } from "../../state";
export async function handleAddFriend(
  id,
  name,
  sending,
  response,
  addListUpdate,
  requestUpdate
) {
  sending(true);
  const isFetch = await fetch(
    "https://social-media-application-eight.vercel.app/api/app",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-request-path": "/accept-friend",
        "x-current-user": JSON.stringify({ id: id }),
      },
      body: JSON.stringify({ name: name }),
      credentials: "include",
    }
  );
  const isResp = await isFetch.json();
  switch (isFetch.status) {
    case 200:
      sending(false);
      handleState(response, isResp, false);
      addListUpdate((prev) => (prev = !prev));
      requestUpdate((prev) => (prev = !prev));
      break;
    case 400:
      sending(false);
      handleState(response, isResp, false);
      break;
    case 500:
      sending(false);
      handleState(response, isResp, false);
      break;
    default:
      sending(false);
      handleState(response, isResp, false);
      break;
  }
}
