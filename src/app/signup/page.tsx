/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import {toast} from "react-hot-toast"

const signUp = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });


  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const onSignup = async () => {
    try {
      setLoading(true)
      const response = await axios.post('/api/users/signup', user)
      console.log("signup success", response.data)
      router.push('/login')
      
    } catch (error: any) {
      toast.error("Signup failed", error.message)
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
       setButtonDisabled(false)
    }else{
      setButtonDisabled(true)
    }
  },[user])

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUser((user) => ({
      ...user,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col items-center bg-black text-white  text-lg justify-center min-h-screen py-2">
      <h1 className="">{loading ? "Processing" : "Signup"}</h1>
      <hr />
      <label htmlFor="username">username</label>
      <input
        className="p-2 border text-black border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        id="username"
        type="text"
        placeholder="username"
        name="username"
        value={user.username}
        onChange={handleChange}
      />
      <label htmlFor="email">email</label>
      <input
        className="p-3 border text-black border-gray-300 mb-4 rounded-lg"
        id="email"
        type="email"
        placeholder="email"
        name="email"
        value={user.email}
        onChange={handleChange}
      />
      <label htmlFor="password">password</label>
      <input
        className="p-3 border text-black border-gray-300 mb-4 rounded-lg"
        id="password"
        type="password"
        placeholder="password"
        name="password"
        value={user.password}
        onChange={handleChange}
      />
      <button
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        disabled={buttonDisabled}
        onClick={onSignup}
      >
        {buttonDisabled ? "No Signup" : "Signup"}
      </button>
      <Link href="/login">Visit Login page</Link>
    </div>
  );
};

export default signUp;
