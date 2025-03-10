export default function ChangeAccount() {
  return (
    <form className="flex-box-col g30">
      <div>
        <input type="text" className="change-user-input" />
      </div>
      <div>
        <input type="password" className="change-user-input" />
      </div>
      <div>
        <button className="del-user-btn">Delete Account</button>
      </div>
    </form>
  );
}
