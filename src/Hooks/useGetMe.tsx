'use client'
import { AppDispatch } from '@/redux/store'
import { setUserData } from '@/redux/userSlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
//this api is refer to get the user data in reducer 
 function useGetMe() {
       const dispatch=useDispatch<AppDispatch>();
    useEffect(()=>{
        const getMe=async ()=>{
            try{
                // taking data from api and storing in redux
                const result= await axios.get("/api/me");
                 console.log("result of api in usegetme",result.data);
                dispatch(setUserData(result.data))

            }catch(error){
                console.log(error);
            }
        }
        getMe()
    },[])
}
export default useGetMe;
