import { auth } from "@/auth";
import EditRoleMobile from "@/components/EditRoleMobile";
import Nav from "@/components/Nav";
import connectDb from "@/lib/db";
import User from "@/models/user.model";
import { redirect } from "next/navigation";
import React from "react";

async function Home(){
    await connectDb();
    const session=await auth();
    // console.log(session);
    const  user=await User.findById(session?.user?.id);
    if(!user){
      redirect("/login");
    }
    const inComplete=!user.mobile || !user.role || (!user.mobile && user.role=="user");
    console.log("result of incomplete:",inComplete);
    if(inComplete){
       return <EditRoleMobile/>
    }
    // passing  as a prop 
    const plainUser=JSON.parse(JSON.stringify(user))
  
  return(
    <>
    {/* alreday we are featching the user information so pass it throw the prop  */}
    <Nav user={plainUser}/>
    </>
  )
}
export default Home 