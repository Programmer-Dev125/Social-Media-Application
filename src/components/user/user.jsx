import { useState } from "react";
import Settings from "./settings/settings";
import Log from "./login/log";
import { closeIcon } from "../svg/paths";

export default function User({
  onModal,
  login,
  update,
  request,
  addListUpdate,
  requestUpdate,
}) {
  const [isLogin, setIsLogin] = useState(login.name && true);
  const [isSending, setIsSending] = useState(false);
  const [response, setResponse] = useState({
    received: false,
    danger: false,
    message: "User added",
  });

  function handleClose(e) {
    if (
      e.target.classList.contains("close-icon") ||
      e.target.tagName === "path" ||
      e.target.tagName === "svg"
    ) {
      onModal(false);
    }
  }

  return (
    <div className="user-modal">
      <div className="user-modal-content relative">
        {isLogin ? (
          <Settings
            bio={login}
            response={setResponse}
            sending={setIsSending}
            toLog={setIsLogin}
            update={update}
            request={request}
            addListUpdate={addListUpdate}
            requestUpdate={requestUpdate}
          />
        ) : (
          <Log
            response={setResponse}
            sending={setIsSending}
            toLog={setIsLogin}
            update={update}
          />
        )}
        <div className="close-icon" onClick={handleClose}>
          {closeIcon}
        </div>
        {isSending && (
          <div className="modal-spinner">
            <div className="spinner"></div>
          </div>
        )}
      </div>
      {response.received && (
        <div className={`resp-fix ${response.danger ? "active" : ""}`}>
          <p>{response.message}</p>
        </div>
      )}
    </div>
  );
}
