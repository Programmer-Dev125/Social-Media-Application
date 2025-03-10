import { useRef, useState } from "react";

export default function LeftCard() {
  const cardRef = useRef(null);

  function handleList(e) {
    if (cardRef.current) {
      cardRef.current.classList.toggle("active");
      if (cardRef.current.classList.contains("active")) {
        document.querySelector(".list-icon").classList.add("active");
        cardRef.current.style.maxHeight = `${cardRef.current.scrollHeight}px`;
      } else {
        document.querySelector(".list-icon").classList.remove("active");
        cardRef.current.style.maxHeight = "30px";
      }
    }
  }

  return (
    <div ref={cardRef} className="left-content w25">
      <div className="w90 mauto flex-box-col">
        <div className="flex-box-row sp-between mb10 list-divider pb15 align-center">
          <p className="title mt0 mb0">Friend List</p>
          <svg
            width="20"
            height="20"
            viewBox="0 0 25 25"
            onClick={handleList}
            fill="none"
            className="pointer list-icon"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.12124 24.7705L23.7587 14.5448C25.4138 13.7254 25.4138 11.2756 23.7587 10.4562L3.12124 0.229081C1.25249 -0.697247 -0.687508 1.35956 0.238742 3.28722L4.17874 11.4867C4.48499 12.1241 4.48499 12.8755 4.17874 13.5115L0.238742 21.711C-0.686258 23.6387 1.25124 25.6983 3.12124 24.7705Z"
              fill="#222222"
            />
          </svg>
        </div>
        <div className="show-list flex-box-col g30">
          <div className="flex-box-row mt20 sp-between align-center divider pb10">
            <div>
              <p className="text mt0 mb0">John Doe</p>
              <p className="text-sec mt10 mb0">Female - 4 Months</p>
            </div>
            <img
              src="./assets/user-img.png"
              alt="user image"
              className="friend-list-img"
            />
          </div>
          <div className="flex-box-row sp-between align-center divider pb10">
            <div>
              <p className="text mt0 mb0">John Doe</p>
              <p className="text-sec mt10 mb0">Female - 4 Months</p>
            </div>
            <img
              src="./assets/user-img.png"
              alt="user image"
              className="friend-list-img"
            />
          </div>
          <div className="flex-box-row sp-between align-center divider pb10">
            <div>
              <p className="text mt0 mb0">John Doe</p>
              <p className="text-sec mt10 mb0">Female - 4 Months</p>
            </div>
            <img
              src="./assets/user-img.png"
              alt="user image"
              className="friend-list-img"
            />
          </div>
          <div className="flex-box-row sp-between align-center divider pb10">
            <div>
              <p className="text mt0 mb0">John Doe</p>
              <p className="text-sec mt10 mb0">Female - 4 Months</p>
            </div>
            <img
              src="./assets/user-img.png"
              alt="user image"
              className="friend-list-img"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
