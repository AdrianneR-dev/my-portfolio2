import React from 'react';
import useTheme from '../components/useTheme';
import profileImg from '../assets/profile.jpg';
import digitalStorefrontThumb from '../assets/digital-storefront-thumbnail.gif';

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

      <section className="w-full max-w-4xl mx-auto py-20 px-6 flex flex-col md:flex-row items-center gap-10 text-left">
        <img
          src={profileImg}
          alt="Portrait of Adrianne Rhodes"
          className="w-48 h-48 md:w-56 md:h-56 rounded-full object-cover shadow-lg flex-shrink=0"
        />
        <div>
          <h2 className="text-3xl font-bold mb-4">About Me</h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            I'm Adrianne, a Full Stack Developer who loves turning ideas into
            clean, functional web applications. When I'm not coding, you'll
            find me exploring new frameworks, contributing to side projects,
            or refining my craft one commit at a time.
          </p>
        </div>
      </section>

      <section className="w-full max-w-4xl mx-auto mt-12 py-20 px-6 flex flex-col md:flex-row-reverse items-center gap-10 text-left">
        <a
          href="https://adrianner-dev.github.io/TheDigitalStoreFrontCapstone/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink=0 block rounded-xl overflow-hidden shadow-lg w-full md:w-80 hover:shadow-xl transition-shadow"
        >
          <img
            src="./assets/digital-storefront-thumbnail.gif"
            alt="Digital Store-front Capstone homepage preview"
            className="w-full h-auto"
          />
        </a>
        <div>
          <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
          <h3 className="text-xl font-semibold mb-2">Digital Store-front Capstone</h3>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            For this capstone project, I created a digital storefront for my
            e-commerce beauty brand, Salvg (pronounced Salvage) Beauty.
          </p>
        </div>
      </section>
    </section>
  );
}