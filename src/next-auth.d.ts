import { DefaultSession } from "next-auth";

// make a chage in package
declare module "next-auth" {
    interface Session {
        user: {
            id:string,
            role:string,
        } & DefaultSession["user"]
    }

    interface User{
        id:string,
        name:string,
        email:string,
        role:string,
    }
}
export {}
