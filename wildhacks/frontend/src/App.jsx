import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';

//pages for navigation
import Welcome_screen from './pages/welcome_screen'
import Registration from './pages/registration'
import Login from './pages/login'
import Home from './pages/home'
import Profile from './pages/profile'


function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/" element={Welcome_screen()} />
        <Route path="/registration" element={Registration()} />
        <Route path="/login" element={Login()} />
        <Route path="/home" element={Home()} />
        <Route path="/profile" element={Profile()} />
        
      </Routes>
    </Router>
  )
}

export default App
