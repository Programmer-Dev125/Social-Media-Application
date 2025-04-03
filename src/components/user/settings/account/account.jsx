import { useState } from "react";
import { handleAccountUpdate } from "./handleAccountUpdate";

export default function Account({ bio, response, sending, update }) {
  const [info, setInfo] = useState(bio);

  function handleChange(e) {
    setInfo({
      ...info,
      [e.target.id]: e.target.value,
    });
  }

  return (
    <div className="mt50">
      <h2 className="page-title mb30">Account</h2>
      <form
        className="flex-box-col g40"
        onSubmit={(e) => {
          e.preventDefault();
          handleAccountUpdate(info, bio, response, sending, update);
        }}
      >
        <div>
          <label htmlFor="name" className="isBlock mb10 text">
            Name
          </label>
          <input
            type="text"
            placeholder="Name"
            id="name"
            value={info.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email" className="isBlock mb10 text">
            Email
          </label>
          <input
            type="text"
            placeholder="Email"
            id="email"
            value={info.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password" className="isBlock mb10 text">
            Passowrd
          </label>
          <input
            type="password"
            placeholder="password"
            id="password"
            value={info.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <button>Update</button>
        </div>
      </form>
    </div>
  );
}
