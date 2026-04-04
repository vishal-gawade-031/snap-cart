"use client"
import React, { useState } from 'react'
import {motion} from "motion/react"
import { ArrowRightFromLine, Bike, BikeIcon, Target, User, UserCog } from 'lucide-react'
export default function EditRoleMobile() {

  const [roles,setRoles]=useState([
      {id:"admin",lable:"Admin",icon:UserCog},
      {id:"user",lable:"User",icon:User},
      {id:"deliveryBoy",lable:"diliveryBoy",icon:Bike}
  ])
  const [selectedRole,setSelectedRole]=useState("");
  const [mobile,setMobile]=useState("");
  return (
    <div className='flex flex-col items-center min-h-screen p-6 w-full from-green-100'>
      
     <motion.h1 
     initial={{
      opacity:0,
      y:-20
     }}
     animate={{
      opacity:1,
      y:0
     }}
       transition={{
      duration:0.7
     }}
     className='text-3xl md:text-4xl font-extrabold text-green-700
     text-center mt-8'
     >Select your role</motion.h1>
     <div className="flex flex-col md:flex-row justify-center items-center gap-6 mt-10">
      {roles.map((role)=>{
        const Icon=role.icon
        const isSelected=selectedRole==role.id 
        return(
          <motion.div
          key={role.id}
          whileTap={{scale:0.94}}
          onClick={()=>setSelectedRole(role.id)}
          className={`flex flex-col items-center justify-center w-48 h-44 rounded-2xl border-2 
            transition-all ${
              isSelected
              ? "border-green-600 bg-green-100 shadow-lg"
              : "border-gray-300 bg-white hover:border-green-400"
            }`}
          >
              <Icon/>
              <span>{role.lable}</span>
          </motion.div>
        )
      })}
     </div>
     <motion.div
       initial={{
      opacity:0,
     
     }}
     animate={{
      opacity:1,
      
     }}
       transition={{
        delay:0.5,
      duration:0.7
     }}
     className='flex flex-col items-center mt-10'
     >
      <label htmlFor="mobile" className='text-gray-700 font-medium mb-2'>
        Enter your Mobile No.
      </label>
      <input type='tel' id='mobile' 
      className='w-64 md:w-80 px-4 py-3 rounded-xl border border-gray-300
      focus:ring-2 focus:ring-green-500 focus-outline-none text-gray-700' placeholder='eg. 8987000000'
      onChange={(e)=>setMobile(e.target.value)}
      />
     </motion.div>
     <motion.button
       initial={{
      opacity:0,
      y:20
     }}
     animate={{
      opacity:1,
      y:0
     }}
       transition={{
      delay:0.7
     }}
     disabled={mobile.length == 10 || !selectedRole }
     className={`inline-flex items-center gap-2 font-semibold py-3 px-7 rounded-2xl shadow-md
     transition-all duration-200 w-25 mt-20 ${
      selectedRole && mobile.length == 10
      ?"bg-green-600 hover:bg-green-700 text-white"
      :"bg-gray-300 text-gray-500 cursor-note-allowed"
     } `}>
      Go to Home 
      <ArrowRightFromLine/>
     </motion.button>
    </div>
  )
}
   