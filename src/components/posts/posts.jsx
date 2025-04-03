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
        <div className="flex-box-row w40 post-search sp-between align-center">
          <div className="w55 post-search-row">
            <input
              type="text"
              className="search-post"
              placeholder="Search Your Posts"
            />
          </div>
          <div className="post-btn-row">
            <button onClick={handleClick} className="create-post-btn">
              Create New Posts
            </button>
          </div>
        </div>
      </div>
      <div className="mt100 mb50">
        <AllPosts signIn={signIn} posts={posts} bio={bio} update={update} />
      </div>
    </>
  );
}
