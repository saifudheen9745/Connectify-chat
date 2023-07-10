// import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetUserDetails, userReducer } from "../redux/slices/userSlice";
// import { useState } from "react";
import InviteFriend from "./modals/InviteFriend";
import FriendRequest from "./modals/FriendRequest";
import { useEffect, useRef, useState } from "react";
import UserAccount from "./modals/UserAccount";
import { checkHaveImage } from "../hooks/ImageHelper";
import {
  currentChatReducer,
  resetCurrentChat,
  resetCurrentMessages,
  appendToCurrentMessages,
} from "../redux/slices/currentChatSlice";
import { sendAMessage } from "../api/chatApi";
import { errorToast } from "../hooks/toasts";
import { ToastContainer } from "react-toastify";

// eslint-disable-next-line react/prop-types
function ChatMessageComponent({ data }) {
  const { userId, img } = useSelector(userReducer);
  const { currentChat, currentChatMessages, currentChatId } =
    useSelector(currentChatReducer);
  const [

    inviteFriendModal,
    setInviteFriendModal,
    friendRequestModal,
    setFriendRequestModal,
    socket,
  ] = data;
  const [message, setMessage] = useState({
    chatId: currentChatId,
    sender: userId,
    message: "",
  });
  const messageInputRef = useRef(null);

  const [userAccountModal, setUserAccountModal] = useState(false);
  const [rerender, setRerender] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("rerendeing after socket");
  }, [rerender]);

  const handleLogout = () => {
    dispatch(resetUserDetails());
    localStorage.clear();
    dispatch(resetCurrentChat());
    dispatch(resetCurrentMessages());
    navigate("/");
    // disconnectFromSocket()
  };

  const handleMessageInput = async (e) => {
    const { value } = e.target;
    setMessage({ ...message, message: value });
  };

  const handleMessageSend = async () => {
    try {
      setMessage((prev) => ({ ...prev, chatId: currentChatId }));
      if (message.chatId == undefined) {
        errorToast("no chat id");
        return;
      }
      //Sending the message to database
      const sendMessage = await sendAMessage(message);
      if (sendMessage?.send) {
        messageInputRef.current.value = "";
        setMessage({ ...message, message: "" });
        dispatch(appendToCurrentMessages(sendMessage?.message));
      }

      //Sending the message to the socket server

      socket.current.emit("send-message", {
        receiverId: currentChat?._id,
        message: sendMessage?.message,
      });

      await socket.current.on("receive-message", (data) => {
        console.log("receivedone", data);
        setRerender(!rerender)
      });
      console.log(rerender);
    } catch (error) {
      console.log(error);
      errorToast("Message not send");
    }
  };



  return (
    <div className="h-screen w-full bg-white">
      <div className="flex justify-between p-4">
        <div className="flex justify-start items-center gap-8">
          <p className="rotate-180 text-3xl">➜</p>
          <div className="h-14 w-14 flex justify-center items-center rounded-full">
            <img
              className="w-16 rounded-full"
              src={currentChat && checkHaveImage(currentChat)}
              alt=""
            />
          </div>
          <p>{currentChat && currentChat?.fullname}</p>
        </div>
        <div className="flex items-center pr-5">
          <button
            onClick={handleLogout}
            type="button"
            className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-4"
          >
            Logout
          </button>
          <div
            onClick={() => setUserAccountModal(true)}
            className="h-14 w-14 flex justify-center items-center rounded-full hover:cursor-pointer"
          >
            <img
              className="w-16 h-14 rounded-full"
              src={
                img
                  ? img
                  : "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=2000"
              }
              alt=""
            />
          </div>
        </div>
      </div>
      <hr />

      {!currentChat && (
        <div className="h-[92%] w-full flex justify-center items-center ">
          <img
            src="https://cdn.dribbble.com/users/2058540/screenshots/8225138/media/af6d6d059328c6f2f9f6e7878c094c7e.gif"
            alt=""
            className="w-3/4 h-3/4"
          />
        </div>
      )}

      {currentChat && (
        <ul className="list-disc overflow-y-scroll h-[85%] py-4 ">
          {currentChatMessages.map((elem, i) => {
            return (
              <li
                className={`${
                  elem?.sender?._id == userId ? "justify-end" : "justify-start"
                } m-2 p-2 rounded-3xl flex`}
                key={i}
              >
                <div
                  className={`min-w-[10%] text-center items-center flex h-16 border rounded-3xl  bg-purple-400  p-2  max-w-[50%]`}
                >
                  {/* <p className="text-white">{elem?.sender?._id == userId ? "You" : elem?.sender?.fullname}</p> */}
                  <p className="break-all text-dark text-xl">{elem.message}</p>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {currentChat && (
        <div className="flex items-center mt-3 justify-center gap-2">
          <input
            ref={messageInputRef}
            value={message.message}
            type="text"
            id="messageInput"
            onKeyDown={(event) => {
              if (event.keyCode === 13) {
                event.preventDefault();
                handleMessageSend();
              }
            }}
            onChange={handleMessageInput}
            className="bg-gray-50 border border-gray-500 w-[90%] text-gray-900 text-sm rounded-lg  block  p-2.5  "
            required
          />
          <button
            onClick={handleMessageSend}
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Send
          </button>
        </div>
      )}
      <div className="">
        {inviteFriendModal && <InviteFriend data={[setInviteFriendModal]} />}
        {friendRequestModal && <FriendRequest data={[setFriendRequestModal]} />}
        {userAccountModal && <UserAccount data={[setUserAccountModal]} />}
      </div>
      <ToastContainer />
    </div>
  );
}

export default ChatMessageComponent;
