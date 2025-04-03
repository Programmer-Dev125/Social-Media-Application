import { handlePostDel } from "./handleDeletePosts";
export default function Delete({
  id,
  userId,
  update,
  sending,
  response,
  onClose,
}) {
  return (
    <div className="del-post">
      <p className="title">Are you sure you want to delete the post?</p>
      <button
        onClick={() =>
          handlePostDel(id, userId, sending, response, update, onClose)
        }
      >
        Delete
      </button>
    </div>
  );
}
