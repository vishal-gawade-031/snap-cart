'use client'
import { ArrowLeft, LucideAirVent, Plus, PlusCircle } from 'lucide-react'
import Link from 'next/link'
import {motion} from "motion/react"
import React, { ChangeEvent, useState } from 'react'
import { url } from 'inspector'
import Image from 'next/image'

const categories=[
           "Fruits & Vegetables",
            "Dairy & Eggs",
            "Rice, Atta & Grains",
            "Snacks & Biscuits",
            "Spices & Masalas",
            "Beverages & Drinks",
            "Personal Care",
            "household Essentials",
            "Instant & Packaged Food",
            "Baby & Pet Care"
]
const units=["kg","g","liter","ml","piece","pack"];
const AddGrocery = () => {
    const [name,setName]=useState("");
    const [category,setCategory]=useState("");
    const [unit,setUnit]=useState("");
     const [price,setPrice]=useState("");
    const [preview,setPreview]=useState<string | null>();
    const [backendImage,setBackendImage]=useState<Blob | null>()

 const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const files = e.target.files
  if (!files || files.length === 0) return

  const file = files[0]
  setBackendImage(file)
  setPreview(URL.createObjectURL(file))
}
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
                    transition={{duration:0.2}}
                    className='bg-white w-full max-w-2xl shadow-2xl rounded-3xl border border-green-100 p-8'>
                <div className="flex flex-col items-center mb-8">
                    <div className="flex items-center gap-3">
                        <PlusCircle className='text-green-600 w-8 h-8'/>
                        <h1>Add your Grocery</h1>
                         </div>
                        <p className='text-gray-500 text-sm mt-2 text-center'> Fill out the details below to add a new grocery item.</p>   
                </div>

                <form className='flex flex-col gap-3 w-full animate-pulse'>
                    <div >
                    <label htmlFor='name' className='block text-gray-700 font-medium mb-1'>Grocery Name
                        <span className='text-red-500'>*</span>
                    </label>
                    <input type="text" id='name' placeholder='eg: sweets,Milk ...' className='w-full border border-gray-300 
                    rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-400 transition-all'
                    onChange={(e)=>setName(e.target.value)}
                    value={name} />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="">
                                <label className='block text-gray-700 font-medium mb-1'>Category 
                                    <span className='text-red-500'>*</span></label>
                                    <select name="category" className='w-full border border-gray-300 rounded-x1 px-4
                                    py-3 outline-none focus:rin-2 focus:ring-green-400 transition-all bg-white'
                                    onChange={(e)=>setCategory(e.target.value)}>
                                        <option value="">Select Category</option>
                                        {categories.map(cat=>(
                                            <option value={cat}>{cat}</option>
                                        ))}
                                                    
                                    </select>
                            </div>
                                <div className="">
                                                     <label className='block text-gray-700 font-medium mb-1'>Units
                                    <span className='text-red-500'>*</span></label>
                                    <select name="Units" className='w-full border border-gray-300 rounded-x1 px-4
                                    py-3 outline-none focus:rin-2 focus:ring-green-400 transition-all bg-white'
                                    onChange={(e)=>{setUnit(e.target.value)}}
                                    value={unit}>
                                        <option value="">Select units</option>
                                        {units.map(cat=>(
                                            <option value={cat}>{cat}</option>
                                        ))}

                                    </select>
                                </div>
                        </div>
                          <div >
                    <label htmlFor='name' className='block text-gray-700 font-medium mb-1'>Price
                        <span className='text-red-500'>*</span>
                    </label>
                    <input type="text" id='name' placeholder='eg: 120' className='w-full border border-gray-300 
                    rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-400 transition-all'
                    onChange={(e)=>setPrice(e.target.value)}
                    value={price} 
                    />
                        </div>

                                     <div >
                    <label htmlFor='image' className='block text-gray-700 font-medium mb-1'>upload image
                        <span className='text-red-500'>*</span>
                    </label>
                    <input type="file" id='name' placeholder='product Img' className='w-full border border-gray-300 
                    rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-400 transition-all'
                    onChange={handleImageChange}
                     
                    />
                    {preview && <Image src={preview}  width={100} height={100} alt='image' 
                    className='rounded-xl shadow-md border border-gray-200 object-cover'/>}
                        </div>
                </form>
            </motion.div>
    </div>
  )
}

export default AddGrocery
