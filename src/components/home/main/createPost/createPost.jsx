import { useRef, useState } from "react";
import { imgIcon, userIcon } from "../../../svg/paths";

export default function CreatePost({ bio }) {
  const formRef = useRef(null);
  const [received, setReceived] = useState(false);
  const [response, setResponse] = useState({
    danger: false,
    message: "",
  });
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");

  async function handleImg(e) {
    const isImage = formRef.current.querySelector("img");
    const fl = e.target.files[0];
    if (!fl.type.startsWith("image/")) {
      setReceived(true);
      setResponse({
        danger: true,
        message: "Not a valid image",
      });
      setTimeout(() => setReceived(false), 2000);
      return;
    }
    console.log(fl);
    isImage.src = URL.createObjectURL(fl);
    isImage.classList.add("active");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!/^[0-9A-Za-z ]*$/.test(title)) {
      setReceived(true);
      setResponse({
        danger: true,
        message: "Post title should only contain text and numbers",
      });
      setTimeout(() => setReceived(false), 2000);
      return;
    }
    const isFetch = await fetch("http://localhost:3000/");
  }

  return (
    <div className="card pt30 pb30 create-content">
      <div className="w95 mauto flex-box-row sp-between align-start">
        <div className="w10">
          {bio.img ? (
            <img
              src="./assets/user-img.png"
              alt="Create Post Image"
              className="post-img"
            />
          ) : (
            <div className="user-icon-post">{userIcon}</div>
          )}
        </div>
        <form
          onSubmit={handleSubmit}
          ref={formRef}
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
      {received && (
        <div className={`fix-card ${response.danger ? "danger" : ""}`}>
          <p>{response.message}</p>
        </div>
      )}
    </div>
  );
}
