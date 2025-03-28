export default function Account() {
  return (
    <div className="mt50">
      <h2 className="page-title mb30">Account</h2>
      <form className="flex-box-col g40">
        <div>
          <label htmlFor="name" className="isBlock mb10 text">
            Name
          </label>
          <input type="text" placeholder="Name" id="name" />
        </div>
        <div>
          <label htmlFor="email" className="isBlock mb10 text">
            Email
          </label>
          <input type="text" placeholder="Email" id="email" />
        </div>
        <div>
          <label htmlFor="password" className="isBlock mb10 text">
            Passowrd
          </label>
          <input type="password" placeholder="password" id="password" />
        </div>
        <div>
          <button>Change</button>
        </div>
      </form>
    </div>
  );
}
