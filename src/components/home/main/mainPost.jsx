import CreatePost from "./createPost/createPost";
import Posts from "./posts/Posts.jsx";

export default function MainPost({ bio }) {
  return (
    <div className="main-content flex-box-col g30 w45">
      <CreatePost bio={bio} />
      <Posts />
    </div>
  );
}
