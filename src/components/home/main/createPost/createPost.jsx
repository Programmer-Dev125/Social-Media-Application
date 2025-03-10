export default function CreatePost() {
  return (
    <div className="card pt30 pb30 create-content">
      <div className="w95 mauto flex-box-row sp-between align-start">
        <div className="w10">
          <img
            src="./assets/user-img.png"
            alt="Create Post Image"
            className="post-img"
          />
        </div>
        <form className="flex-box-col create-content-bar w88 g30">
          <div>
            <p className="title mt0 mb0">Create New Posts</p>
          </div>

          <div>
            <input
              type="text"
              className="post-title"
              placeholder="Enter Post Title(shouldn't be more than 20 characters)"
            />
          </div>
          <div>
            <label htmlFor="file">
              <svg
                width="30"
                height="30"
                className="pointer"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.33333 30C2.41667 30 1.63222 29.6739 0.98 29.0217C0.327778 28.3694 0.00111111 27.5844 0 26.6667V3.33333C0 2.41667 0.326667 1.63222 0.98 0.98C1.63333 0.327778 2.41778 0.00111111 3.33333 0H26.6667C27.5833 0 28.3683 0.326667 29.0217 0.98C29.675 1.63333 30.0011 2.41778 30 3.33333V26.6667C30 27.5833 29.6739 28.3683 29.0217 29.0217C28.3694 29.675 27.5844 30.0011 26.6667 30H3.33333ZM5 23.3333H25L18.75 15L13.75 21.6667L10 16.6667L5 23.3333Z"
                  fill="#222222"
                />
              </svg>
            </label>
            <input type="file" id="file" />
          </div>
          <div>
            <button className="create-post-btn">Create Post</button>
          </div>
        </form>
      </div>
    </div>
  );
}
