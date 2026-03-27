'use client'
import React from 'react'

import { motion } from "framer-motion"
import { ShoppingBasket } from 'lucide-react'
function Welcome() {
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
        <ShoppingBasket className='text-green-600' w-10 h-10/>
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

    </div>
  )
}

export default Welcome