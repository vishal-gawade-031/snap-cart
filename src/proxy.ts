//middleware

import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

//req--------middleware-------server  
export async function proxy(req:NextRequest){
    const{pathname}=req.nextUrl
    // console.log("pathname:",pathname);
    const publicRoutes=["/login","/register","/api/auth"]
            if(publicRoutes.some((path)=>pathname.startsWith(path))){
                return NextResponse.next();
            }

            //acces token
    const token=await getToken({
        req,
        secret:process.env.AUTH_SECRET
    })
    // console.log("token:",token);
    console.log(req.url);
    if(!token){
        const loginUrl=new URL("/login",req.url);
        //if user try to go home then it will push to login after user varified then it will redirect to home 
         loginUrl.searchParams.set("callbackUrl",req.url);
        return NextResponse.redirect(loginUrl);
    }

    
   return NextResponse.next();
}
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
