// we can't write the session in layout because of use clint so bind this in layout
//just we are accesing the children from layout 
// sessionprovide is inbuilt 
'use client'
import { SessionProvider } from 'next-auth/react'
import React from 'react'

 function Provider({children}:{children:React.ReactNode}) {
  return (
    <div>
    
      <SessionProvider>
        {children}
      </SessionProvider>
    </div>
  )
}
export default Provider