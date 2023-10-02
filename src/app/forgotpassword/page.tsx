"use client"

import axios from "axios"
import { useState } from "react"
import { toast } from "react-hot-toast";

const ForgotPassword = () => {
    const [user, setUser] = useState({email:""})
    const [mesg, setMesg] = useState("")

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setUser((prev) => ({
            ...prev,
            [name]: value
        }))
    } 

    const onReset = async () => {
        try {
          const response = await axios.post("/api/users/forgotpassword", {
            email: user.email,
          });
          const data = response.data;
          
          if (data.success) {
            setMesg(data.message);
          }
        } catch (error: any) {
           console.log("Failed to reset password", error.message);
           toast.error("Failed password reset", error.message); 
        }
    }

    
    

    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <label htmlFor="email">Enter your email</label>
        <input
          className="p-3 border border-gray-300 mb-2 rounded-lg"
          id="email"
          type="email"
          placeholder="email"
          name="email"
          value={user.email}
          onChange={handleChange}
        />
        {!mesg ? (
          <button
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            onClick={onReset}
          >
            verify email
          </button>
        ) : (
          mesg
        )}
      </div>
    );
}

export default ForgotPassword;