/* eslint-disable react/prop-types */
// import React from 'react'

import { useEffect, useState } from "react";
import { getFriendRequests, updateFriendRequestStatus } from "../../api/userApi";
import { useSelector } from "react-redux";
import { userReducer } from "../../redux/slices/userSlice";
import Loader from "../Loader";

function FriendRequest({ data }) {
  const [setFriendRequestModal] = data;
  const [declineLoader,setDeclineLoader] = useState(false)
  const [acceptLoader,setAcceptLoader] = useState(false)
  const [friendRequestList, setFriendRequestList] = useState([]);
  const [filteredFriendRequestList, setFilteredFriendRequestList] = useState([]); //For searching
  const [rerender, setRerender] = useState(false);
  const { userId } = useSelector(userReducer);

  const getAllFriendRequests = async () => {
    const friendRequests = await getFriendRequests(userId);
    if (friendRequests?.response) {
      setFriendRequestList(friendRequests?.response);
      const filteredFriendRequests = friendRequests?.response?.filter(
        (friendReq) => friendReq.friendshipStatus == 'received'
      );
      setFilteredFriendRequestList(filteredFriendRequests);
    }
  };

  console.log("rr",filteredFriendRequestList);

  useEffect(() => {
    getAllFriendRequests();
  }, [rerender]);

  const handleUpdateFriendtStatus = async (friendId,status) => {
    try {
      if(status === 'accepted'){
        setAcceptLoader(true)
      }else{
        setDeclineLoader(true)
      }
      const res = await updateFriendRequestStatus(userId,friendId,status)
      console.log(res);
      if(res){
        setRerender(!rerender);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFriendRequestSearch = (e) => {
    let userRegex = new RegExp(e.target.value);
    const filteredList = friendRequestList.filter((friendRequest) =>
      userRegex.test(friendRequest?.sender.fullname)
    );
    setFilteredFriendRequestList(filteredList);
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
              Friend Requests
            </p>
            <button
              onClick={() => setFriendRequestModal(false)}
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
                  onChange={handleFriendRequestSearch}
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
              {filteredFriendRequestList?.map((user) => {
                return (
                  <div
                    key={user._id}
                    className=" h-16 m-2 bg-gray-200 hover:cursor-pointer hover:bg-gray-300 flex justify-between items-center px-3 rounded-2xl"
                  >
                    <p className="text-xl text-dark text-center">
                      {user?.sender?.fullname}
                    </p>

                    <div className="flex w-full justify-end">
                      <button
                        onClick={() =>
                          handleUpdateFriendtStatus(
                            user?.sender?._id,
                            "accepted"
                          )
                        }
                        type="button"
                        className="text-white w-1/6 flex justify-center bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2"
                      >
                        {acceptLoader ? <Loader /> : "Accept"}
                      </button>
                      <button
                        onClick={() =>
                          handleUpdateFriendtStatus(
                            user?.sender?._id,
                            "declined"
                          )
                        }
                        type="button"
                        className="text-white w-1/6 flex justify-center bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2"
                      >
                        {declineLoader ? <Loader /> : "Decline"}
                      </button>
                    </div>
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

export default FriendRequest;
