"use client"
import React from 'react'
import { Provider } from 'react-redux'
import { store } from './store'
const StoreProvider = ({children}:{children:React.ReactNode}) => {
  return (
    //children is provided to full children
    <Provider store={store}>
        {children}
    </Provider>
  )
}

export default StoreProvider
