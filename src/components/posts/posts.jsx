import { lazy, Suspense } from "react";

const AllPosts = lazy(() => import("./allposts/allposts.jsx"));

export default function Posts({ onPost }) {
  function handleClick() {
    window.history.pushState({}, "", "/");
    onPost("/");
  }
  return (
    <>
      <div className="post-row flex-box-row sp-between align-center">
        <p className="page-title mt0 mb0">Posts</p>
        <div className="flex-box-row w40 post-search sp-between align-center">
          <div className="w70 post-search-row">
            <input
              type="text"
              className="search-post"
              placeholder="Search Your Posts"
            />
          </div>
          <div className="w25 post-btn-row">
            <button onClick={handleClick} className="create-post-btn">
              Create New Posts
            </button>
          </div>
        </div>
      </div>
      <div className="mt100 mb50">
        <Suspense fallback={<h2>Loading...</h2>}>
          <AllPosts />
        </Suspense>
      </div>
    </>
  );
}
