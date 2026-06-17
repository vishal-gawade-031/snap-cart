import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import mongoose from "mongoose";

interface IGrocery {
    id: mongoose.Types.ObjectId;
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
    },
    increaseQuantity:(state,action:PayloadAction<mongoose.Types.ObjectId>)=>{
      const item=state.cartData.find(i=>i._id == action.payload);
      if(item){
        console.log(item);
        item.quantity=item.quantity + 1
      }
    },
    decreaseQuantity:(state,action:PayloadAction<mongoose.Types.ObjectId>)=>{
          const item=state.cartData.find(i=>._id == action.payload);
          if(item?.quantity && item.quantity > 1){
            item.quantity= item.quantity - 1
          }else{
            
          }
    }
  },
});



export const {addToCart,increaseQuantity}=cartSlice.actions
export default cartSlice.reducer;