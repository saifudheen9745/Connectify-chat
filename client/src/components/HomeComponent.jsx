// import { useSelector } from "react-redux"
// import { userReducer } from "../redux/slices/userSlice";
// import ChatInputComponent from "./ChatInputComponent";
import { useState } from "react";
import ChatListComponent from "./ChatListComponent";
import ChatMessageComponent from "./ChatMessageComponent";

function HomeComponent() {
  // const {email} = useSelector(userReducer)
  const [inviteFriendModal, setInviteFriendModal] = useState(false);
  const [friendRequestModal, setFriendRequestModal] = useState(false);
  return (
    <div className="w-full  ">
      <div className="flex w-full">
        <div className="w-1/4">
          <ChatListComponent
            data={[setInviteFriendModal, setFriendRequestModal]}
          />
        </div>
        <div className="w-3/4">
          <ChatMessageComponent
            data={[
              inviteFriendModal,
              setInviteFriendModal,
              friendRequestModal,
              setFriendRequestModal,
            ]}
          />
        </div>
      </div>
      {/* <ChatInputComponent/> */}
    </div>
  );
}

export default HomeComponent;
