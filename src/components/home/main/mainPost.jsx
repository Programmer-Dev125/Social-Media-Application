import CreatePost from "./createPost/createPost";
import Posts from "./posts/Posts.jsx";

export default function MainPost({ bio, posts, update }) {
  return (
    <div className="main-content flex-box-col g30 w45">
      <CreatePost bio={bio} update={update} />
      <Posts posts={posts} signIn={bio.name && true} bio={bio} />
    </div>
  );
}
