// import React from 'react'

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doRegister } from "../api/authApi";
import { errorToast } from "../hooks/toasts";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { userReducer } from "../redux/slices/userSlice";

function RegisterComponent() {
  const navigate = useNavigate();
  const {userId} = useSelector(userReducer)
  
  const isUserLogined = ()=>{
    if(userId){
        navigate('/home')
    }
  }

  useEffect(()=>{
    isUserLogined()
  })

  const [regData, setRegData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const containsNumber = (string) => {
    return /\d/.test(string);
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "fullname" && containsNumber(value)) {
      errorToast("numbers are not allowed");
      return;
    }

    setRegData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateRegData = () => {
    let submitData = true;
    if (
      !regData.fullname.trim() ||
      !regData.email.trim() ||
      !regData.password.trim()
    ) {
      submitData = false;
    }
    return submitData;
  };

  const handleRegisterSubmit = async (e) => {
    try {
      e.preventDefault();
      if (validateRegData()) {
        const response = await doRegister(regData);
        if(response?.created){
          navigate('/')
        }
      }else{
        errorToast("All inputs must be filled")
      }
    } catch (error) {
      errorToast(error.msg.msg);
    }
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900 h-screen">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <p className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img className="w-10 h-10 mr-2" src="./Phone_icon.png" alt="logo" />
            Connectify
          </p>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <form
                onSubmit={handleRegisterSubmit}
                className="space-y-4 md:space-y-6"
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Full Name
                  </label>
                  <input
                    value={regData.fullname}
                    onChange={onInputChange}
                    type="text"
                    name="fullname"
                    id="fullname"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Full Name"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    value={regData.email}
                    onChange={onInputChange}
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    value={regData.password}
                    onChange={onInputChange}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-red-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign up
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already ave an account?{" "}
                  <p
                    onClick={() => navigate("/")}
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign in
                  </p>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
}

export default RegisterComponent;
