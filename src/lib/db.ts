import mongoose  from "mongoose";

//create the connection and save it 

const mongooseUrl=process.env.MONGODB_URL

if(!mongooseUrl){
    throw new Error ("error in db");
}
