import { useRef, useState } from "react";
import { data } from "./data";
export default function AllPosts() {
  const [isActiveTab, setIsActiveTab] = useState(false);
  const [isTab, setIsTab] = useState(false);

  function handleMenu(id) {
    if (isTab) {
      setIsActiveTab(null);
      setIsTab((prev) => (prev = false));
      return;
    }
    setIsActiveTab(id);
    setIsTab((prev) => (prev = true));
  }

  return (
    <div className="all-post-row flex-box-row wrap g10 sp-between align-start">
      {data.map((elem) => {
        return (
          <div
            key={elem.id}
            className="card mb50 flex-box-col g20 br10 pb20 w20"
          >
            <div className="relative">
              <img src={elem.img} alt="Post Image" className="post-image" />
              <div className="img-menu" onClick={() => handleMenu(elem.id)}>
                <svg
                  width="30"
                  height="10"
                  viewBox="0 0 57 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="7.5" cy="7.5" r="7.5" fill="white" />
                  <circle cx="28.5" cy="7.5" r="7.5" fill="white" />
                  <circle cx="49.5" cy="7.5" r="7.5" fill="white" />
                </svg>
              </div>
              <div
                className={`img-menu-bar ${
                  isActiveTab === elem.id && isTab ? "active" : ""
                }`}
              >
                <p className="title pl10 edit-bar pt10 pb10 mt0 mb0">Edit</p>
                <p className="title pl10 del-bar pt10 pb10 mt0 mb0">Delete</p>
              </div>
            </div>
            <div className="w90 mauto">
              <p className="text mt0 mb0 ln15">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consequatur ea est, ab doloribus tempora necessitatibus
                voluptates laboriosam corrupti earum aliquam.
              </p>
              <p className="text-sec mt15 mb0">Tuesday 20, 2025</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
