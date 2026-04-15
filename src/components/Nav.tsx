
'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Boxes, ClipboardCheck, Cross, LogOut, Package, Plus, PlusCircle, Search, SearchAlert, ShoppingCartIcon, User, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { signOut } from 'next-auth/react'
import mongoose from 'mongoose'

interface IUser {
  _id?: mongoose.Types.ObjectId
  name: string
  password?: string
  mobile?: string
  email: string
  role: 'user' | 'deliveryBoy' | 'admin'
  image?: string
}

function Nav({ user }: { user: IUser }) {
  const [open, setOpen] = useState(false)
  const profileDropDown = useRef<HTMLDivElement>(null);
  const [searchBarOpen,setSearchBarOpen]=useState(false)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        profileDropDown.current &&
        !profileDropDown.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div
      className='w-[95%] fixed top-4 left-1/2 -translate-x-1/2  linear-gradient-to-r from-green-500 to-green-700
      rounded-2xl shadow-lg shadow-black/30 flex justify-between items-center h-20 px-4
      md:px-8 z-50 bg-green-500' 
    >
      <Link
        href='/'
        className='text-white font-extrabold text-2xl sm:text-3xl tracking-wide hover:scale-105 transition-transform'
      >
        Snapcart
      </Link>


      {user.role == "user" &&      <form className='hidden md:flex items-center bg-white rounded-full px-4 py-2 w-1/2 max-w-lg shadow-md'>
        <Search className='text-gray-500 w-5 h-5 mr-2' />
        <input
          type='text'
          placeholder='Search for groceries...'
          className='w-full outline-none text-gray-700 placeholder-gray-400'
        />
      </form>}

      <div className='flex items-center gap-3 md:gap-6 relative'>
        {/* search icon when it come to phone size */}

       {user.role == "user" && <> <div className="bg-white rounded-full w-11 h-11 flex items-center justify-center shadow-md
         hover:scale-105 transition md:hidden" onClick={() => setSearchBarOpen((prev)=>!prev)}>
          <Search className='text-green-600 w-6 h-6'/>
         </div>

        <Link
          href={""}
          className='relative bg-white rounded-full w-11 h-11 flex items-center justify-center shadow-md hover:scale-105 transition'
        >
          <ShoppingCartIcon className='w-5 h-5' />
          <span
            className='absolute -top-1 -right-1 bg-red-500 text-white text-xs
            w-5 h-5 flex items-center justify-center rounded-full font-semibold shadow'
          >
            0
          </span>
        </Link></>}

        {user.role == "admin" && <>
          
          <div className="hidden md:flex items-center gap-4">
            <Link href={"#"} className='flex items-center gap-2 bg-white text-green-700 font-semibold px-4 
            py-2 rounded-full hover:bg-green-100 transition-all'><PlusCircle className='w-5 h-5'/>Add Grocery</Link>
            <Link href={"#"} className='flex items-center gap-2 bg-white text-green-700 font-semibold px-4 
            py-2 rounded-full hover:bg-green-100 transition-all'><Boxes className='w-5 h-5'/>view Grocery</Link>
            <Link href={"#"} className='flex items-center gap-2 bg-white text-green-700 font-semibold px-4 
            py-2 rounded-full hover:bg-green-100 transition-all'><ClipboardCheck className='w-5 h-5'/> manage Orders</Link>

          </div>
        
        </>}

        <div className='relative' ref={profileDropDown}>
          <div
            className='relative bg-white rounded-full w-11 h-11 flex items-center justify-center overflow-hidden shadow-md hover:scale-105 transition-transform cursor-pointer'
            onClick={() => setOpen((prev) => !prev)}
          >
            {user.image ? (
              <Image
                src={user.image}
                alt='profile image'
                fill
                className='object-cover rounded-full'
              />
            ) : (
              <User className='w-5 h-5 text-gray-700' />
            )}
          </div>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: -10,
                  scale: 0.95,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  y: -10,
                  scale: 0.95,
                }}
                transition={{ duration: 0.3 }}
                className='absolute right-0 mt-3 bg-white w-56 rounded-xl shadow-xl border border-gray-200 p-3 z-999'
              >

              {/* profile */}
                <div className='flex items-center gap-3 px-3 py-2 border-b border-gray-200 pb-3'>
                  <div className='w-10 h-10 relative rounded-full bg-green-100 flex items-center justify-center overflow-hidden'>
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt='profile image'
                        fill
                        className='object-cover rounded-full'
                      />
                    ) : (
                      <User className='w-5 h-5 text-gray-700' />
                    )}
                  </div>

                  <div>
                    <p className='text-gray-800 font-medium'>{user.name}</p>
                    <p className='text-sm text-gray-500 capitalize'>
                      {user.role}
                    </p>
                  </div>
                </div>

                    {user.role == "user" && 
                <Link
                  href='/orders'
                  className='flex items-center gap-2 px-3 py-3 hover:bg-green-50 rounded-lg text-gray-700 font-medium mt-2'
                  onClick={() => setOpen(false)}
                >
                  <Package className='w-5 h-5 text-green-600' />
                  My Orders
                </Link>
              }
                <button
                  onClick={() => {
                    setOpen(false)
                    signOut({ callbackUrl: '/login' })
                  }}
                  className='flex items-center gap-2 w-full text-left px-3 py-3 hover:bg-red-50 rounded-lg text-gray-700 font-medium'
                >
                  <LogOut className='w-5 h-5 text-red-600' />
                  Log Out
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
              {searchBarOpen && <motion.div
              initial={{
                  opacity: 0,
                  y: -10,
                  scale: 0.95,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  y: -10,
                  scale: 0.95,
                }}
                 className='fixed top-24 left-1/2 -translate-1/2 w-[90%] bg-white rounded-full shadow-lg z-40 flex
                 items-center px-4 py-2'>
                  <search className='text-gray-500 w-5 h-5 mr-2'/>

                  <form className='grow'>
                    <input type="text" className='w-full outline-none
                    text-gray-700' placeholder='search grocery'/>

                  </form>
                  <button onClick={()=>{setSearchBarOpen(false)}}>
                      <X className='text-gray-500 w-5 h-5'/>
                  </button>
                 </motion.div> 
              }
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
export default Nav
