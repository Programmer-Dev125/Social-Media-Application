export function handleDb(id, name, email, password, img) {
  const db = indexedDB.open("user-db");
  db.addEventListener("success", (e) => {
    const database = e.target.result;
    database
      .transaction("user", "readwrite")
      .objectStore("user")
      .add({ id: id, name: name, email: email, password: password, img: img });
  });
}
