import { handleLogout } from "./handleLogout";

export default function Logout({ response, toLog, update }) {
  return (
    <div className="mt40">
      <p className="mt0 mb0 title">Are you sure you want to logout?</p>
      <button
        className="logout-btn mt20"
        onClick={() => handleLogout(response, toLog, update)}
      >
        Logout
      </button>
    </div>
  );
}
