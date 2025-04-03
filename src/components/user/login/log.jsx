import { useEffect, useRef, useState } from "react";
import SignUp from "./sign/signup/signup";
import Login from "./sign/login/login";

export default function Log({ response, sending, toLog, update }) {
  const [tab, setTab] = useState("Sign Up");
  const isRef = useRef(null);
  const [active, setActive] = useState({
    active: "Sign Up",
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
    return () => setTab("Sign Up");
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
            active.active === "Sign Up" ? "active" : ""
          }`}
        >
          Sign Up
        </p>
        <p
          className={`modal-text mb0 mt0 pt10 pb10 pl15 pr15 pointer ${
            active.active === "Login" ? "active" : ""
          }`}
        >
          Login
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
      {tab === "Sign Up" ? (
        <SignUp
          response={response}
          sending={sending}
          toLog={toLog}
          update={update}
        />
      ) : (
        <Login
          response={response}
          sending={sending}
          toLog={toLog}
          update={update}
        />
      )}
    </div>
  );
}
