import LeftCard from "./leftCard/leftCard";
import MainPost from "./main/mainPost";
import RightCard from "./rightCard/rightCard";

export default function Home({ bio }) {
  return (
    <section className="home flex-box-row sp-between align-start">
      <LeftCard />
      <MainPost bio={bio} />
      <RightCard />
    </section>
  );
}
