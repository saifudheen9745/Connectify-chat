/* eslint-disable react/prop-types */
// import React from 'react'

import { useRef, useState } from "react";
import { errorToast, successToast } from "../../hooks/toasts";
import { ToastContainer } from "react-toastify";
import { updateProfilePic, updateUserDetails } from "../../api/userApi";
import { setUpdatedDetails, userReducer } from "../../redux/slices/userSlice";
import { useSelector, useDispatch } from "react-redux";

function UserAccount({ data }) {
  const inputRef = useRef(null)
  const [setUserAccountModal] = data;
  const dispatch = useDispatch();
  const { userId } = useSelector(userReducer);
  const [userDetails, setUserDetails] = useState({
    userId,
    fullname: "",
    email: "",
  });
  const [image,setImage] = useState('')

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
      console.log(error);
      errorToast(error.msg.msg);
    }
  };

  const handleFileUploadClick = ()=>{
    inputRef.current.click()
  }

  const hanldeFileChange = async(e)=>{
    try {
      e.preventDefault();
      const image = e.target.files[0]
      const formData = new FormData()
      formData.append('image',image)
      formData.append('imageName',userId)
      const profilePicUpdateRes = await updateProfilePic(formData)
      console.log(profilePicUpdateRes);
    } catch (error) {
      errorToast('Picture upload failed')
    }
  }

  return (
    <div className="">
      <style>
        {`

          #parent:hover #child{
            display:block;
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
            onClick={()=>setUserAccountModal(false)}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Back_Arrow.svg/1200px-Back_Arrow.svg.png"
            alt="back"
          />
          <div className="w-[30%] h-full bg-indigo-400 flex flex-col gap-2 items-center justify-center">
            <div
              id="parent"
              className=" h-[28%] relative w-[50%] rounded-full flex flex-col justify-center items-center"
            >
              <img
                className="rounded-full"
                src="data:image/jpeg;base64,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"
                alt="img"
              />
              <div
                id="child"
                className="w-full hidden absolute left-6 bottom-7 "
              >
                <input type="file" name="image" accept="image/*" className="hidden" ref={inputRef} onChange={hanldeFileChange}/>
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
          <div className="w-[70%] h-full rounded-xl bg-indigo-500"></div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default UserAccount;
