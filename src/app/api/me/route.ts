import { auth } from "@/auth";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

//creating api to acces the user data with session
export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    console.log("session:", session);
    if (!session || session.user) {
      return NextResponse.json(
        { message: "user is not authenticated" },
        { status: 400 },
      );
    }

   const user = await User.findOne({ email: session.user.email }).select("-password").exec();

    
    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json(
        {message:`get me error:$(error)`},
        {status:500}
    )
    
    
  }
}
