import { useRef, useState } from "react";
import { imgIcon, userIcon } from "../../../svg/paths";
import { handleCreatePosts } from "./handleCreatePost";

export default function CreatePost({ bio, update }) {
  const formRef = useRef(null);
  const [sending, setSending] = useState(false);
  const [response, setResponse] = useState({
    received: false,
    danger: false,
    message: "",
  });
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");

  async function handleImg(e) {
    const isImage = formRef.current.querySelector("img");
    const fl = e.target.files[0];
    isImage.src = URL.createObjectURL(fl);
    isImage.classList.add("active");
    const arrBuff = await fl.arrayBuffer();
    setImg(arrBuff);
  }

  return (
    <div className="card pt30 pb30 create-content relative">
      <div className="w95 mauto flex-box-row sp-between align-start">
        <div className="w10">
          {bio.img ? (
            <img src={bio.img} alt="Create Post Image" className="post-img" />
          ) : (
            <div className="user-icon-post">{userIcon}</div>
          )}
        </div>
        <form
          ref={formRef}
          onSubmit={(e) => {
            e.preventDefault();
            handleCreatePosts(
              bio.id,
              title,
              img,
              setSending,
              update,
              setResponse,
              setTitle,
              setImg
            );
          }}
          className="flex-box-col create-content-bar w88 g30"
        >
          <div>
            <p className="title mt0 mb0">Create New Posts</p>
          </div>

          <div>
            <input
              type="text"
              className="post-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Enter Post Title(shouldn't be more than 15 characters) Only text and numbers"
            />
          </div>
          <div>
            <label htmlFor="file">{imgIcon}</label>
            <input
              type="file"
              id="file"
              accept="images/*"
              onChange={handleImg}
            />
          </div>
          <img />
          <div>
            <button className="create-post-btn">Create Post</button>
          </div>
        </form>
      </div>
      {sending && (
        <div className="bg-spinner">
          <div className="spinner"></div>
        </div>
      )}
      {response.received && (
        <div className={`fix-card ${response.danger ? "danger" : ""}`}>
          <p className="mt0 mb0 title">{response.message}</p>
        </div>
      )}
    </div>
  );
}
