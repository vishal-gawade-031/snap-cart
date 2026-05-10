import React from 'react'
import HeroSection from './HeroSection'
import CategorySlider from './CategorySlider'
import GroceryItemCard from './GroceryItemCard'
import connectDb from '@/lib/db'
import Grocery from '@/models/grocery.model'
async function UserDashboard() {

  connectDb()
  const groceries=await Grocery.find({})
  const plainGrocery = JSON.parse(JSON.stringify(groceries))
  // console.log("groceries",groceries);
  // console.log("plaingrocery",plainGrocery);
  return (
    
     <>
        <HeroSection/>
        <CategorySlider/>
        <div className="w-[90%] md:w-[80%] mx-auto mt-10">
          <h2 className='text-2xl md:text-3xl font-bold text-green-700 mb-6 text-center'>Popular Grocery Items</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap">
        
        {plainGrocery.map((item: any,index:number) => (
          <GroceryItemCard key={index} item={item} />
        ))}
        </div>
        </div>
     </>
    
  )
}

export default UserDashboard

