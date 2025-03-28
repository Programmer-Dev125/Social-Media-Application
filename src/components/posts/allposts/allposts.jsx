import { useRef, useState } from "react";
import { data } from "./data";
import { dotIcon } from "../../svg/paths";
import PostModal from "./postModal";
export default function AllPosts() {
  const [postModal, setPostModal] = useState({
    show: false,
    title: "",
    img: "",
  });

  function handleClick(title, img) {
    setPostModal({
      show: true,
      title: title,
      img: img,
    });
  }

  return (
    <>
      <div className="all-post-row">
        {data.map((elem) => (
          <div key={elem.id} className="card">
            <div>
              <img src={elem.img} alt="An Image" />
            </div>
            <div className="w95 mauto mb10">
              <p className="title">{elem.title}</p>
            </div>
            <div
              className="menu-post"
              onClick={() => {
                handleClick(elem.title, elem.img);
              }}
            >
              {dotIcon}
            </div>
          </div>
        ))}
      </div>
      {postModal.show && (
        <PostModal
          title={postModal.title}
          img={postModal.img}
          onClose={(val) => setPostModal({ ...postModal, show: val })}
        />
      )}
    </>
  );
}
