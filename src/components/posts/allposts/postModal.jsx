import { useState, useRef, useEffect } from "react";
import Edit from "./edit";
import Delete from "./delete";
import { closeIcon } from "../../svg/paths";

export default function PostModal({ title, img, onClose, update, id, userId }) {
  const [tab, setTab] = useState("Edit");
  const [sending, setSending] = useState(false);
  const [response, setResponse] = useState({
    received: false,
    danger: false,
    message: "The message is received",
  });
  const isRef = useRef(null);
  const [active, setActive] = useState({
    active: "Edit",
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

  function handleClose(e) {
    e.stopPropagation();
    if (
      e.target.classList.contains("close-icon") ||
      e.target.tagName === "svg" ||
      e.target.tagName === "path"
    ) {
      onClose(false);
    }
  }

  return (
    <div className="post-row-modal">
      <div className="post-row-modal-content relative">
        <div
          className="flex-box-row sp-between align-center relative divider w100 mt40"
          ref={isRef}
          onClick={handleTab}
        >
          <p
            className={`modal-text mb0 mt0 pt10 pb10 pl15 pr15 pointer ${
              active.active === "Edit" ? "active" : ""
            }`}
          >
            Edit
          </p>
          <p
            className={`modal-text mb0 mt0 pt10 pb10 pl15 pr15 pointer ${
              active.active === "Delete" ? "active" : ""
            }`}
          >
            Delete
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
        <div className="mt40">
          {tab === "Edit" && (
            <Edit
              id={id}
              img={img}
              userId={userId}
              title={title}
              update={update}
              sending={setSending}
              response={setResponse}
            />
          )}
          {tab === "Delete" && (
            <Delete
              id={id}
              userId={userId}
              update={update}
              sending={setSending}
              response={setResponse}
              onClose={onClose}
            />
          )}
        </div>
        <div className="close-icon" onClick={handleClose}>
          {closeIcon}
        </div>
        {sending && (
          <div className="bg-spinner">
            <div className="spinner"></div>
          </div>
        )}
        {response.received && (
          <div className={`fix-card ${response.danger ? "danger" : ""}`}>
            <p className="mt0 mb0 title">{response.message}</p>
          </div>
        )}
      </div>
    </div>
  );
}
