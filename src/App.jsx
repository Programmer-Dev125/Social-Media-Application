import { useEffect, useState } from "react";
import Nav from "./components/nav/nav";
import Home from "./components/home/home";
import Posts from "./components/posts/posts";
import User from "./components/user/user";
import { EffectAccounts } from "./effectAccounts";
import { EffectLists } from "./effectFriendList";
import { EffectNotFriend } from "./effectNotFriend";
import { EffectFriendRequests } from "./effectFriendRequests";
import { EffectPosts } from "./effectPosts";

export default function App() {
  const [link, setLink] = useState(window.location.pathname);
  const [isUpdate, setIsUpdate] = useState(false);
  const [listUpdate, setListUpdate] = useState(false);
  const [addListUpdate, setAddListUpdate] = useState(false);
  const [requestUpdate, setRequestUpdate] = useState(false);
  const [lists, setLists] = useState([]);
  const [notFriend, setNotFriend] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [posts, setPosts] = useState([]);
  const [postUpdate, setPostUpdate] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const [userModal, setUserModal] = useState(false);
  const [bio, setBio] = useState({
    id: "",
    img: "",
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    function handleLink() {
      setLink(window.location.pathname);
    }
    window.addEventListener("popstate", handleLink);
  }, []);

  useEffect(() => {
    EffectAccounts(
      setBio,
      setListUpdate,
      setAddListUpdate,
      setRequestUpdate,
      setPostUpdate
    );
  }, [isUpdate]);

  useEffect(() => {
    if (!bio.name || !bio.email || !bio.password) return;
    EffectNotFriend(setNotFriend, bio.id);
  }, [listUpdate]);

  useEffect(() => {
    if (!bio.name || !bio.email || !bio.password) return;
    EffectLists(setLists, bio.id);
  }, [addListUpdate]);

  useEffect(() => {
    if (!bio.name || !bio.email || !bio.password) return;
    EffectFriendRequests(setFriendRequests, bio.id);
  }, [requestUpdate]);

  useEffect(() => {
    if (!bio.name || !bio.email || !bio.password) return;
    EffectPosts(setPosts, bio.id, bio.name);
  }, [postUpdate, addListUpdate]);

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
        {link === "/" && (
          <Home
            leftList={lists}
            bio={bio}
            rightList={notFriend}
            listUpdate={setListUpdate}
            posts={posts}
            update={setPostUpdate}
          />
        )}
        {link === "/posts" && (
          <Posts
            onPost={(val) => setLink(val)}
            posts={posts}
            signIn={bio.name && true}
            bio={bio}
            update={postUpdate}
          />
        )}
      </div>
      {userModal && (
        <User
          onModal={(val) => {
            setUserModal(val);
            document.body.classList.remove("no-scroll");
          }}
          login={bio}
          update={setIsUpdate}
          request={friendRequests}
          addListUpdate={setAddListUpdate}
          requestUpdate={setRequestUpdate}
        />
      )}
    </>
  );
}
