import mongoose from "mongoose";
//grocery module 
interface IGrocery{
    id?:mongoose.Types.ObjectId,
    name:string,
    category:string,
    price:string,
    unit:string,
    image:string,
    createdAt?:Date,
    updatedAt?:Date
}

const grocerySchema=new mongoose.Schema<IGrocery>({
    name:{
        type:String,
        enum:[
            "Fruits & Vegetables",
            "Dairy & Eggs",
            "Rice, Atta & Grains",
            "Snacks & Biscuits",
            "Spices & Masalas",
            "Beverages & Drinks",
            "Personal Care",
            "household Essentials",
            "Instant & Packaged Food",
            "Baby & Pet Care"
        ],
        required:true

    },
    price:{
        type:String,
        required:true
    },
    unit:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }

},{
    timestamps:true
})
// this is for no dupklite of model 
const Grocery=mongoose.models.Grocery || mongoose.model("Grocery",grocerySchema)

export default Grocery

