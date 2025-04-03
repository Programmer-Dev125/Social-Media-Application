import { useRef, useEffect, useState } from "react";
import Account from "./account/account";
import Delete from "./delete/delete";
import FriendList from "./friendlist/friendlist";
import Logout from "./logout/logout";

export default function Settings({
  bio,
  response,
  sending,
  toLog,
  update,
  request,
  addListUpdate,
  requestUpdate,
}) {
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
    return () => setTab("Account");
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
        className="flex-box-row sp-between align-center relative divider w100 mt40"
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
            active.active === "Friend Request" ? "active" : ""
          }`}
        >
          Friend Request
        </p>
        <p
          className={`modal-text mb0 mt0 pt10 pb10 pl15 pr15 pointer ${
            active.active === "Logout" ? "active" : ""
          }`}
        >
          Logout
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
      {tab === "Account" && (
        <Account
          bio={bio}
          response={response}
          sending={sending}
          update={update}
        />
      )}
      {tab === "Delete" && (
        <Delete
          response={response}
          sending={sending}
          toLog={toLog}
          update={update}
        />
      )}
      {tab === "Friend Request" && (
        <FriendList
          id={bio.id}
          response={response}
          sending={sending}
          request={request}
          addListUpdate={addListUpdate}
          requestUpdate={requestUpdate}
        />
      )}
      {tab === "Logout" && (
        <Logout response={response} toLog={toLog} update={update} />
      )}
    </div>
  );
}
