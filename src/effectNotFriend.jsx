export async function EffectNotFriend(setNotFriend, id) {
  const isFetch = await fetch(
    "https://social-media-application-eight.vercel.app/api/app",
    {
      headers: {
        "content-type": "application/json",
        "x-request-path": "/not-friend",
        "x-current-user": JSON.stringify({ id: id }),
      },
      credentials: "include",
    }
  );
  const isResp = await isFetch.json();
  switch (isFetch.status) {
    case 200:
      return setNotFriend(isResp);
    case 500:
      return alert(isResp.error);
    default:
      return alert("Invalid Request");
  }
}
