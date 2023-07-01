// import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetUserDetails, userReducer } from "../redux/slices/userSlice";
// import { useState } from "react";
import InviteFriend from "./modals/InviteFriend";
import FriendRequest from "./modals/FriendRequest";
import { useState } from "react";
import UserAccount from "./modals/UserAccount";
  


const chatObj = {
  name: "someone",
  time: "3:44",
  msg: "hello, how are youkkkkkkkkkkkkkkkkkk",
};

const chats = [
  chatObj,
  chatObj,
  chatObj,
  chatObj,
  chatObj,
  chatObj,
  chatObj,
  chatObj,
  chatObj,
  chatObj,
  chatObj,
  chatObj,
  chatObj,
  chatObj,
  chatObj,
  chatObj,
  chatObj,
  chatObj,
  chatObj,
  chatObj,
  chatObj,
  chatObj,
  chatObj,
  chatObj,
  chatObj,
  chatObj,
  chatObj,
  chatObj,
  chatObj,
  chatObj,
  chatObj,
  chatObj,
  chatObj,
  chatObj,
  chatObj,
  chatObj,
  chatObj,
  chatObj,
  chatObj,
  chatObj,
];

// eslint-disable-next-line react/prop-types
function ChatMessageComponent({data}) {
  
  const { userId,img } = useSelector(userReducer);

  const [
    inviteFriendModal,
    setInviteFriendModal,
    friendRequestModal,
    setFriendRequestModal,
  ] = data;

  const [userAccountModal,setUserAccountModal] = useState(false)
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(resetUserDetails());
    localStorage.clear();
    navigate("/");
    console.log('hello');
  };

  

  return (
    <div className="h-screen w-full bg-white">
      <div className="flex justify-between p-4">
        <div className="flex justify-start items-center gap-8">
          <div className="h-14 w-14 flex justify-center items-center rounded-full">
            <img
              className="w-16 rounded-full"
              src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=2000"
              alt=""
            />
          </div>
          <p>Here comes the name</p>
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
            onClick={()=>setUserAccountModal(true)}
            className="h-14 w-14 flex justify-center items-center rounded-full hover:cursor-pointer">
            <img
              className="w-16 rounded-full"
              src={img ? img : "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=2000"}
              alt=""
            />
          </div>
        </div>
      </div>
      <hr />
      <ul className="list-disc overflow-y-scroll h-[85%] py-4 ">
        {chats.map((elem, i) => {
          return (
            <li className="m-2 p-2 " key={i}>
              <div className="border bg-purple-400 text-white p-2 inline-table max-w-[50%]">
                <p>{elem.name}</p>
                <p className="break-all">{elem.msg}</p>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="flex items-center mt-3 justify-center gap-2">
        <input
          type="password"
          id="password"
          className="bg-gray-50 border border-gray-500 w-[90%] text-gray-900 text-sm rounded-lg  block  p-2.5  dark:text-white "
          required
        />
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Send
        </button>
      </div>
      <div className="">
        {inviteFriendModal && <InviteFriend data={[setInviteFriendModal]} />}
        {friendRequestModal && <FriendRequest data={[setFriendRequestModal]} />}
        {userAccountModal && <UserAccount data={[setUserAccountModal]}/>}
      </div>
    </div>
  );
}

export default ChatMessageComponent;
