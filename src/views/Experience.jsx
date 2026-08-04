import React, { useState } from 'react';

export default function Experience() {
  const [activeTab, setActiveTab] = useState('all');

  const timelineData = [
    {
      id: 1,
     role: "Full Stack Developer",
      company: "Pixel Craft Studio",
      period: "2022 - 2024",
      type: "work",
      description: "Designed, tested, and shipped fluid client portals using Node.js, Express, and fully controlled React forms.",
    },
    {
      id: 2,
     role: "Information Systems Technology Associate's Degree",
      company: "Hinds Community College",
      period: "2017 - 2019",
      type: "education",
      description: "Focused on computer hardware and software.",
    }
  ];

  const skills = [
    { name: "Languages", items: ["JavaScript (ES6+)", "HTML5/CSS3"] },
    { name: "Frameworks & Libs", items: ["React", "Tailwind CSS"] },
    { name: "Tools & Clouds", items: ["Git"] }
  ];

  const filteredTimeline = activeTab === 'all' 
    ? timelineData 
    : timelineData.filter(item => item.type === activeTab);

  return (
    <div className="space-y-12">
      {/* Header Section */}
      <div>
        <h2 className="text-3xl font-bold mb-2">Growth & Competencies</h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          A dynamic record of my professional timeline and technical stack.
        </p>
      </div>

      {/* Grid Layout: Core Competencies (Auto-responsive down to 320px) */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold">Technical Skills</h3>
        <div 
          className="grid gap-6" 
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}
        >
          {skills.map((category) => (
            <div 
              key={category.name} 
              className="p-5 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50/50 dark:bg-zinc-800/30"
            >
              <h4 className="font-bold text-blue-600 dark:text-blue-400 mb-3">{category.name}</h4>
              <div className="flex flex-wrap gap-2">
                {category.items.map(item => (
                  <span 
                    key={item} 
                    className="px-2 py-1 text-xs font-mono bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-zinc-200 dark:border-zinc-800" />

      {/* Interactive Timeline Section */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h3 className="text-xl font-semibold">Interactive Timeline</h3>
          
          {/* Tab Filters */}
          <div className="flex bg-zinc-100 dark:bg-zinc-800 p-1 rounded-lg text-sm self-stretch sm:self-auto">
            {['all', 'work', 'education'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 sm:flex-none px-4 py-1.5 rounded-md capitalize transition-all ${
                  activeTab === tab 
                    ? 'bg-white dark:bg-zinc-750 shadow-sm font-semibold' 
                    : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-105'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Layout */}
        <div className="relative border-l-2 border-zinc-200 dark:border-zinc-800 ml-4 pl-6 space-y-8">
          {filteredTimeline.map((item) => (
            <div key={item.id} className="relative group">
              {/* Bullet indicator */}
              <div className="absolute -left-7.75 top-1.5 w-4 h-4 rounded-full border-2 border-blue-500 bg-white dark:bg-zinc-900 group-hover:scale-125 transition-transform duration-200" />
              
              <span className="text-xs font-mono text-blue-600 dark:text-blue-400 font-bold tracking-wider uppercase">
                {item.period}
              </span>
              <h4 className="text-lg font-bold mt-1">{item.role}</h4>
              <h5 className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-2">
                {item.company}
              </h5>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-xl leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}