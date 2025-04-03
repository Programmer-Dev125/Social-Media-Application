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
  const [newImage, setNewImage] = useState(img);
  const isRef = useRef(null);

  async function handleImage(e) {
    const isSrc = URL.createObjectURL(e.target.files[0]);
    const isImage = isRef.current.querySelector("img");
    isImage.src = isSrc;
    const arrBuff = await e.target.files[0].arrayBuffer();
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
          <img src={newImage} alt="Image" />
        </div>
        <div>
          <button>Update</button>
        </div>
      </form>
    </>
  );
}
