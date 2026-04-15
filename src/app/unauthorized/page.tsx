import React from 'react'

export default function unauthorized() {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-500'>
      <h1 className='text-3xl font-bold text-red-600'>Access Denied</h1>
      <p>you can not access this page</p>
    </div>
  )
}
