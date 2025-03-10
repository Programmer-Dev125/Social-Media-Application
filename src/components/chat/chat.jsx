import { useState } from "react";
import ChatList from "./chatList/chatList";

export default function Chat() {
  const [isChat, setIsChat] = useState(false);

  function handleChatBox(e) {
    setIsChat(!isChat);
  }

  return (
    <div className="flex-box-col">
      <div
        className={`flex-box-col border-bottom chat-list ${
          isChat ? "active" : ""
        }`}
      >
        <ChatList />
      </div>
      <div
        className="flex-box-row sp-between w95 mauto align-center mt15 mb15"
        onClick={handleChatBox}
      >
        <p className="title mt0 mb0">Chat</p>
        <svg
          width="20"
          height="20"
          viewBox="0 0 10 6"
          className={`pointer chat-icon ${isChat ? "active" : ""}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.18509 6H8.8149C9.54349 6 9.99999 5.65808 9.99999 5.22741C10.0008 5.09403 9.9472 4.96291 9.84458 4.84753L6.02241 0.389472C5.8038 0.132931 5.40552 0 5.00248 0C4.60421 0 4.1964 0.132931 3.97757 0.389472L0.160388 4.85063C0.0534626 4.97086 0 5.09758 0 5.22754C0 5.65808 0.461477 6 1.18509 6Z"
            fill="black"
          />
        </svg>
      </div>
    </div>
  );
}
