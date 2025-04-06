import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';

//pages for navigation
import Welcome_screen from './pages/welcome_screen'
import Registration from './pages/registration'
import Login from './pages/login'
import Home from './pages/home'
import Profile from './pages/profile'
import Enter_stats from './pages/enter_stats';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={Welcome_screen()} />
        <Route path="/registration" element={Registration()} />
        <Route path="/login" element={Login()} />
        <Route path="/home" element={Home()} />
        <Route path="/profile" element={Profile()} />
        <Route path="/enter_stats" element={Enter_stats()}/>
        <Route path="*" element={Welcome_screen()} />
      </Routes>
    </Router>
  )
}

export default App
