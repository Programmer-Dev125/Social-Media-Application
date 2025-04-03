export async function EffectFriendRequests(setRequests, id) {
  const isFetch = await fetch(
    "https://social-media-application-eight.vercel.app/api/app",
    {
      headers: {
        "content-type": "application/json",
        "x-request-path": "/get-friendrequest",
        "x-current-user": JSON.stringify({ id: id }),
      },
      credentials: "include",
    }
  );
  let isResp = await isFetch.json();
  switch (isFetch.status) {
    case 200:
      for (let i = 0; i < isResp.length; i++) {
        isResp[i].img = URL.createObjectURL(
          new Blob([new Uint8Array(isResp[i].img.data)], { type: "image/png" })
        );
      }
      setRequests(isResp);
      break;
    case 400:
      console.log(isResp.error);
      break;
    default:
      console.log("Invalid Request");
      break;
  }
}
