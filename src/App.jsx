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
      <Route path="/" element={<Home />}/>
      <Route path="/experience" element={<Experience />}/>
      <Route path="/projects" element={<Projects />}/>
      <Route path="/contact" element={<Contact />}/>
    </Routes>
      <Footer/>
    </BrowserRouter>
  )
} 

export default App
