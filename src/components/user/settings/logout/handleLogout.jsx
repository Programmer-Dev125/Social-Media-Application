import { handleState } from "../../state";

export function handleLogout(response, toLog, update) {
  const db = indexedDB.open("user-db");
  db.addEventListener("success", (e) => {
    const database = e.target.result;
    const getData = database
      .transaction("user", "readwrite")
      .objectStore("user")
      .delete(parseInt(localStorage.getItem("id")));
    getData.addEventListener("success", (ev) => {
      localStorage.clear();
      document.cookie = "key=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
      handleState(response, { success: "user logged out" }, false);
      toLog((prev) => (prev = !prev));
      update((prev) => (prev = !prev));
    });
  });
}
