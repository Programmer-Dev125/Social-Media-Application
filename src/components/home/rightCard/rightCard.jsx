import { useRef } from "react";

export default function RightCard() {
  const rightList = useRef(null);

  function handleRightList() {
    if (rightList.current) {
      rightList.current.classList.toggle("active");
      if (rightList.current.classList.contains("active")) {
        document.querySelector(".right-icon").classList.add("active");
        rightList.current.style.maxHeight = `${rightList.current.scrollHeight}px`;
      } else {
        document.querySelector(".right-icon").classList.remove("active");
        rightList.current.style.maxHeight = `30px`;
      }
    }
  }

  return (
    <div ref={rightList} className="right-content w25">
      <div className="w90 mauto">
        <div className="flex-box-row sp-between list-divider mb10 pb15 align-center">
          <p className="title mt0 mb0">Add Friend</p>
          <svg
            width="20"
            height="20"
            viewBox="0 0 25 25"
            className="right-icon pointer"
            onClick={handleRightList}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.12124 24.7705L23.7587 14.5448C25.4138 13.7254 25.4138 11.2756 23.7587 10.4562L3.12124 0.229081C1.25249 -0.697247 -0.687508 1.35956 0.238742 3.28722L4.17874 11.4867C4.48499 12.1241 4.48499 12.8755 4.17874 13.5115L0.238742 21.711C-0.686258 23.6387 1.25124 25.6983 3.12124 24.7705Z"
              fill="#222222"
            />
          </svg>
        </div>
        <div className="show-list flex-box-col g20">
          <div className="flex-box-row mt20 sp-between align-center divider pb10">
            <div>
              <p className="text mt0 mb0">John Doe</p>
              <p className="text-sec mt10 mb0">Female - 4 Months</p>
            </div>
            <div className="w30 right-card-btn-row">
              <button className="add-btn">Add Friend</button>
            </div>
          </div>
          <div className="flex-box-row mt20 sp-between align-center divider pb10">
            <div>
              <p className="text mt0 mb0">John Doe</p>
              <p className="text-sec mt10 mb0">Female - 4 Months</p>
            </div>
            <div className="w30 right-card-btn-row">
              <button className="add-btn">Add Friend</button>
            </div>
          </div>
          <div className="flex-box-row mt20 sp-between align-center divider pb10">
            <div>
              <p className="text mt0 mb0">John Doe</p>
              <p className="text-sec mt10 mb0">Female - 4 Months</p>
            </div>
            <div className="w30 right-card-btn-row">
              <button className="add-btn">Add Friend</button>
            </div>
          </div>
          <div className="flex-box-row mt20 sp-between align-center divider pb10">
            <div>
              <p className="text mt0 mb0">John Doe</p>
              <p className="text-sec mt10 mb0">Female - 4 Months</p>
            </div>
            <div className="w30 right-card-btn-row">
              <button className="add-btn">Add Friend</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
