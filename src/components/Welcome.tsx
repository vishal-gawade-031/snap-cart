'use client'
import React from 'react'

import { motion } from "framer-motion"
import { ArrowRight, Bike, ShoppingBasket } from 'lucide-react'
type propType={
  nextStep:(s:number)=> void
}
function Welcome({nextStep}:propType) {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen text-center p-6'>
      <motion.div
        initial={{
          opacity: 0,
          y: -20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          duration: 1
        }}
        className='flex items-center gap-3'
      >
        <ShoppingBasket className='text-green-600 w-10 h-10'/>
        <h1 className='text-4xl font-extrabold md:text-5xl text-green-700'>
          snapcart
        </h1>
        
      </motion.div>

      <motion.p
         initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          duration: 1,
          delay:0.5
        }}
        className='mt-4 text-gray-700 text-lg md:text-xl max-w-lg'
      >
       One step ahead for all your grocery needs
Shop fresh and smart with Snapcart. From daily essentials to your favorite snacks, everything is just a click away. 

      </motion.p>

        <motion.div 
           initial={{
          opacity: 0,
          scale:0.8
        }}
        animate={{
          opacity: 1,
          scale:1
        }}
        transition={{
          duration: 1,
          delay:0.4
        }}
          className='flex justify-center gap-10 mt-10'
        >
          <ShoppingBasket className='w-24 h-24 md:w-32 text-green-600 drop-shadow-md'/>
          <Bike className='w-24 h-24 md:w-32 text-orange-600 drop-shadow-md'/>
        </motion.div>

        <motion.button
           initial={{
          opacity: 0,
            y:20
        }}
        animate={{
          opacity: 1,
          y:0
        }}
        transition={{
          duration:0.6,
          delay:0.8
        }}
        className='inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 
                    px-8 rounded-2xl shadow-md transition-all duration-200 mt-14'
        onClick={()=>
          nextStep(2)//changing the number with the function so we can redirect to register (nextStep is the prop)
        }>Next 
        <ArrowRight />

        </motion.button>
    </div>
  )
}

export default Welcome