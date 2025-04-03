import LeftCard from "./leftCard/leftCard";
import MainPost from "./main/mainPost";
import RightCard from "./rightCard/rightCard";

export default function Home({
  leftList,
  bio,
  rightList,
  listUpdate,
  posts,
  update,
}) {
  return (
    <section className="home flex-box-row sp-between align-start">
      <LeftCard list={leftList} signIn={bio.name} />
      <MainPost bio={bio} posts={posts} update={update} />
      <RightCard signIn={bio.name} list={rightList} listUpdate={listUpdate} />
    </section>
  );
}
