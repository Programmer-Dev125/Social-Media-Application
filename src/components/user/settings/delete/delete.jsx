import { handleDelete } from "./handleDelete";

export default function Delete({ response, sending, toLog, update }) {
  return (
    <div className="mt50">
      <p className="title">Are you sure you want to delete your account?</p>
      <button
        className="danger-btn"
        onClick={() => handleDelete(sending, response, toLog, update)}
      >
        Delete
      </button>
    </div>
  );
}
