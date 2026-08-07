import React from 'react';
import { NavLink } from 'react-router-dom';
import useTheme from './useTheme';

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();

  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive 
        ? 'bg-blue-600 text-white' 
        : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'
    }`;

  return (
    <nav className="border-b border-zinc-200 dark:border-zinc-800 sticky top-0 bg-white/80 dark:bg-zinc-900/80 backdrop-blur z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          <div className="flex justify-center items-center gap-4 mx-auto">
           <NavLink to="/" className={linkClass}>Home</NavLink>
            <NavLink to="/projects" className={linkClass}>Projects</NavLink>
            <NavLink to="/experience" className={linkClass}>Experience</NavLink>
            <NavLink to="/contact" className={linkClass}>Contact</NavLink>
            
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:opacity-80 transition"
              aria-label="Toggle Theme"
            >
              {isDark ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}