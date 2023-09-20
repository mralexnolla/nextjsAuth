"use client"
import {useState} from 'react'
import axios from "axios"
import { useRouter } from "next/navigation";
//import { toast } from "react-hot-toast";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from 'next/link';

const UserProfile = () => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const [data, setData] = useState("nothing")
  
  const onLogout = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get('/api/users/logout')
        //console.log(response.data)
        toast.success("logout successfull");
        router.push('/login')
      } catch (error: any) {
        console.error("failed to logout", error.message)
        toast.error(error.message);
      }finally{
        setIsLoading(false)
      }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get('/api/users/me')
      console.log(res.data.data)
      setData(res.data.data._id)
      
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
  
 

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1>Profile</h1>
        <hr />
        <p className='text-4xl'>Profile page {}</p>
         <h2 className="p-1 rounded bg-green-500">{data === "nothing" ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
        <hr />
        <button 
            className='bg-blue-500 hover:bg-blue-700 mt-4 text-white font-bold py-2 px-4 rounded'
            onClick={onLogout}>{isLoading ? "..." : "logout"}
        </button>
        <button 
            className='bg-green-500 hover:bg-blue-800 mt-4 text-white font-bold py-2 px-4 rounded'
            onClick={getUserDetails}>{isLoading ? "..." : "Get User Details"}
        </button>

      
    </div>
  )
}

export default UserProfile;
