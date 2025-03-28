import { useState, useRef, useEffect } from "react";
import Edit from "./edit";
import Delete from "./delete";

export default function PostModal({ title, img, onClose }) {
  const [tab, setTab] = useState("Edit");
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
    if (e.target.classList.contains("post-row-modal")) {
      onClose(false);
    }
  }

  return (
    <div className="post-row-modal" onClick={handleClose}>
      <div className="post-row-modal-content">
        <div
          className="flex-box-row sp-between align-center relative divider w100"
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
          {tab === "Edit" && <Edit img={img} title={title} />}
          {tab === "Delete" && <Delete />}
        </div>
      </div>
    </div>
  );
}
