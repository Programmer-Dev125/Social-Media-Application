import { useRef, useState } from "react";
import { dotIcon } from "../../svg/paths";
import PostModal from "./postModal";
export default function AllPosts({ signIn, posts, bio, update }) {
  const [postModal, setPostModal] = useState({
    show: false,
    id: 0,
    title: "",
    img: "",
  });

  function handleClick(id, title, img) {
    setPostModal({
      show: true,
      id: id,
      title: title,
      img: img,
    });
  }

  return (
    <>
      <div className="all-post-row">
        {signIn ? (
          posts.map((post) =>
            post.name === bio.name && post.posts.length === 0 ? (
              <p key={post.id} className="page-title">
                Make New Posts!
              </p>
            ) : (
              post.name === bio.name &&
              post.posts.map((item) => {
                return (
                  <div key={item.id} className="card">
                    <div>
                      <img src={item.postImage} alt="An Image" />
                    </div>
                    <div className="w95 mauto mb10">
                      <p className="title">{item.postTitle}</p>
                    </div>
                    <div
                      className="menu-post"
                      onClick={() => {
                        handleClick(item.id, item.postTitle, item.postImage);
                      }}
                    >
                      {dotIcon}
                    </div>
                  </div>
                );
              })
            )
          )
        ) : (
          <p className="page-title">Login First</p>
        )}
      </div>
      {postModal.show && (
        <PostModal
          title={postModal.title}
          img={postModal.img}
          id={postModal.id}
          userId={bio.id}
          onClose={(val) => setPostModal({ ...postModal, show: val })}
          update={update}
        />
      )}
    </>
  );
}
