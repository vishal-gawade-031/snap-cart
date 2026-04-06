'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import mongoose from 'mongoose'
import Image from "next/image"
import { LogOut, Package, Search, ShoppingCartIcon, User } from 'lucide-react'
import { AnimatePresence,motion } from 'motion/react'
import { signOut } from 'next-auth/react'
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
   const [open,setOpen]=useState(false);
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
        <div className="relative">
            <div className="bg-white rounded-full w-11 h-11 flex items-center justify-center overflow-hidden shadow-md
            hover:scal-105 transition-transform " onClick={()=>{setOpen(prev=>!prev)}}>
                {/* image of google  */}
                {user.image?<Image src={user.image} alt='image' fill className='object-cover rounded-full'/>:<User/>}
            </div>
            <AnimatePresence>
                {open &&
                 <motion.div
                 initial={{
                    opacity:0, y: -10, scale:0.95
                 }}
                 animate={{
                    opacity:1,y:0,scale:1
                 }}
                 transition={{duration:0.6}}
                 exit={{opacity:0,y:-10,scale:0.95}}
                 className='absolute right-0 mt-3 bg-white w-56 rounded-xl shadow-xl border-gray-200 p-3 z-999'
                 >
                       <div className="flex  items-center gap-3 px-3 py-2 border-b bord-g
                       ">
                        <div className="w-10 relative h-10 rounded-full bg-green-100 flex items-center justify-center overflow-hidden">
                            {user.image?<Image src={user.image} alt='image' fill className='object-cover rounded-full'/>:<User/>}
                        </div>

                        <div className='text-gray-800 font-medium'>{user.name}</div>
                        <div className='text-2xl text-gray-500 '>{user.role}</div>

                        </div>   

                        <Link href={""} className='flex items-center gap-2 px-3 hover:bg-green-50 rounded-lg text-gray-700
                        font-medium ' onClick={()=>setOpen(false)}>
                               <Package className='w-5 h-5 text-green-600'/> My Orders
                        </Link>
                        <button className='flex items-center gap-2 w-full text-left px-3 py-3 hover:bg-red-50 rounded-lg text-gray-700 font-medium'>
                            <LogOut className='w-5 h-5 text-red-600' onClick={()=>{
                                setOpen(false);
                                signOut({redirectTo:"/login"})
                            }}/>
                            {/* have to call  the sign out function witch is provided by next auth ( for log out) */}
                            Log Out
                        </button>
                    
                    </motion.div>}
            </AnimatePresence>
            </div>
        </div>

    </div>
  )
}

export default Nav

