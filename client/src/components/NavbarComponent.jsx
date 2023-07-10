// import React from 'react'

import { useDispatch } from "react-redux";
import { resetUserDetails } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";


function NavbarComponent() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    

    const handleLogout = ()=>{
        dispatch(resetUserDetails())
        localStorage.clear()
        navigate('/')
    }

  return (
    <nav className="bg-white w-full h-16  border-gray-200 dark:bg-gray-900">
      <div className="flex ">
        <div className="flex w-1/2 items-center h-16 pl-4 ">
          <p className="text-white font-bold text-4xl">Connectify</p>
        </div>
        <div className="w-1/2 h-16 flex justify-end items-center">
          <div className="w-10 h-10 mr-3 bg-white rounded-full">
          </div>  
          <button
            onClick={handleLogout}
            type="button"
            className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-4"
          >
            Logout
          </button>
          
        </div>
      </div>
    </nav>
  );
}

export default NavbarComponent;
