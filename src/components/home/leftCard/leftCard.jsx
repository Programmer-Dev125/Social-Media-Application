import { useState } from "react";

export default function LeftCard({ list, signIn }) {
  const [active, setActive] = useState(false);
  function handleList(e) {
    setActive(!active);
  }

  return (
    <div
      style={{
        maxHeight: active
          ? `${document.querySelector(".left-content").scrollHeight}px`
          : "20px",
      }}
      className="left-content w25"
    >
      <div className="w90 mauto flex-box-col">
        <div
          className="flex-box-row sp-between mb10 list-divider pb15 align-center pointer"
          onClick={handleList}
        >
          <p className="title mt0 mb0">Friend List</p>
          <svg
            width="20"
            height="20"
            viewBox="0 0 25 25"
            fill="none"
            className={`pointer list-icon ${active ? "active" : ""}`}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.12124 24.7705L23.7587 14.5448C25.4138 13.7254 25.4138 11.2756 23.7587 10.4562L3.12124 0.229081C1.25249 -0.697247 -0.687508 1.35956 0.238742 3.28722L4.17874 11.4867C4.48499 12.1241 4.48499 12.8755 4.17874 13.5115L0.238742 21.711C-0.686258 23.6387 1.25124 25.6983 3.12124 24.7705Z"
              fill="#222222"
            />
          </svg>
        </div>
        <div className="show-list flex-box-col g10">
          {signIn ? (
            list.length === 0 ? (
              <p className="mt0 mb0 w100 text-center">No Friend to show</p>
            ) : (
              list.map((item) => (
                <div
                  key={item.id}
                  className="flex-box-row mt10 sp-between align-center divider pb15"
                >
                  <div>
                    <p className="text mt0 mb0">{item.name}</p>
                    <p className="text-sec mt10 mb0">
                      {item.sex} - {new Date(item.date).toDateString()}
                    </p>
                  </div>
                  <img
                    src={item.img}
                    alt="user image"
                    className="friend-list-img"
                  />
                </div>
              ))
            )
          ) : (
            <p className="mt0 mb0 w100 text-center">Login First</p>
          )}
        </div>
      </div>
    </div>
  );
}
