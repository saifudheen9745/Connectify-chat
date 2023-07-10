/* eslint-disable react/prop-types */
// import React from 'react'

import { useEffect, useState } from "react";
import {
  cancelFriendRequest,
  getUsers,
  resentFriendRequest,
  sendFriendRequest,
} from "../../api/userApi";
import { useSelector } from "react-redux";
import { userReducer } from "../../redux/slices/userSlice";
import { isAccepted, isDeclined, isInvited } from "../../hooks/buttonHelpers";
import Loader from "../Loader";

function InviteFriend({ data }) {
  
  const [setInviteFriendModal] = data;
  const [usersList, setUsersList] = useState([]);
  const [sentLoader,setSentLoader] = useState('')
  const [resentLoader,setResentLoader] = useState('')
  const [cancelLoader, setCancelLoader] = useState('')
  const [filteredUsersList, setFilteredUsersList] = useState(); //For searching
  const [rerender, setRerender] = useState(false);
  const { userId } = useSelector(userReducer);

  const getAllUsers = async () => {
    const users = await getUsers();
    setUsersList(users);
    const filteredUser = users.filter((user) => user?._id != userId);
    setFilteredUsersList(filteredUser);
  };

  useEffect(() => {
    getAllUsers();
  }, [rerender]);

  const handleInviteFriend = async (friendId) => {
    try {
      setSentLoader(friendId)
      const response = await sendFriendRequest(userId, friendId);
      if (response) {
        setSentLoader('')
        setRerender(!rerender);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelFriendRequest = async (friendId) => {
    try {
      setCancelLoader(friendId)
      const response = await cancelFriendRequest(userId, friendId);
      console.log(response);
      if (response) {
        setCancelLoader('')
        setRerender(!rerender);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleResendFriendRequest = async (friendId) => {
    try {
      setResentLoader(friendId)
      const response = await resentFriendRequest(userId, friendId);
      console.log(response);
      if (response) {
        setResentLoader('')
        setRerender(!rerender);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleInviteFriendSearch = (e) => {
    let userRegex = new RegExp(e.target.value);
    const filteredList = usersList.filter(
      (user) => userRegex.test(user.fullname) && user._id != userId
    );
    setFilteredUsersList(filteredList);
  };

  return (
    <div className="">
      <div
        id="staticModal"
        data-modal-backdrop="static"
        tabIndex="-1"
        aria-hidden="true"
        className={`mb-20 flex fixed backdrop-blur-sm   justify-center items-center   w-full p-4 overflow-x-hidden overflow-y-auto inset-0 h-full max-h-full`}
      >
        <div className="h-[60%] w-[50%] border rounded-2xl  shadow-2xl bg-gray-100 ">
          <div className="flex justify-between p-2">
            <p className="text-center flex-1 text-slate-600 text-2xl mt-5 font-bold">
              Invite new friends
            </p>
            <button
              onClick={() => setInviteFriendModal(false)}
              type="button"
              className="text-white text-end bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 mr-5 "
            >
              Close
            </button>
          </div>
          <div className="p-5">
            <form>
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </div>
                <input
                  onChange={handleInviteFriendSearch}
                  type="search"
                  id="default-search"
                  className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-500 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search Mockups, Logos..."
                  required
                />
              </div>
            </form>
          </div>
          <div className="w-full h-full flex  justify-center">
            <div className=" h-[70%] w-[95%] p-3 rounded-2xl pt-3 flex-col bg-gray-100 shadow-lg overflow-y-scroll">
              {filteredUsersList?.map((user) => {
                return (
                  <div
                    key={user._id}
                    className=" h-16 m-2 bg-gray-200 hover:cursor-pointer hover:bg-gray-300 flex justify-between items-center px-3 rounded-2xl"
                  >
                    <p className="text-xl text-dark">{user?.fullname}</p>

                    {isAccepted(userId, user) ? (
                      <button
                        type="button"
                        className="text-white w-1/6 flex justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      >
                        Send Message
                      </button>
                    ) : isDeclined(userId, user) ? (
                      <span className="flex items-center gap-2">
                        <p className="text-red-600">Rejected !</p>
                        <button
                          onClick={() => handleResendFriendRequest(user._id)}
                          type="button"
                          className="text-white w-1/6 flex justify-center bg-orange-500 hover:bg-orange-500 focus:ring-4 focus:ring-orange-500 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-orange-500 dark:hover:bg-orange-500 focus:outline-none dark:focus:ring-orange-500"
                        >
                          {resentLoader === user._id ? <Loader /> : "Retry"}
                        </button>
                      </span>
                    ) : isInvited(userId, user) ? (
                      <button
                        onClick={() => handleCancelFriendRequest(user._id)}
                        type="button"
                        className="focus:outline-none w-1/6 flex justify-center text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                      >
                        {cancelLoader === user._id ? (
                          <Loader />
                        ) : (
                          "Cancel Request"
                        )}
                      </button>
                    ) : (
                      <button
                        onClick={() => handleInviteFriend(user._id)}
                        type="button"
                        className="focus:outline-none w-1/6 flex justify-center text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                      >
                        {sentLoader === user._id ? <Loader /> : "Send Request"}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InviteFriend;
