import { useEffect, useState } from "react";
import Nav from "./components/nav/nav";
import Home from "./components/home/home";
import Settings from "./components/settings/settings";
import Posts from "./components/posts/posts";

export default function App() {
  const [link, setLink] = useState(window.location.pathname);

  useEffect(() => {
    function handleLink() {
      setLink(window.location.pathname);
    }
    window.addEventListener("popstate", handleLink);
  });

  return (
    <>
      <Nav isCurr={link} onLink={(val) => setLink(val)} />
      <div className="w95 isContent mauto mt130 mb60">
        {link === "/" && <Home />}
        {link === "/settings" && <Settings />}
        {link === "/posts" && <Posts onPost={(val) => setLink(val)} />}
      </div>
      {/* <div className="chat-fixed-box">
      <div className="chat-box">
      <Chat />
      </div>
      </div> */}
    </>
  );
}
