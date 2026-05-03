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
  console.log("groceries",groceries);
  console.log("plaingrocery",plainGrocery);
  return (
    <div>
     <>
        <HeroSection/>
        <CategorySlider/>
        {plainGrocery.map((item:any)=>{
          <GroceryItemCard key={item._id} item={item}/>
        })}
        
     </>
    </div>
  )
}

export default UserDashboard

