import { useRef, useEffect, useState } from "react";
import Account from "./account/account";
import Delete from "./delete/delete";
import FriendList from "./friendlist/friendlist";

export default function Settings() {
  const [tab, setTab] = useState("Account");
  const isRef = useRef(null);
  const [active, setActive] = useState({
    active: "Account",
    left: "",
    width: "",
    height: "",
  });

  useEffect(() => {
    if (!isRef.current) return;
    const activeTab = isRef.current.querySelector(".modal-text");
    if (activeTab) {
      setActive({
        active: `${activeTab.textContent}`,
        left: `${activeTab.offsetLeft}px`,
        width: `${activeTab.offsetWidth}px`,
        height: `${activeTab.offsetHeight}px`,
      });
    }
  }, []);

  function handleTab(e) {
    e.stopPropagation();
    if (e.target.tagName !== "P") return;
    setActive({
      active: `${e.target.textContent}`,
      left: `${e.target.offsetLeft}px`,
      width: `${e.target.offsetWidth}px`,
      height: `${e.target.offsetHeight}px`,
    });
    setTab(e.target.textContent);
  }

  return (
    <div>
      <div
        className="flex-box-row sp-between align-center relative divider w100"
        ref={isRef}
        onClick={handleTab}
      >
        <p
          className={`modal-text mb0 mt0 pt10 pb10 pl15 pr15 pointer ${
            active.active === "Account" ? "active" : ""
          }`}
        >
          Account
        </p>
        <p
          className={`modal-text mb0 mt0 pt10 pb10 pl15 pr15 pointer ${
            active.active === "Delete" ? "active" : ""
          }`}
        >
          Delete
        </p>
        <p
          className={`modal-text mb0 mt0 pt10 pb10 pl15 pr15 pointer ${
            active.active === "Friend List" ? "active" : ""
          }`}
        >
          Friend List
        </p>
        <div
          className="bg"
          style={{
            left: active.left,
            width: active.width,
            height: active.height,
          }}
        ></div>
      </div>
      {tab === "Account" && <Account />}
      {tab === "Delete" && <Delete />}
      {tab === "Friend List" && <FriendList />}
    </div>
  );
}
