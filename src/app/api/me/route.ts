import { auth } from "@/auth";
import connectDb from "@/lib/db";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

//creating api to acces the user data with session
export async function GET() {
  try {
    const session = await auth();
    console.log("session:", session);
    if (!session?.user?.email) {
      return NextResponse.json(
        { message: "user is not authenticated" },
        { status: 400 },
      );
    }

   await connectDb();
   const user = await User.findOne({ email: session.user.email }).select("-password").exec();

    
    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 400 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
        {message:`get me error:${error}`},
        {status:500}
    )
    
    
  }
}
