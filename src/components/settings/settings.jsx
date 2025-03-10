import { useEffect, useRef, useState } from "react";
import ChangeUser from "./changeUser/changeuser";
import ChangePassword from "./changePassword/changePassword";
import ChangeAccount from "./changeaccount/changeaccount";
import { settingsIcon } from "../svg/paths";

export default function Settings() {
  const [isTab, setIsTab] = useState("Username");
  const isLinkRef = useRef(null);

  useEffect(() => {
    const isActive = isLinkRef.current.querySelector(".tab-text.active");
    const isLine = isLinkRef.current.querySelector(".sideline");
    if (isActive) {
      isLine.style.height = `${isActive.offsetHeight}px`;
      isLine.style.top = `${isActive.offsetTop}px`;
    }
  });

  function handleTab(e) {
    if (e.target.classList.contains("tab-text")) {
      if (isLinkRef.current) {
        const isText = e.target.textContent.split(" ");
        const isLine = isLinkRef.current.querySelector(".sideline");
        setIsTab((prev) => (prev = isText[1]));
        const isActive = isLinkRef.current.querySelector(".tab-text.active");
        if (isActive) {
          isLine.style.height = `${isActive.offsetHeight}px`;
          isLine.style.top = `${isActive.offsetTop}px`;
        }
      }
    }
  }

  return (
    <>
      <div className="settings flex-box-row align-start sp-between">
        <div
          ref={isLinkRef}
          onClick={handleTab}
          className="left-setting flex-box-col relative g50 w15"
        >
          <p
            className={`title pointer tab-text ${
              isTab === "Username" ? "active" : ""
            } mt0 mb0`}
          >
            Change Username
          </p>
          <p
            className={`title pointer tab-text ${
              isTab === "Password" ? "active" : ""
            } mt0 mb0`}
          >
            Change Password
          </p>
          <p
            className={`title pointer tab-text ${
              isTab === "Account" ? "active" : ""
            } mt0 mb0`}
          >
            Delete Account
          </p>
          <div className="sideline"></div>
        </div>
        <div className="set w80">
          {isTab === "Username" && (
            <div className="right-setting">
              <ChangeUser />
            </div>
          )}
          {isTab === "Password" && (
            <div className="right-setting">
              <ChangePassword />
            </div>
          )}
          {isTab === "Account" && (
            <div className="right-setting">
              <ChangeAccount />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
