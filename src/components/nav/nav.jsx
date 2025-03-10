import { postIcon, settingsIcon } from "../svg/paths";
import SearchBar from "./search/searchbar";

export default function Nav({ isCurr, onLink }) {
  function handleRoute(e) {
    const route = e.target.dataset.route;
    if (route) {
      window.history.pushState({}, "", route);
      onLink(route);
    }
  }

  return (
    <header>
      <div
        className="flex-box-row sp-between w95 mauto align-center"
        onClick={handleRoute}
      >
        <div data-route="/">
          <p data-route="/" className="logo-text">
            SM
          </p>
        </div>
        <div className="flex-box-row sp-between right-header w50 align-center">
          <nav className="flex-box-row sp-between w50 align-center">
            <div
              data-route="/settings"
              className={`text-center pointer ${
                isCurr === "/settings" ? "active" : ""
              }`}
            >
              <svg
                width="30"
                height="30"
                data-route="/settings"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {settingsIcon}
              </svg>
              <p data-route="/settings" className="title mt10 mb0">
                Settings
              </p>
            </div>
            <div
              data-route="/posts"
              className={`text-center pointer ${
                isCurr === "/posts" ? "active" : ""
              }`}
            >
              <svg
                width="30"
                height="30"
                data-route="/posts"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {postIcon}
              </svg>
              <p data-route="/posts" className="title mt10 link-text mb0">
                Post
              </p>
            </div>
            <div className="text-center pointer">
              <div>
                <img
                  src="./assets/user-img.png"
                  alt="User image"
                  className="user-img"
                />
              </div>
              <p className="title mt0 mb0">Name</p>
            </div>
          </nav>
          <div className="w35 flex-box-row sp-between align-center search-box">
            <SearchBar />
          </div>
        </div>
      </div>
    </header>
  );
}
