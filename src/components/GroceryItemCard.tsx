'use client'
import mongoose from 'mongoose';
import React from 'react'
import {motion} from "motion/react"

interface IGrocery {
    id?: mongoose.Types.ObjectId;
    name: string;
    category: string;
    price: string;
    unit: string;
    image: string;
    createdAt?: Date;
    updatedAt?: Date;
}

function GroceryItemCard({item}:{item:IGrocery}) {
  console.log("item name:",item.name)
  return (
      <motion.div
       initial={{ opacity: 0, y: 50, scale:0.9}}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false, amount: 0.5 }} 
            className='bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden
             border border-gray-100 flex flex-col'
            >
                
                <div className="">
                    <Image src={item.image} fill alt={item.name}/>
                </div>
      </motion.div>
  )
}

export default GroceryItemCard
