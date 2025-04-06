import { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';

//pages for navigation
import Welcome_screen from './pages/welcome_screen'
import Registration from './pages/registration'
import Login from './pages/login'
import Home from './pages/home'
import Profile from './pages/profile'
import Enter_stats from './pages/enter_stats';

function verify_log_in() {
  if (localStorage.getItem('local_user_name') == null || localStorage.getItem("local_password" == null)) {
    return (false); 
  }
  return (true);
}

function App() {

  //you need to register or log in a username and password to access other pages now
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome_screen />} />
        <Route path="/registration" element={<Registration/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/home" element={verify_log_in() ? <Home/> : <Welcome_screen/>} />
        <Route path="/profile" element={verify_log_in() ? <Profile /> : <Welcome_screen/>} />
        <Route path="/enter_stats" element={verify_log_in() ? <Enter_stats/> : <Welcome_screen/>}/>
        <Route path="*" element={<Welcome_screen/>} />
      </Routes>
    </Router>
  )
}

export default App
