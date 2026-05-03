import mongoose from 'mongoose';
import React from 'react'

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
  return (
    <div>
      {item.name}
    </div>
  )
}

export default GroceryItemCard
