import { handleAddFriend } from "./handleAddFriend";

export default function FriendList({
  id,
  request,
  response,
  sending,
  addListUpdate,
  requestUpdate,
}) {
  return (
    <ul className="friend-list mt20 relative">
      {request.length === 0 ? (
        <div className="tocenter-text">
          <h2 className="page-title mt0 mb0">No Friend Request</h2>
        </div>
      ) : (
        request.map((elem) => (
          <li key={elem.id} className="divider pb10">
            <div className="flex-box-row sp-between align-center">
              <div className="flex-box-row sp-between align-center">
                <div>
                  <img src={elem.img} alt="An alt text" />
                </div>
                <div>
                  <p className="title mt0 mb0">{elem.name}</p>
                  <p className="text-sec mt10 mb0">{elem.sex}</p>
                </div>
              </div>
              <div>
                <p
                  className="danger-text pointer mt0 mb0"
                  onClick={() =>
                    handleAddFriend(
                      id,
                      elem.name,
                      sending,
                      response,
                      addListUpdate,
                      requestUpdate
                    )
                  }
                >
                  Add Friend
                </p>
                <p className="text-sec mt10 mb0">
                  {new Date(elem.date).toDateString()}
                </p>
              </div>
            </div>
          </li>
        ))
      )}
    </ul>
  );
}
