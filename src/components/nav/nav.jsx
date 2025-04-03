import { postIcon, userIcon } from "../svg/paths";

export default function Nav({ isCurr, onLink, bio, onModal }) {
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
        <div className="flex-box-row sp-between right-header w15 align-center">
          <nav className="flex-box-row sp-between w100 align-center">
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
            <div
              className="text-center pointer"
              onClick={(e) => {
                e.stopPropagation();
                onModal(true);
              }}
            >
              <div>
                {bio.img ? (
                  <img src={bio.img} alt="User image" className="user-img" />
                ) : (
                  userIcon
                )}
              </div>
              <p className="title mt10 mb0">
                {bio.name ? bio.name : "Signup/Login"}
              </p>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
