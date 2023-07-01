import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  fullname:'',
  userId:'',
  accessToken:'',
  email:'',
  img:""
}

export const userSlice = createSlice({
  name: 'userDetails',
  initialState,
  reducers: {
    setUserDetails: (state,action) => {
        const { _id, fullname, email, accessToken, img } = action.payload;
        state.userId = _id !== undefined ? _id : state.userId;
        state.fullname = fullname !== undefined ? fullname : state.name;
        state.email = email !== undefined ? email : state.email;
        state.accessToken = accessToken !== undefined ? accessToken : state.accessToken;
        state.img = img !== undefined ? img : state.Img
    },
    setUpdatedDetails: (state,action) => {
      const {userId,fullname,email} = action.payload
      state.userId = userId !== undefined ? userId : state.userId;
        state.fullname = fullname !== undefined ? fullname : state.name;
        state.email = email !== undefined ? email : state.email;
    },
    setUpdatedImage:(state,action) => {
      const img = action.payload
      state.img = img !== undefined ? img : state.img
    },
    resetUserDetails:(state,)=>{
        state.userId = ""
        state.fullname = ""
        state.email = ""
        state.accessToken = ""
        state.img = ""
    }
    
  },
})

// Action creators are generated for each case reducer function
export const { setUserDetails,resetUserDetails,setUpdatedDetails,setUpdatedImage } = userSlice.actions
//For the store
export default userSlice.reducer
//To access the state details
export const userReducer = (state)=>state.persistedReducer
