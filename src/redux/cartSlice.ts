import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import mongoose from "mongoose";

interface IGrocery {
    id?: mongoose.Types.ObjectId;
    name: string;
    category: string;
    price: string;
    unit: string;
    quantity:number;
    image: string;
  
}
//next step is write the api to featch the user data and store it in this states 
interface ICartSlice {
cartData:IGrocery[]
}

const initialState: ICartSlice = {
    cartData:[]
};

const cartSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addToCart:(state,action:PayloadAction<IGrocery>)=>{
        state.cartData.push(action.payload)
    }
  },
});



export const {addToCart}=cartSlice.actions
export default cartSlice.reducer;