// flow of signup
//connect db
// name,email,password
// email check 
// password 6 char
// password hash

import connectDb from "@/lib/db";    
import User from "@/models/user.model"
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

// user create
export async function POST(req:NextRequest) {
    try{
        const {email,name,password}=await req.json();
        await connectDb();
        if(!connectDb){
            console.log("error while connecting database");
            return;
        }
        console.log("info from request 22",email,name,password);
        const existUser=await User.findOne({email});
        if(existUser){
            return NextResponse.json(
                {massage:"email already exist!"},
                {status:400}
            )
        }
        if(password.length < 6){
            return NextResponse.json(
              {massage:"password should have atlist six characters"},
              {status:400}  
            )
            }

        const hashPassword=await bcrypt.hash(password,10);
        const user=await User.create({
            name,email,password:hashPassword
        })
        return NextResponse.json(
            user,
            {status:200}
        )
    }
    catch(error){
                    return NextResponse.json(
                        {message:`register error ${error}`},
                        {status:500}
                    )
    }
}
    
