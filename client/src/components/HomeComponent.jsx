import { useSelector } from "react-redux";
// import { userReducer } from "../redux/slices/userSlice";
// import ChatInputComponent from "./ChatInputComponent";
import { useEffect, useState } from "react";
import ChatListComponent from "./ChatListComponent";
import ChatMessageComponent from "./ChatMessageComponent";
import { userReducer } from "../redux/slices/userSlice";
import { useRef } from "react";
import { io } from "socket.io-client";

function HomeComponent() {
  const { userId } = useSelector(userReducer);
  const [inviteFriendModal, setInviteFriendModal] = useState(false);
  const [friendRequestModal, setFriendRequestModal] = useState(false);
  const socket = useRef()


  useEffect(() => {

      socket.current = io("http://localhost:3000");
      socket.current.emit("new-user-added", userId);
     
    
  }, [userId]);

  return (
    <div className="w-full  ">
      <div className="flex w-full">
        <div className="w-1/4">
          <ChatListComponent
            data={[
              setInviteFriendModal,
              setFriendRequestModal,
            
            ]}
          />
        </div>
        <div className="w-3/4">
          <ChatMessageComponent
            data={[
              inviteFriendModal,
              setInviteFriendModal,
              friendRequestModal,
              setFriendRequestModal,
              socket,
            ]}
          />
        </div>
      </div>
      {/* <ChatInputComponent/> */}
    </div>
  );
}

export default HomeComponent;
