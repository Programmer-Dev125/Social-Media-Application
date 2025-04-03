export async function EffectPosts(setPosts, id, name) {
  const isFetch = await fetch("http://localhost:3000", {
    headers: {
      "content-type": "application/json",
      "x-request-path": "/posts",
      "x-current-user": JSON.stringify({ id: id }),
    },
    credentials: "include",
  });
  const isResp = await isFetch.json();
  switch (isFetch.status) {
    case 200:
      for (let i = 0; i < isResp.length; i++) {
        if (isResp[i].name !== name) {
          isResp[i].img = URL.createObjectURL(
            new Blob([new Uint8Array(isResp[i].img.data)], {
              type: "image/png",
            })
          );
        }
        for (let j = 0; j < isResp[i].posts.length; j++) {
          if (!isResp[i].posts[j].postImage) continue;
          isResp[i].posts[j].postImage = URL.createObjectURL(
            new Blob([new Uint8Array(isResp[i].posts[j].postImage.data)], {
              type: "image/png",
            })
          );
        }
      }
      setPosts(isResp);
      break;
    case 400:
      return alert(isResp.error);
    default:
      return alert("Invalid Request");
  }
}
