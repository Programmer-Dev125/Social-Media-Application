import { data } from "./data";

export default function FriendList() {
  return (
    <ul className="friend-list mt20">
      {data.map((elem) => (
        <li key={elem.id} className="divider pb10">
          <div className="flex-box-row sp-between align-center">
            <div className="flex-box-row sp-between align-center">
              <div>
                <img src={elem.img} alt="An alt text" />
              </div>
              <div>
                <p className="title mt0 mb0">{elem.name}</p>
                <p className="text-sec mt5 mb0">{elem.sex}</p>
              </div>
            </div>
            <div>
              <p className="danger-text pointer mt0 mb0">Delete</p>
              <p className="text-sec mt5 mb0">{elem.date}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
