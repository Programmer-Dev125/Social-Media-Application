export default function Login() {
  return (
    <div className="mt50">
      <h2 className="page-title">Login</h2>
      <form className="flex-box-col g30 mt30">
        <div>
          <label htmlFor="useremail" className="isBlock text mb10">
            Email
          </label>
          <input type="email" placeholder="email" id="useremail" />
        </div>
        <div>
          <label htmlFor="userpassword" className="isBlock text mb10">
            Password
          </label>
          <input type="password" placeholder="password" id="userpassword" />
        </div>
        <div>
          <button>Login</button>
        </div>
      </form>
    </div>
  );
}
