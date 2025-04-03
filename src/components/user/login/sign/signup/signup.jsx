import { useState } from "react";
import { handleSubmit } from "./handleSubmit";

export default function SignUp({ response, sending, toLog, update }) {
  const [bio, setBio] = useState({
    username: "",
    userage: "",
    useremail: "",
    usersex: "",
    userpassword: "",
  });
  const [img, setImg] = useState("");

  function handleChange(e) {
    setBio({
      ...bio,
      [e.target.id]: e.target.value,
    });
  }

  async function handleImage(e) {
    const fl = e.target.files[0];
    const arrBuff = await fl.arrayBuffer();
    setImg(arrBuff);
  }

  return (
    <div className="mt50">
      <h2 className="page-title">Sign Up</h2>
      <form
        className="flex-box-col g30 mt30 signup-form"
        autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(bio, img, sending, response, toLog, update);
        }}
      >
        <div>
          <label htmlFor="username" className="isBlock text mb10">
            Username
          </label>
          <input
            type="text"
            placeholder="username"
            id="username"
            value={bio.username}
            onChange={handleChange}
          />
        </div>
        <div className="g2">
          <div>
            <label htmlFor="userage" className="isBlock text mb10">
              Age
            </label>
            <input
              type="number"
              placeholder="age"
              id="userage"
              value={bio.userage}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="useremail" className="isBlock text mb10">
              Email
            </label>
            <input
              type="email"
              placeholder="email"
              id="useremail"
              value={bio.useremail}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="g2">
          <div>
            <label htmlFor="usersex" className="isBlock text mb10">
              Sex
            </label>
            <input
              type="text"
              placeholder="sex"
              id="usersex"
              value={bio.usersex}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="userpassword" className="isBlock text mb10">
              Password
            </label>
            <input
              type="password"
              placeholder="password"
              id="userpassword"
              value={bio.userpassword}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <label htmlFor="user-img" className="isBlock text mb10">
            Image
          </label>
          <input type="file" id="user-img" onChange={handleImage} />
        </div>
        <div>
          <button>Sign Up</button>
        </div>
      </form>
    </div>
  );
}
