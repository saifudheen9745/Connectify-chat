// import React from 'react'

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doLogin } from "../api/authApi";
import { errorToast } from "../hooks/toasts";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails, userReducer } from "../redux/slices/userSlice";

function LoginComponent() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {userId} = useSelector(userReducer)
  
  const isUserLogined = ()=>{
    if(userId){
        navigate('/home')
    }
  }

  useEffect(()=>{
    isUserLogined()
  },[])

  const [loginData,setLoginData] = useState({
    email:'',
    password:''
  })

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateLoginData = () => {
    let submitData = true;
    if (
      !loginData.email.trim() ||
      !loginData.password.trim()
    ) {
      submitData = false;
    }
    return submitData;
  };

  const hanleLoginSubmit = async(e)=>{
    try {
      e.preventDefault()
      if(validateLoginData()){
        const response = await doLogin(loginData)
        if(response){
          console.log('hello');
          dispatch(setUserDetails(response))
          navigate('/home')
        }
      }else{
        errorToast('All inputs are requied')
      }
    } catch (error) {
      errorToast(error.msg);
    }
  }

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900 h-screen">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <p
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img
              className="w-10 h-10 mr-2"
              src="./Phone_icon.png"
              alt="logo"
            />
            Connectify
          </p>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              
              <form onSubmit={hanleLoginSubmit} className="space-y-4 md:space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    value={loginData.email}
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
                    value={loginData.password}
                    onChange={onInputChange}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>
                <div className="flex items-center justify-between">
                  
                  <a
                    href="#"
                    className="text-sm text-center text-white font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Forgot password?
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-red-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign in
                </button>
                <div className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <p
                    onClick={()=>navigate('/register')}
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer/>
    </>
  );
}

export default LoginComponent;
