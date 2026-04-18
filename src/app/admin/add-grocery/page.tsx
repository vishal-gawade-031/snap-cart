import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import {motion} from "motion/react"
import React from 'react'

const AddGrocery = () => {
  return (
    <div className='min-h-screen flex items-center justify-center
    bg-linear-to-br from-green-50 to-white py-16 px-4 relative'>
            <Link href={"/"} className='absolute top-6 left-6 flex items-center gap-2
            text-green-700 font-semibold bg-white px-4 py-2 rounded-full shadow-md 
            hover:bg-green-100 hover:shadow-lg transition-all'>
                <ArrowLeft className='w-5 h-5'/>
                    <span className='hidden md:flex'>Back</span>
            </Link>

            <motion.div
                    initial={{y:20,opacity:20}}
                    animate={{y:0,opacity:1}}
                    transition={{duration:0.4}}
                    className='bg-white w-full max-w-2xl shadow-2xl rounded-3xl border border-green-100 p-8'


            >
                <div className="flex flex-col items-center mb-8">
                    <div className="">
                        <h1>Add your Grocery</h1>
                        <p> Fill out the details below to add a new grocery item.</p>
                    </div>
                </div>
            </motion.div>
    </div>
  )
}

export default AddGrocery
