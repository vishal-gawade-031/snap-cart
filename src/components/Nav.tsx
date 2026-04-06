import React from 'react'
import Link from 'next/link'
import mongoose from 'mongoose'
import Image from "next/image"
import { Search, ShoppingCart, ShoppingCartIcon, User } from 'lucide-react'
interface IUser{
    _id?:mongoose.Types.ObjectId
    name:string
    password?:string
    mobile?:string
    email:string
    role:"user" | "deliveryBoy" | "admin"
    image?:string
}
function Nav({user}:{user:IUser}) {
   // console.log(user);
  return (
    <div className='w-[95%] fixed top-4 left-1/2 -translate-x-1/2 bg-linear-to-r from-green-500 to-green-700
    rounded-2xl shodow-lg shadow-black/30 flex justify-between items-center h-20 px-4
    md:px-8 z-50'>
        <Link href={"/"} className="text-white font-extrabold text-2xl sm:text-3xl tracking-wide
        hover:scale-105 transition-transform">
            Snapcart
        </Link>

        <form className='hidden md:flex item-center bg-white rounded-full px-4 py-2 w-1/2 max-w-lg shadow-md'>
        <Search className='text-gray-500 w-5 h-5 mr-2'/>
        <input type="text" placeholder='Search for groceries...' className='w-full outline-none text-gray-700 placeholder-gray-400' />
        </form>

        <div className="flex items-center gap-3 md:gap-6 relative">
            <Link href={""} className='relative bg-white rounded-full w-11 h-11 flex items-center
            justify-center shadow-md hover:scale-150 transition'>
            <ShoppingCartIcon className='w-5 h-5'/>
            <span className='absolute -top-1 -right-1 bg-red-500 text-white text
             w-5 h-5 flex items-center justify-center rounded-full font-semibold shadow'>0</span>
            </Link>

            <div className="bg-white rounded-full w-11 h-11 flex items-center justify-center overflow-hidden shadow-md
            hover:scal-105 transition-transform relative">
                {/* image of google  */}
                {user.image?<Image src={user.image} alt='image' fill className='object-cover rounded-full'/>:<User/>}
            </div>
        </div>

    </div>
  )
}

export default Nav

