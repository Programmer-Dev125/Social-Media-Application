import { handleState } from "../../state";
import { handleDbDelete } from "./handleDbDelete";

export async function handleDelete(sending, response, toLog, update) {
  const isId = localStorage.getItem("id");
  if (!isId) return;
  sending(true);
  const isFetch = await fetch("http://localhost:3000", {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      "x-request-path": "/del-account",
      "x-current-user": isId,
    },
    credentials: "include",
  });
  const isResp = await isFetch.json();
  switch (isFetch.status) {
    case 200:
      sending(false);
      handleState(response, isResp, false);
      return handleDbDelete(toLog, update);
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
