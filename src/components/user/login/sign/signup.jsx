export default function SignUp() {
  return (
    <div className="mt50">
      <h2 className="page-title">Sign Up</h2>
      <form className="flex-box-col g30 mt30">
        <div>
          <label htmlFor="username" className="isBlock text mb10">
            Username
          </label>
          <input type="text" placeholder="username" id="username" />
        </div>
        <div className="g2">
          <div>
            <label htmlFor="userage" className="isBlock text mb10">
              Age
            </label>
            <input type="number" placeholder="age" id="userage" />
          </div>
          <div>
            <label htmlFor="useremail" className="isBlock text mb10">
              Email
            </label>
            <input type="email" placeholder="email" id="useremail" />
          </div>
        </div>
        <div className="g2">
          <div>
            <label htmlFor="usersex" className="isBlock text mb10">
              Sex
            </label>
            <input type="text" placeholder="sex" id="usersex" />
          </div>
          <div>
            <label htmlFor="userpassword" className="isBlock text mb10">
              Password
            </label>
            <input type="password" placeholder="password" id="userpassword" />
          </div>
        </div>
        <div>
          <button>Sign Up</button>
        </div>
      </form>
    </div>
  );
}
