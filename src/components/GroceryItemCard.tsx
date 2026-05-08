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
            viewport={{ once: false, amount: 0.5 }}>


      </motion.div>
  )
}

export default GroceryItemCard
