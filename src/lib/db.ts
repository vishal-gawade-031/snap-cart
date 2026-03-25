import mongoose  from "mongoose";

//create the connection and save it 

const mongodbUrl=process.env.MONGODB_URL

if(!mongodbUrl){
    throw new Error ("error in db");
}

let cached = global.mongoose
if(!cached){
    cached=global.mongoose={conn:null,promise:null}
}

//if cache get connection then it's ok but cache did't get connection then create it new 
//connection of database
const connectDb=async ()=>{
    if(cached.conn){
        return cached.conn
    }
    if(!cached.promise){
        cached.promise=mongoose.connect(mongodbUrl).then((conn)=>conn.connection)
    }
    try{
        const conn=await cached.promise
        return conn
    }
    catch(error){
        console.log(error);
    }
}

export default connectDb