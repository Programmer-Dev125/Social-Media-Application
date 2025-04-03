import { useRef, useState } from "react";
import { handleEditPosts } from "./handleEditPosts";

export default function Edit({
  title,
  img,
  id,
  userId,
  update,
  sending,
  response,
}) {
  const [name, setName] = useState(title);
  const [newImage, setNewImage] = useState("");
  const isRef = useRef(null);

  async function handleImage(e) {
    const fl = e.target.files[0];
    const isSrc = URL.createObjectURL(fl);
    const isImage = isRef.current.querySelector("img");
    isImage.src = isSrc;
    const arrBuff = await fl.arrayBuffer();
    setNewImage(arrBuff);
  }
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleEditPosts(
            id,
            userId,
            name,
            newImage,
            update,
            sending,
            response
          );
        }}
        className="edit-form"
        ref={isRef}
      >
        <div>
          <label htmlFor="title" className="isBlock mb10">
            Title
          </label>
          <input
            type="text"
            placeholder="Title"
            id="title"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="file" className="isBlock mb10">
            File
          </label>
          <input type="file" id="file" onChange={handleImage} />
        </div>
        <div>
          <img src={img} alt="Image" />
        </div>
        <div>
          <button>Update</button>
        </div>
      </form>
    </>
  );
}
