import { useState } from "react";
import Settings from "./settings/settings";
import Log from "./login/log";

export default function User({ onModal }) {
  const [hasSign, setHasSign] = useState(false);

  function handleClose(e) {
    if (e.target.classList.contains("user-modal")) {
      onModal(false);
    }
  }

  return (
    <div className="user-modal" onClick={handleClose}>
      <div className="user-modal-content">
        {hasSign ? <Settings /> : <Log />}
      </div>
    </div>
  );
}
