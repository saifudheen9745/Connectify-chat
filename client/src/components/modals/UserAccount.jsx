/* eslint-disable react/prop-types */
// import React from 'react'

import { useEffect, useRef, useState } from "react";
import { errorToast, successToast } from "../../hooks/toasts";
import { ToastContainer } from "react-toastify";
import {
  getAllFriends,
  unfriendAFriend,
  updateProfilePic,
  updateUserDetails,
} from "../../api/userApi";
import {
  setUpdatedDetails,
  setUpdatedImage,
  userReducer,
} from "../../redux/slices/userSlice";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loader";
import { checkHaveImage, instantImage } from "../../hooks/ImageHelper";
import {
  rerenderReducer,
  setRerender,
} from "../../redux/slices/rerenderChatListSlice";

function UserAccount({ data }) {
  const inputRef = useRef(null);
  const rerender = useSelector(rerenderReducer);
  const [setUserAccountModal] = data;
  const dispatch = useDispatch();
  const { userId, fullname, email, img } = useSelector(userReducer);
  const [userDetails, setUserDetails] = useState({
    userId,
    fullname: fullname,
    email: email,
    img: img,
  });
  const [imageLoader, setImageLoader] = useState(false);

  const [friendsList, setFriendsList] = useState([]);
  const [filteredFriendsList, setFilteredFriendsList] = useState([]);

  useEffect(() => {
    console.log("rerendered");
  }, [rerender, imageLoader]);

  const containsNumber = (string) => {
    return /\d/.test(string);
  };

  const handleUserInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "fullname" && containsNumber(value)) {
      errorToast("numbers are not allowed");
      return;
    }

    setUserDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateUserData = () => {
    let submitData = true;
    if (!userDetails.fullname.trim() || !userDetails.email.trim()) {
      submitData = false;
    }
    return submitData;
  };

  const handleUserDetailsSubmit = async (e) => {
    try {
      e.preventDefault();
      if (validateUserData()) {
        const userUpdateRes = await updateUserDetails(userDetails);
        if (userUpdateRes.updated) {
          dispatch(setUpdatedDetails(userDetails));

          successToast("Details updated successfully");
        }
      } else {
        errorToast("All inputs must be filled");
      }
    } catch (error) {
      errorToast(error.msg.msg);
    }
  };

  const handleFileUploadClick = () => {
    inputRef.current.click();
  };

  const hanldeFileChange = async (e) => {
    try {
      setImageLoader(true);
      e.preventDefault();
      const image = e.target.files[0];

      const formData = new FormData();
      formData.append("image", image);
      formData.append("imageName", userId);
      const profilePicUpdateRes = await updateProfilePic(formData);
      if (profilePicUpdateRes?.upload) {
        dispatch(setUpdatedImage(profilePicUpdateRes?.imageUrl));
        setUserDetails({ ...userDetails, img: profilePicUpdateRes?.imageUrl });
        setImageLoader(false)
      }
    } catch (error) {
      console.log(error);
      errorToast("Picture upload failed");
    }
  };

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
  }, []);

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

  const handleUnfriend = async (elem) => {
    let friendId;
    if (elem?.receiver?._id === userId) {
      friendId = elem?.sender?._id;
    } else {
      friendId = elem?.receiver?._id;
    }
    try {
      const response = await unfriendAFriend(userId, friendId);
      if (response.deleted) {
        const newFilteredFriendList = filteredFriendsList.filter(
          (friend) => friend?._id != elem?._id
        );
        setFilteredFriendsList(newFilteredFriendList);
        dispatch(setRerender(!rerender));
      }
    } catch (error) {
      throw { error };
    }
  };

  return (
    <div className="">
      <style>
        {`

          #parent:hover #child{
            display:flex;
          }

          /* Hide the scrollbar */
          ::-webkit-scrollbar {
            width: 0.5em;
          }

          /* Track */
          ::-webkit-scrollbar-track {
            background: transparent;
          }

          /* Handle */
          ::-webkit-scrollbar-thumb {
            background: transparent;
          }

          /* Handle on hover */
          ::-webkit-scrollbar-thumb:hover {
            background: rgba(0, 0, 0, 0.2);
          }

        `}
      </style>
      <div
        id="staticModal"
        data-modal-backdrop="static"
        tabIndex="-1"
        aria-hidden="true"
        className={`mb-20 flex fixed backdrop-blur-sm justify-center items-center w-full p-4 overflow-x-hidden overflow-y-auto inset-0 h-full max-h-full`}
      >
        <div className="flex w-[80%] opacity-80 h-[80%] bg-indigo-400 rounded-lg shadow-blue-300 shadow-2xl p-2 gap-1">
          <img
            className="text-red-900 w-14 h-14 absolute cursor-pointer"
            onClick={() => setUserAccountModal(false)}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Back_Arrow.svg/1200px-Back_Arrow.svg.png"
            alt="back"
          />
          <div className="w-[30%] h-full bg-indigo-400 flex flex-col gap-2 items-center justify-center">
            <div
              id="parent"
              className=" h-[35%] relative w-[60%] rounded-full flex flex-col justify-center bg-blue-400 items-center"
            >
              {imageLoader ? (
                <Loader />
              ) : (
                <img
                  className="rounded-full w-5/6 h-5/6"
                  src={userDetails.img ? userDetails.img : instantImage}
                  alt="img"
                />
              )}
              <div
                id="child"
                className="w-full hidden absolute justify-center items-center "
              >
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  className="hidden"
                  ref={inputRef}
                  onChange={hanldeFileChange}
                />
                <button
                  onClick={handleFileUploadClick}
                  type="button"
                  className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                >
                  Remove
                </button>
              </div>
            </div>
            <div className="bg-indigo-500 opacity-100 h-[55%] w-[90%] rounded-xl p-5">
              <div>
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  onChange={handleUserInputChange}
                  value={userDetails.fullname}
                  type="text"
                  id="fullname"
                  name="fullname"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="John"
                  required
                />
              </div>
              <div className="mt-3">
                <label
                  htmlFor="last_name"
                  className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  onChange={handleUserInputChange}
                  value={userDetails.email}
                  type="text"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Doe"
                  required
                />
              </div>
              <div className="text-center mt-10 opacity-100">
                <button
                  className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800"
                  onClick={handleUserDetailsSubmit}
                >
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Submit
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div className="w-[70%] h-full rounded-xl bg-indigo-500 p-5">
            <div className="h-[10%]">
              <span className="text-5xl text-white font-semibold shadow-2xl shadow-blue-500 flex justify-center pb-5">
                Friends List
              </span>
            </div>
            <div className="h-[90%]  rounded-lg">
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
                      className="bg-gray-50 border h-14 mt-2 text-dark border-gray-300  text-sm rounded-lg  w-full pl-10 p-2.5  dark:bg-gray-100 dark:border-gray-600"
                      placeholder="Search"
                      required
                    />
                  </div>
                </form>
              </div>
              <div className=" h-[90%] text-dark m-2 pt-3 overflow-y-scroll">
                {filteredFriendsList?.map((elem, i) => {
                  return (
                    <div
                      key={i}
                      className="m-2 flex gap-10 items-center border p-2 rounded-md hover:bg-indigo-700 cursor-pointer"
                    >
                      <div className="h-14 w-14 flex justify-center items-center rounded-full">
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
                      <div className="flex justify-between w-full">
                        <p className="text-white text-3xl">
                          {elem?.receiver?._id === userId
                            ? elem?.sender?.fullname
                            : elem?.receiver?.fullname}
                        </p>
                        <button
                          onClick={() => handleUnfriend(elem)}
                          type="button"
                          className="text-white  flex justify-center bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2"
                        >
                          Unfriend
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
      <ToastContainer />
    </div>
  );
}

export default UserAccount;
