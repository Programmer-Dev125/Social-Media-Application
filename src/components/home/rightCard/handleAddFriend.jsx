export async function handleAddFriend(
  id,
  sendId,
  setSendId,
  name,
  setSpin,
  listUpdate
) {
  setSpin((prev) => (prev = !prev));
  const isFetch = await fetch(
    "https://social-media-application-eight.vercel.app/api/app",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-request-path": "/friend-request",
        "x-current-user": JSON.stringify({
          id: parseInt(localStorage.getItem("id")),
        }),
      },
      body: JSON.stringify({ name: name }),
      credentials: "include",
    }
  );

  const isResp = await isFetch.json();
  switch (isFetch.status) {
    case 200:
      setSendId([...sendId, id]);
      setSpin((prev) => (prev = !prev));
      setTimeout(() => {
        listUpdate((prev) => (prev = !prev));
      }, 2000);
      break;
    case 400:
      alert(isResp.error);
      setSpin((prev) => (prev = !prev));
      break;
    case 500:
      alert(isResp.error);
      setSpin((prev) => (prev = !prev));
      break;
    default:
      alert(isResp.error);
      setSpin((prev) => (prev = !prev));
      break;
  }
}
