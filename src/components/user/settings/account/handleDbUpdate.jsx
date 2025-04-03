export function handleDbUpdate(name, email, password) {
  const db = indexedDB.open("user-db");
  db.addEventListener("success", (e) => {
    const cursor = e.target.result
      .transaction("user", "readwrite")
      .objectStore("user")
      .openCursor();
    cursor.addEventListener("success", (ev) => {
      const cursorValue = ev.target.result;

      if (cursorValue.value.id === parseInt(localStorage.getItem("id"))) {
        const data = cursorValue.value;
        data.name = name;
        data.email = email;
        data.password = password;
        cursorValue.update(data);
      }
    });
  });
}
