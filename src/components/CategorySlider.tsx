'use client'
import {
  Apple,
  Milk,
  Wheat,
  Cookie,
  Flame,
  Coffee,
  Heart,
  Home,
  Box,
  Baby,
  Snowflake,
  Sandwich,
  Fish,
  Leaf,
  Sunrise,
  
  Nut,
  Sparkles,
  PenTool,
  Utensils,
  Activity,
  Brush,
  Flower,
  Timer,
  PartyPopper,
  ChevronLeft
} from "lucide-react";
import { motion } from 'motion/react'
import React from 'react'

const CategorySlider = () => {

    const categories = [
        { id: 1, name: "Fruits & vegetables", icon: Apple, color: "bg-green-100" },
        { id: 2, name: "Dairy & Eggs", icon: Milk, color: "bg-yellow-100" },
        { id: 3, name: "Rice, Atta & Grains", icon:Wheat, color: "bg-orange-100" },
        { id: 4, name: "Snacks & Biscuits", icon: Cookie, color: "bg-pink-100" },
        { id: 5, name: "Spices & Masalas", icon: Flame, color: "bg-red-100" },
        { id: 6, name: "Beverages & Drinks", icon: Coffee, color: "bg-blue-100" },
        { id: 7, name: "Personal Care", icon: Heart, color: "bg-purple-100" },
        { id: 8, name: "Household Essentials", icon: Home, color: "bg-lime-100" },
        { id: 9, name: "Instant & Packaged Food", icon: Box, color: "bg-teal-100" },
        { id: 10, name: "Baby & Pet Care", icon: Baby, color: "bg-rose-100" },
        { id: 11, name: "Frozen Foods", icon: Snowflake, color: "bg-cyan-100" },
{ id: 12, name: "Bakery & Breads", icon: Sandwich, color: "bg-amber-100" },
{ id: 13, name: "Meat & Seafood", icon: Fish, color: "bg-sky-100" },
{ id: 14, name: "Organic & Healthy", icon: Leaf, color: "bg-emerald-100" },
{ id: 15, name: "Breakfast & Cereals", icon: Sunrise, color: "bg-yellow-200" },

{ id: 17, name: "Dry Fruits & Nuts", icon: Nut, color: "bg-orange-200" },
{ id: 18, name: "Cleaning Supplies", icon: Sparkles, color: "bg-blue-200" },
{ id: 19, name: "Stationery", icon: PenTool, color: "bg-indigo-100" },
{ id: 20, name: "Kitchen & Dining", icon: Utensils, color: "bg-gray-200" },
{ id: 21, name: "Health & Wellness", icon: Activity, color: "bg-green-200" },
{ id: 22, name: "Beauty & Cosmetics", icon: Brush, color: "bg-pink-200" },
{ id: 23, name: "Pooja Items", icon: Flower, color: "bg-yellow-100" },
{ id: 24, name: "Ready to Eat", icon: Timer, color: "bg-orange-100" },
{ id: 25, name: "Party Supplies", icon: PartyPopper, color: "bg-purple-200" }
    ]
    return (
         
        <motion.div
        className='w-[90%] md:w-[80%] mx-auto mt-10 relative'
        initial={{opacity:0,y:50}}
        whileInView={{opacity:1,y:0}}
        transition={{duration:0.6}}
        viewport={{once:false,amount:0.5}}
        >
            <h2 className='text-2xl md:text-3xl text-green-700 mb-6 text-center'>shop by category</h2>
            <button className='absolute left-0 top-1/2 -translate-1/2 z-10 bg-white shadow-lg 
            hover:bg-green-100 rounded-full w-10 h-10 flex items-center justify-center transition-all'><ChevronLeft/></button>
                <div className="flex gap-6 overflow-auto px-10 pb-4 scrollbar-hide scroll-smooth">

                    {categories.map((cat)=>{
                        const Icon=cat.icon
                        return <motion.div
                        key={cat.id}
                        className={`min-w-[150px md:min-w-[180px]] flex flex-col items-center justify-center rounded-2xl ${cat.color} 
                        shadow-md hover:shadow-xl transition-all cursor-pointer`}
                        > 
                        <div className="flex flex-col items-center justify-center p-5">
                            <Icon className='w-10 h-10 text-green-700 mb-3'/>
                            <p className='text-center text-sm md:text-base font-semibold text-gray-700'>{cat.name}</p>
                        </div>
                        </motion.div>
                    })}
                </div>
            <button></button>
        </motion.div>
    )
}

export default CategorySlider
