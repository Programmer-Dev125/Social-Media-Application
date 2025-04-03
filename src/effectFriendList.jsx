export async function EffectLists(setLists, id) {
  const isFetch = await fetch("http://localhost:3000", {
    headers: {
      "content-type": "application/json",
      "x-request-path": "/friend-list",
      "x-current-user": JSON.stringify({ id: id }),
    },
    credentials: "include",
  });
  let isResp = await isFetch.json();
  switch (isFetch.status) {
    case 200:
      for (let i = 0; i < isResp.length; i++) {
        isResp[i].img = URL.createObjectURL(
          new Blob([new Uint8Array(isResp[i].img.data)], { type: "image/png" })
        );
      }
      return setLists(isResp);
    case 400:
      return console.log(isResp.error);
    case 500:
      return alert(isResp.error);
    default:
      return alert("Invalid request");
  }
}
