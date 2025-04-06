import { useState } from 'react';
import React from "react";
import './home.css'

export default function Profile() {

  // TODO: get actual account information
  // TODO: consistent style

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
 
  return (
    <>

      {/* Navbar: */}
      <div>
        <img className="mx-auto block h-24 rounded-full sm:mx-0 sm:shrink-0" src="frontend/src/assets/profile-user.png" alt="" />
        <h1>My Profile:</h1>
      </div>

      <div className="h-px bg-violet-500 w-full my-4"></div>

      {/* Personal Info: */}
      <div>
        <h1>Username: {username}</h1>
        <h2>Password: {password}</h2>
      </div>

    </>
  );
}