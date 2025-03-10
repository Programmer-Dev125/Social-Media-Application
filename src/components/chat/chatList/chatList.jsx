import { useState } from "react";
import { data } from "./data.jsx";

export default function ChatList() {
  const [user, setUser] = useState("Abdul Ahad");
  const [activeChat, setActiveChat] = useState("");

  return (
    <>
      {data.map((elem) => {
        return (
          <div key={elem.id} className="flex-box-row sp-between align-start">
            <div className="border-right img-box border-bottom border-top border-left text-center w15 ededed">
              <img
                src={elem.img}
                alt="user-img"
                className={`chat-img ${
                  user === activeChat ? "active" : ""
                } mt10 mb10`}
              />
            </div>
            <div className="flex-box-col g10 w80">
              {elem.chats.map((chat) => {
                activeChat === user && (
                  <div className="flex-box-col">
                    <div className="text-start">
                      <p>{chat.messages[0]}</p>
                    </div>
                    <div className="text-end">{chat.messages[1]}</div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
}
