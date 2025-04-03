import { useState } from "react";
import { handleLogin } from "./handleLogin";

export default function Login({ response, sending, toLog, update }) {
  const [bio, setBio] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setBio({
      ...bio,
      [e.target.type]: e.target.value,
    });
  }

  return (
    <div className="mt50">
      <h2 className="page-title">Login</h2>
      <form
        className="flex-box-col g30 mt30"
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin(bio, response, sending, toLog, update);
        }}
      >
        <div>
          <label htmlFor="useremail" className="isBlock text mb10">
            Email
          </label>
          <input
            type="email"
            placeholder="email"
            id="useremail"
            value={bio.email}
            onChange={handleChange}
            required
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
            value={bio.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button>Login</button>
        </div>
      </form>
    </div>
  );
}
