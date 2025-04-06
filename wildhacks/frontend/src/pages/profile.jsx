import { useState } from 'react';
import React from "react";
import './profile.css'

export default function Profile() {

  // TODO: get actual account information
  // TODO: consistent style

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [stats, setStats] = useState({
    strength: 0,
    stamina: 0,
    agility: 0,
  });
 
  return (
    <div className="flex w-380 h-300 flex-col items-center justify-center p-2 bg-zinc-800">

      {/* Navbar: */}
      <div className="profile-header"></div>

      <img
        className="profile-picture"
        src="frontend/src/assets/profile-user.png" // Replace with actual profile picture URL
        alt="Profile"
      />
      <h1 className="profile-title">My Profile</h1>

      <div className="profile-divider"></div>

      {/* Personal Info: */}
      
      <div className="text-white font-bold text-2xl tracking-tight mb-2">
        <h2>Username: {username}</h2>
        <h2>Password: {password}</h2>
      </div>

      <div className="profile-divider"></div>

      {/* User Stats */}
      <div className="profile-stats">
        <h2>Stats</h2>
        <div className="stats-grid">
          <div className="stat-item">
            <p>Strength</p>
            <h3>{stats.strength}</h3>
          </div>
          <div className="stat-item">
            <p>Stamina</p>
            <h3>{stats.stamina}</h3>
          </div>
          <div className="stat-item">
            <p>Agility</p>
            <h3>{stats.agility}</h3>
          </div>
        </div>
      </div>  
    </div>
  );
}