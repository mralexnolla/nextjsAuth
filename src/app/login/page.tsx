"use client"
import Link from 'next/link';
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const LoginPage = () => {
     const [user, setUser] = useState({
       email: "",
       password: "",
     });

     const router = useRouter();

     const [buttonDisabled, setButtonDisabled] = useState(false);
     const [loading, setLoading] = useState(false);
     const [ermsg, setErmsg] = useState("")

     const onlogin = async () => {
      try {
        setLoading(true)
        const response = await axios.post('/api/users/login', user )
        console.log("Loging successfull", response.data)
        if(response.data.success){
            toast.success("Loging successfull");
            router.push("/profile");
        }else{
          setErmsg(response.data.message);
          toast.success(response.data.message);
        }
        
        
        
      } catch (error: any) {
        console.log("Failed login", error.message);
        toast.error("Failed login", error.message)
      }finally{
        setLoading(false)
      }
     };

     useEffect(() => {
      if(user.email.length > 0 && user.password.length > 0){
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
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="mb-2">{loading ? "Processing" : "Login"}</h1>
      <hr />
      <label htmlFor="email">email</label>
      <input
        className="p-3 border border-gray-300 mb-2 rounded-lg"
        id="email"
        type="email"
        placeholder="email"
        name="email"
        value={user.email}
        onChange={handleChange}
      />
      <label htmlFor="password">password</label>
      <input
        className="p-3 border border-gray-300 mb-4 rounded-lg"
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
        onClick={onlogin}
      >
        {buttonDisabled ? "no login" : "login"}
      </button>
      <h2 className="p-2 text-red-500 font-semibold">{ermsg}</h2>
      <Link href="/signup">Visit signup page</Link>
    </div>
  );
}

export default LoginPage
