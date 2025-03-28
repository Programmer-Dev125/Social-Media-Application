import { useEffect, useState } from "react";
import Nav from "./components/nav/nav";
import Home from "./components/home/home";
import Posts from "./components/posts/posts";
import User from "./components/user/user";

export default function App() {
  const [link, setLink] = useState(window.location.pathname);
  const [userModal, setUserModal] = useState(false);
  const [bio, setBio] = useState({
    img: "",
    name: "",
  });

  useEffect(() => {
    function handleLink() {
      setLink(window.location.pathname);
    }
    window.addEventListener("popstate", handleLink);
  }, []);

  return (
    <>
      <Nav
        isCurr={link}
        onLink={(val) => setLink(val)}
        bio={bio}
        onModal={(val) => {
          setUserModal(val);
          document.body.classList.add("no-scroll");
        }}
      />
      <div className="w95 isContent mauto mt130 mb60">
        {link === "/" && <Home bio={bio} />}
        {link === "/posts" && <Posts onPost={(val) => setLink(val)} />}
      </div>
      {userModal && (
        <User
          onModal={(val) => {
            setUserModal(val);
            document.body.classList.remove("no-scroll");
          }}
        />
      )}
    </>
  );
}
