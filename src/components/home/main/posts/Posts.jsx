import { useState } from "react";
import { heartIcon } from "../../../svg/paths";

export default function Posts() {
  const [isLiked, setIsLiked] = useState(false);
  const [isShared, setIsShared] = useState(false);

  function handleLike() {
    setIsLiked(!isLiked);
  }

  function handleShare() {
    setIsShared((prev) => (prev = true));
    setTimeout(() => {
      setIsShared((prev) => (prev = false));
    }, 3000);
  }

  return (
    <>
      <div className="card pt30 pb30 post-content">
        <div className="flex-box-col g30">
          <div className="flex-box-row sp-between align-center w95 mauto">
            <div className="w10">
              <img
                src="/assets/user-img.png"
                alt="Post Create Image"
                className="post-creator-image"
              />
            </div>
            <div className="post-info w88">
              <p className="title mt0 mb0">John Doe</p>
              <p className="text-sec mt10 mb0">Tuesday 20, 2025</p>
            </div>
          </div>
          <div className="w95 mauto">
            <p className="text ln2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
              minus ipsam at! Sint quidem sed labore enim vero sit ad!
            </p>
          </div>
          <div>
            <img
              src="/assets/post-img.png"
              alt="Post Image"
              className="post-card-img"
            />
          </div>
          <div className="w95 mauto">
            <div className="w15 flex-box-row sp-between icon-row">
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                onClick={handleLike}
                className={`pointer heart-icon ${isLiked ? "active" : ""}`}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d={heartIcon} stroke="#222222" />
              </svg>
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                onClick={handleShare}
                className="pointer"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M29.3491 14L18.8333 26.619V19.8V19.3H18.3333C14.1018 19.3 10.4724 20.1129 7.3617 21.8377C4.90863 23.1979 2.79871 25.1138 0.976886 27.6086C3.01297 18.5897 8.01642 10.2759 18.4178 8.49281L18.8333 8.42158V8V1.38102L29.3491 14Z"
                  stroke="#222222"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      {isShared && (
        <div className="pos-share-box">
          <div className="share-box">
            <p>Post Link Copied!</p>
          </div>
        </div>
      )}
    </>
  );
}
