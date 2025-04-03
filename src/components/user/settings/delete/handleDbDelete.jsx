export function handleDbDelete(toLog, update) {
  const db = indexedDB.open("user-db");
  db.addEventListener("success", (e) => {
    const database = e.target.result;
    const isDeleted = database
      .transaction("user", "readwrite")
      .objectStore("user")
      .delete(parseInt(localStorage.getItem("id")));
    isDeleted.addEventListener("success", (ev) => {
      localStorage.clear();
      toLog((prev) => (prev = !prev));
      update((prev) => (prev = !prev));
    });
  });
}
