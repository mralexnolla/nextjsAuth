"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";



const VerifyForgotPassword = () => {
  const [token, setToken] = useState("");
  const [error, setError] = useState(false);
  const [mail, setMail] = useState("")
  
  const [user, setUser] = useState({
    email: "",
    newpword: "",
    confirmpword: "",
  });


  

  const verifyUserPassword = async () => {
    try {
      const response = await axios.post("/api/users/verifyforgotpassword", {
        token,
      });
      console.log(response.data)
      const data = response.data
      if (data.success) {
        setMail(data.data);
      }
      
    } catch (error: any) {
      setError(true);
      console.log(error);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserPassword();
    }
  }, [token]);

  useEffect(() => {
      setUser((prev) => ({
        ...prev,
        email: mail
      }))
  },[mail])

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClick = async () => {
     try {
      const response = await axios.post("/api/users/resetpassword", user);
      const data = response.data
      console.log(data)
      if (data.success){
          window.location.href = '/login'
      } 
     } catch (error: any) {
      console.log(error)
     }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Reset password</h1>
      <h2 className="p-2 bg-orange-500 text-black">
        {token ? `${token}` : "no token"}
      </h2>
      {token && (
        <div>
          <h2 className="text-2xl">Password Verified</h2>
          <div>
            <label htmlFor="password">Email</label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input
              className="p-3 border border-gray-300 mb-4 rounded-lg"
              id="email"
              type="email"
              name="mail"
              value={mail}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password">New password</label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input
              className="p-3 border border-gray-300 mb-4 rounded-lg"
              id="password"
              type="password"
              placeholder="password"
              name="newpword"
              value={user.newpword}
              onChange={handleChange}
            />
          </div>
          <label htmlFor="password">confirm password</label> &nbsp;&nbsp;&nbsp;
          <input
            className="p-3 border border-gray-300 mb-4 mr-4 rounded-lg"
            id="password"
            type="password"
            placeholder="password"
            name="confirmpword"
            value={user.confirmpword}
            onChange={handleChange}
          />
          <div>
            <button onClick={handleClick}>Reset Password</button>
          </div>
          <div>
            <Link href="/login">back to login</Link>
          </div>
        </div>
      )}
      {error && (
        <div>
          <h2 className="text-2xl bg-red-500 text-black">{error}</h2>
        </div>
      )}
    </div>
  );
};

export default VerifyForgotPassword;
