import AllPosts from "./allposts/allposts";

export default function Posts({ onPost, posts, signIn, bio, update }) {
  function handleClick() {
    window.history.pushState({}, "", "/");
    onPost("/");
  }

  return (
    <>
      <div className="post-row flex-box-row sp-between align-center">
        <p className="page-title mt0 mb0">Posts</p>
        <div className="post-btn-row text-end">
          <button onClick={handleClick} className="create-post-btn">
            Create New Posts
          </button>
        </div>
      </div>
      <div className="mt100 mb50">
        <AllPosts signIn={signIn} posts={posts} bio={bio} update={update} />
      </div>
    </>
  );
}
