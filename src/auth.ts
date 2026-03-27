import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import connectDb from "./lib/db"
import User from "./models/user.model";

import bcrypt from "bcryptjs";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  //process while sign in
  providers: [
    Credentials({
      credentials:{
      email:{label :"email",type:"email"},
      password:{label:"password", type:"password"},
      },
      async authorize(credentials, request) {
       
        await connectDb();
              const email=credentials.email;
              const password=credentials.password as string;
              const user = await User.findOne({email});
              if(!user){
                throw new Error("user does not exist");
              }
              const isMatch= await bcrypt.compare(password,user.password);
              if(! isMatch){
                throw new Error("incorrect password");
              }
              return{
                id:user._id,
                email:user.email,
                name:user.name,
                role:user.role
                
              }
      }
 
    },
      
  )
  ],
  callbacks:{
    //tooken is genrated while sign in but there is no data in token 
    // puting data in tooken
    // in this tow callback jwt and session user data is in token and token data is in session
    jwt({token,user}){
      if(user){
        token.id=user.id,
        token.name=user.name,
        token.email=user.email,
        token.role=user.role
      }
      return token;
    },
    session({session,token}){
      if(session.user){
        session.user.id=token.id as string;
        session.user.name=token.name as string;
        session.user.email=token.email as string;
        session.user.role=token.role as string;
      }
      return session;
    }

  },
  pages:{
    signIn:"/login",
    error:"/login"
  },
  session:{
    strategy:"jwt",
    maxAge:10*24*60*60*1000
  },
  secret:process.env.AUTH_SECRET
})
