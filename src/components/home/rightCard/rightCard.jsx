import { useEffect, useState } from "react";
import { handleAddFriend } from "./handleAddFriend";

export default function RightCard({ signIn, list, listUpdate }) {
  const [active, setActive] = useState(false);
  const [sendId, setSendId] = useState([]);
  const [spin, setSpin] = useState(false);

  useEffect(() => {
    if (list.length === 0 && sendId.length !== 0) {
      setSendId([]);
    }
  });

  function handleRightList() {
    setActive(!active);
  }

  return (
    <div
      style={{
        maxHeight: active
          ? `${document.querySelector(".right-content").scrollHeight}px`
          : "20px",
      }}
      className="right-content w25"
    >
      <div className="w90 mauto">
        <div
          className="flex-box-row sp-between list-divider mb10 pb15 align-center pointer"
          onClick={handleRightList}
        >
          <p className="title mt0 mb0">Add Friend</p>
          <svg
            width="20"
            height="20"
            viewBox="0 0 25 25"
            className={`right-icon pointer ${active ? "active" : ""}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.12124 24.7705L23.7587 14.5448C25.4138 13.7254 25.4138 11.2756 23.7587 10.4562L3.12124 0.229081C1.25249 -0.697247 -0.687508 1.35956 0.238742 3.28722L4.17874 11.4867C4.48499 12.1241 4.48499 12.8755 4.17874 13.5115L0.238742 21.711C-0.686258 23.6387 1.25124 25.6983 3.12124 24.7705Z"
              fill="#222222"
            />
          </svg>
        </div>
        <div className="show-list flex-box-col g20 relative">
          {signIn ? (
            list.length === 0 ? (
              <p className="w100 text-center title mt0 mb0">
                Either all friend requests are sent or you're the first user
                congratulations!
              </p>
            ) : (
              list.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="flex-box-row mt20 sp-between align-center divider pb10"
                  >
                    <div>
                      <p className="text mt0 mb0">{item.name}</p>
                      <p className="text-sec mt10 mb0">
                        {item.sex} - {new Date(item.date).toDateString()}
                      </p>
                    </div>
                    <div className="w30 right-card-btn-row">
                      {sendId.includes(item.id) ? (
                        <p className="mt0 mb0 sent">Request Sent!</p>
                      ) : (
                        <button
                          className="add-btn"
                          onClick={() =>
                            handleAddFriend(
                              item.id,
                              sendId,
                              setSendId,
                              item.name,
                              setSpin,
                              listUpdate
                            )
                          }
                        >
                          Add Friend
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )
          ) : (
            <p className="w100 text-center title mt0 mb0">Login First</p>
          )}
          {spin && (
            <div className="friendlist-message">
              <div className="spinner"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
