import { useRef, useState } from "react";

export default function Edit({ title, img }) {
  const [name, setName] = useState(title);
  const isRef = useRef(null);

  function handleImage(e) {
    const isSrc = URL.createObjectURL(e.target.files[0]);
    const isImage = isRef.current.querySelector("img");
    isImage.src = isSrc;
  }
  return (
    <form className="edit-form" ref={isRef}>
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
  );
}
