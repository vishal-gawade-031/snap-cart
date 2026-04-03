'use client'
import { ArrowLeft, EyeIcon, EyeOff, Leaf, Loader2, Lock, LogIn, Mail, User, Vault } from 'lucide-react'
import { motion } from 'motion/react'
import Image from 'next/image'
import googleImage from '@/assets/google-logo-icon-gsuite-hd-701751694791470gzbayltphh.png'
import React, { FormEvent, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'


const Login = () => {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [showPassword,setshowPassword]=useState(false);
    const [loading,setLoding]=useState(false);
    const router=useRouter();
    const session=useSession();
    console.log(session);
    const handleLogin=async (e:FormEvent)=>{
        e.preventDefault();
        setLoding(true)
        try{
              await signIn("credentials",{
                email,password
              })
              router.push("/");
              setLoding(false);
        }
        catch(error){
            console.log(error);
            setLoding(false);
        }
    }
 
  return (
        <div className='flex flex-col items-center justify-center min-h-screen px-6
        py-10 bg-white relative'>
      

            <motion.h1 className='text-4xl font-extrabold text-green-700 mb-2'
            initial={{
                y:-10,
                opacity:0
            }}
            animate={{
                y:0,
                opacity:1
            }}
            transition={{
                duration:0.7
            }}
            >
                Wellcome
            </motion.h1>
            <p className='text-gray-600 mb-8 flex items-center'>Login to snapcart 
                <Leaf className='w-5 h-5 text-green-700'/></p>

            <motion.form 
            onSubmit={handleLogin}
       
               initial={{
                opacity:0
            }}
            animate={{
                opacity:1
            }}
            transition={{
                duration:0.7
            }}
            className='flex flex-col gap-5 w-full max-w-sm'>

             
                
                <div className='relative'>
                    <Mail className='absolute left-3 top-3.5 w-5 h-5 text-gray-400'/>
                        <input type="text" placeholder='Your Email' className='w-full border border-gray-300 rounded-xl
                        py-3 pl-10 pr-4 text-gray-800 focus:ring-2 focus:ring-green-500 focus:outline-none'
                        onChange={(e)=>{
                            setEmail(e.target.value)
                      }}
                      value={email}/>
                      
                      
                </div>

                
                <div className='relative'>
                    <Lock className='absolute left-3 top-3.5 w-5 h-5 text-gray-400'/>
                        <input type={showPassword?"text":"password"} placeholder='Your password' className='w-full border border-gray-300 rounded-xl
                        py-3 pl-10 pr-4 text-gray-800 focus:ring-2 focus:ring-green-500 focus:outline-none'
                        onChange={(e)=>{
                            setPassword(e.target.value)
                      }}
                      value={password}
                      />
                      {
                        showPassword?<EyeOff className='absolute right-3 top-3 w-5 h-5 text-gray-500 cursor-pointer' 
                        onClick={()=>setshowPassword(false)}/>:<EyeIcon className='absolute right-3 top-3 w-5 h-5 text-gray-500 cursor-pointer' onClick={()=>setshowPassword(true)}/>
                      }
                      
                </div>

              {/* when we write the code in back tick then we can applay javascript register button*/}
                      {
                      (()=>{
                        const formValidation = email !== "" && password !==""
                        return <button disabled={!formValidation || loading} className={`w-full font-semibold py-3 rounded-xl transition-all duration-200 
                            shadow-md inline-flex items-center justify-center gap-2 ${
                            formValidation
                            ?"bg-green-600 hover:bg-green-700 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}>
                      {loading?<Loader2 className='w-5 h-5 animate-spin'/>:"Login"}      
                        
                        </button>

                      })()}

                      <div className='flex items-center gap-2 text-gray-400 text-sm mt-2'>
                        <span className='flex-1 h-px bg-gray-400'></span> OR <span className='flex-1 h-px bg-gray-400'></span>
                        </div>

                        <div className='w-full flex items-center justify-center gap-3 border border-gray-300
                        hover:bg-gray-50 py-3 rounded-b-xl text-gray-700 font-medium transition-all duration-200'
                        onClick={()=>signIn("google",{callbackUrl:"/"})}>
                            <Image src={googleImage} width={20} height={20} alt='google image'/>
                            Continue with Google 
                        </div>

            </motion.form>
            <p className='text-gray-600 mt-6 text-sm flex items-center gap-1 cursor-pointer'
             onClick={()=>router.push("/register")}>
               want to create an account ? <LogIn className='w-4 h-4 cursor-pointer'/>
               <span className='text-green-500'>Sign up</span></p>
  
        </div>
  )
}

export default Login
