export function EffectAccounts(
  setBio,
  setListUpdate,
  setAddListUpdate,
  setRequestUpdate,
  setPostUpdate
) {
  const db = indexedDB.open("user-db");
  db.addEventListener("upgradeneeded", (e) => {
    const database = e.target.result;
    database.createObjectStore("user", { keyPath: "id" });
  });
  db.addEventListener("success", (e) => {
    const database = e.target.result;
    const result = database
      .transaction("user")
      .objectStore("user")
      .get(parseInt(localStorage.getItem("id") || 0));
    result.addEventListener("success", (ev) => {
      const isData = ev.target.result;
      if (!isData) {
        setBio({
          id: "",
          img: "",
          name: "",
          email: "",
          password: "",
        });
        setListUpdate((prev) => (prev = !prev));
        return;
      }
      const url = URL.createObjectURL(
        new Blob([new Uint8Array(isData.img)], { type: "image/png" })
      );
      setBio({
        id: isData.id,
        img: url,
        name: isData.name,
        email: isData.email,
        password: isData.password,
      });
      setListUpdate((prev) => (prev = !prev));
      setAddListUpdate((prev) => (prev = !prev));
      setRequestUpdate((prev) => (prev = !prev));
      setPostUpdate((prev) => (prev = !prev));
    });
  });
}
