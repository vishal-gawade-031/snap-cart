import { createSlice } from "@reduxjs/toolkit";
import mongoose from "mongoose";

interface IUser {
  _id?: mongoose.Types.ObjectId;
  name: string;
  password?: string;
  mobile?: string;
  email: string;
  role: "user" | "deliveryBoy" | "admin";
  image?: string;
}
//next step is write the api to featch the user data and store it in this states 
interface UserState {
  userdata: IUser | null;
  vishal:null
}

const initialState: UserState = {
//   data will provided from reducer
    userdata: null,
    vishal:null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    //in usedispacth is call action.payload will store all the data
    setUserData:(state,action)=>{
      state.userdata=action.payload
    }
  },
});



export const {setUserData}=userSlice.actions
export default userSlice.reducer;