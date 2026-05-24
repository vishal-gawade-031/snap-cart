'use client'
import axios from 'axios'
import React, { useEffect } from 'react'

 function useGetMe() {
    useEffect(()=>{
        const getMe=async ()=>{
            try{
                const result= await axios.get("/api/me");
                console.log("result of api",result.data);
            }catch(error){
                console.log(error);
            }
        }
        getMe()
    },[])
}
export default useGetMe;
