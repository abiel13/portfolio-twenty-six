import React, { useEffect } from "react";
import PageWithPanel from "./PageWithPanel";
import { useSidepanelStore } from "../stores/sidepanel.store";
import { useNavigate } from "react-router";


const jobTitles = [
  { title: "Frontend Developer", img: "https://via.placeholder.com/150" },
  { title: "Backend Developer", img: "https://via.placeholder.com/150" },
  { title: "Fullstack Developer", img: "https://via.placeholder.com/150" },
  { title: "React Native Developer", img: "https://via.placeholder.com/150" },
  { title: "3D / Creative Developer", img: "https://via.placeholder.com/150" },
];

const skills = [
  { name: "React", img: "https://via.placeholder.com/80" },
  { name: "Node.js", img: "https://via.placeholder.com/80" },
  { name: "TypeScript", img: "https://via.placeholder.com/80" },
  { name: "Three.js", img: "https://via.placeholder.com/80" },
  { name: "Next.js", img: "https://via.placeholder.com/80" },
  { name: "Node.js", img: "https://via.placeholder.com/80" },
  { name: "TypeScript", img: "https://via.placeholder.com/80" },
  { name: "Three.js", img: "https://via.placeholder.com/80" },
  { name: "Next.js", img: "https://via.placeholder.com/80" },
  { name: "Node.js", img: "https://via.placeholder.com/80" },
  { name: "TypeScript", img: "https://via.placeholder.com/80" },
  { name: "Three.js", img: "https://via.placeholder.com/80" },
  { name: "Next.js", img: "https://via.placeholder.com/80" },
];



const About = () => {
  const { open } = useSidepanelStore();
  const navigate = useNavigate();

  useEffect(() => {
    open();
  }, [

  ])

  const onclick = () => {
    navigate('/')
  }

  return (
    <PageWithPanel>
   
      <div className="overflow-auto bg-[#060218]">
        <section className="flex flex-col h-fit! items-center justify-center py-12 text-center">
          <h1 className="text-4xl h-fit! font-bold mb-2 text-white">About Me</h1>
          <p className="max-w-2xl text-white  leading-relaxed">
            Hi, I’m <span className="font-semibold text-indigo-400">Abiel Asimiea</span> —
            a passionate developer who enjoys bringing ideas to life through clean,
            scalable, and visually engaging interfaces. My work bridges creativity
            and technology across web, mobile, and 3D experiences.
          </p>
        </section>

        {/* Job Titles Section */}
        <section className="py-12 h-fit!">
          <h2 className="text-3xl font-semibold mb-6 text-center text-white">What I Do</h2>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 px-4">
            {jobTitles.map((job, index) => (
              <div
                key={index}
                className="bg-[#111] rounded-2xl shadow-lg overflow-hidden hover:scale-105 transform transition-all"
              >
                <img src={job.img} alt={job.title} className="w-full h-[150px]! object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-200 text-center">{job.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-12 h-fit!">
          <h2 className="text-3xl font-semibold mb-8 text-center text-white">Skills</h2>
          <div className="flex flex-wrap justify-center gap-3 px-4">
            {skills.map((skill, index) => (
              <div key={index} className="flex flex-col  w-fit! h-fit! items-center">
                <div className="w-24! h-24! rounded-full bg-[#1a1a1a] flex items-center justify-center shadow-md mb-3">
                  <img
                    src={skill.img}
                    alt={skill.name}
                    className="w-12! h-12! object-contain"
                  />
                </div>
                <p className="text-gray-300 font-medium">{skill.name}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageWithPanel>
  );
};

export default About;
