/* eslint-disable react/prop-types */
// import React from 'react'

import { useDispatch, useSelector } from "react-redux";
import { userReducer } from "../redux/slices/userSlice";
import { getAllFriends } from "../api/userApi";
import { useEffect, useState } from "react";
import { checkHaveImage, findFriend } from "../hooks/ImageHelper";
import { rerenderReducer } from "../redux/slices/rerenderChatListSlice";
import { createAChat } from "../api/chatApi";
import { errorToast } from "../hooks/toasts";
import {
  setCurrentChat,
  setCurrentChatId,
  setCurrentMessages,
} from "../redux/slices/currentChatSlice";

function ChatListComponent({ data }) {
  const dispatch = useDispatch();

  const [setInviteFriendModal, setFriendRequestModal] = data;
  const [friendsList, setFriendsList] = useState([]);
  const [filteredFriendsList, setFilteredFriendsList] = useState([]);
  const { fullname, userId } = useSelector(userReducer);
  const rerender = useSelector(rerenderReducer);

  const getFriends = async (userId) => {
    const friends = await getAllFriends(userId);
    setFriendsList(friends?.response);
    const filteredFriends = friends?.response?.friendsList?.filter(
      (friend) => friend?.friendshipStatus == "accepted"
    );
    setFilteredFriendsList(filteredFriends);
  };

  useEffect(() => {
    getFriends(userId);
  }, [rerender]);

  const hanldeInviteFriendclick = () => {
    setInviteFriendModal(true);
  };

  const handleFriendRequest = () => {
    setFriendRequestModal(true);
  };

  const handleFriendsSearch = (e) => {
    const regex = new RegExp(e.target.value);
    const searchResult = friendsList?.friendsList?.filter((friend) => {
      if (friend?.receiver?._id == userId) {
        return regex.test(friend?.sender?.fullname);
      } else {
        return regex.test(friend?.receiver?.fullname);
      }
    });
    const finalSearchResult = searchResult?.filter(
      (friend) => friend?.friendshipStatus == "accepted"
    );
    setFilteredFriendsList(finalSearchResult);
  };

  const handleChatClick = async (elem) => {
    let friendId;

    if (elem?.receiver?._id === userId) {
      friendId = elem?.sender?._id;
    } else {
      friendId = elem?.receiver?._id;
    }

    const chatObj = {
      memberOne: userId,
      memberTwo: friendId,
    };

    try {
      const createChatResponse = await createAChat(chatObj);
      if (createChatResponse?.created) {
        const findTheFriendFromSelectedChat = async () => {
          const selectedOne = await findFriend(
            createChatResponse?.response?.existingChat,
            userId
          );
          dispatch(
            setCurrentChatId(createChatResponse?.response?.existingChat?._id)
          );
          dispatch(setCurrentChat(selectedOne));
          dispatch(
            setCurrentMessages(createChatResponse?.response?.chatMessages)
          );
        };
        findTheFriendFromSelectedChat();
      }
    } catch (error) {
      errorToast("Chat not created");
    }
  };

  return (
    <div className="h-screen w-full ">
      <div className=" h-11 w-full">
        <p className=" text-4xl text-center">Messages</p>
        <p className="text-center">{fullname ? fullname : ""}</p>
      </div>
      <div className="my-5 px-3 h-11 w-full">
        <form className="flex items-center">
          <label htmlFor="simple-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              onChange={handleFriendsSearch}
              type="text"
              id="simple-search"
              className="bg-gray-50 border text-dark border-gray-300  text-sm rounded-lg  w-full pl-10 p-2.5  dark:bg-gray-100 dark:border-gray-600"
              placeholder="Search"
              required
            />
          </div>
        </form>
      </div>
      <div className="px-3 flex justify-evenly gap-2">
        <button
          onClick={hanldeInviteFriendclick}
          type="button"
          className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2"
        >
          Invite a friend
        </button>
        <button
          onClick={handleFriendRequest}
          type="button"
          className="inline-flex items-center  text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2"
        >
          Request
          <span className="inline-flex items-center justify-center w-5 h-5 ml-2 text-xs font-semibold text-blue-800 bg-white rounded-full">
            0
          </span>
        </button>
        <button
          type="button"
          className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2"
        >
          Create new group
        </button>
      </div>
      <div className="bg-white h-[80%] text-dark pt-3 overflow-y-scroll">
        {filteredFriendsList?.map((elem, i) => {
          return (
            <div
              onClick={() => handleChatClick(elem)}
              key={i}
              className="m-2 flex gap-10 items-center border p-2 rounded-md hover:bg-gray-200 cursor-pointer"
            >
              <div className="h-14 w-14 flex justify-center items-center bg-red-500 rounded-full">
                <img
                  className="rounded-full"
                  src={
                    elem?.receiver?._id === userId
                      ? checkHaveImage(elem?.sender)
                      : checkHaveImage(elem?.receiver)
                  }
                  alt=""
                />
              </div>
              <div>
                <p className="text-dark text-3xl">
                  {elem?.receiver?._id === userId
                    ? elem?.sender?.fullname
                    : elem?.receiver?.fullname}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ChatListComponent;
