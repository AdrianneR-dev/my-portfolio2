import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './views/Home.jsx'
import Projects from './views/Projects.jsx'
import Experience from './views/Experience.jsx'
import Contact from './views/Contact.jsx'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/Home" element={<Home />}/>
      <Route path="/Experience" element={<Experience />}/>
      <Route path="/Projects" element={<Projects />}/>
      <Route path="/Contact" element={<Contact />}/>
    </Routes>
      <Footer/>
    </BrowserRouter>
  )
} 

export default App
