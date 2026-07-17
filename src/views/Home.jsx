import React from 'react';
import useTheme from '../components/useTheme';

export default function Home() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <section className="flex flex-col items-center justify-center text-center py-20 animate-fade-in">
      <h1 className="text-5xl font-extrabold tracking-tight mb-4">
        Hi, I'm <span className="text-blue-600 dark:text-blue-400">Adrianne Rhodes</span>
      </h1>
      <p className="text-xl max-w-2xl mb-8 text-zinc-600 dark:text-zinc-400">
        A passionate Full Stack Developer dedicated to building high-performance web applications.
      </p>
      
      <div className="flex flex-wrap gap-4 justify-center mb-12">
        {['React', 'Node.js', 'TailwindCSS', 'JavaScript', 'Git'].map((tech) => (
          <span key={tech} className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-full font-mono text-sm">
            {tech}
          </span>
        ))}
      </div>

      <button 
        onClick={toggleTheme}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Toggle {isDark ? 'Light' : 'Dark'} Mode
      </button>
    </section>
  );
}