import { lazy, Suspense } from "react";
import CreatePost from "./createPost/createPost";

const MainPosts = lazy(() => import("./posts/Posts.jsx"));

export default function MainPost() {
  return (
    <div className="main-content flex-box-col g30 w45">
      <CreatePost />
      <Suspense fallback={<h2>Loading...</h2>}>
        <MainPosts />
      </Suspense>
    </div>
  );
}
