import React, { useEffect, useState } from "react";
import PageWithPanel from "./PageWithPanel";
import { useSidepanelStore } from "../stores/sidepanel.store";
import { NavLink } from "react-router";
import { fetchSkills } from "../api/skills.api.js";

const jobTitles = [
  { title: "Frontend Developer", img: "/images/a.jpeg " },
  { title: "Backend Developer", img: "/images/b.jpeg" },
  { title: "Fullstack Developer", img: "/images/c.jpeg" },
  { title: "React Native Developer", img: "/images/d.jpeg" },
  { title: "3D / Creative Developer", img: "/images/e.jpeg" },
];

const getSkillImage = (skill) => skill?.thumbnailUrl  ?? skill?.img ;

const About = () => {
  const { open } = useSidepanelStore();
  const [skills, setSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    open();
  }, [open]);

  useEffect(() => {
    const controller = new AbortController();

    const loadSkills = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchSkills({ signal: controller.signal });

        if (Array.isArray(data) && data.length > 0) {
          setSkills(data);
        } else {
          setSkills([]);
        }
      } catch (err) {
        if (err.name !== "CanceledError") {
          setError("Failed to load skills.");
          setSkills([]);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadSkills();

    return () => controller.abort();
  }, []);

  return (
    <PageWithPanel>

      <div className="overflow-auto p-2 bg-[#060218]">
        <NavLink className={'text-white underline font-bold border-blue-700 flex justify-end'} to={'/'}>
          <p>Close</p>
        </NavLink>
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
          {isLoading && <p className="text-white/70 text-center mb-4">Loading skills...</p>}
          {!isLoading && error && (
            <p className="text-red-400 text-center mb-4">{error}</p>
          )}
          {!isLoading && !error && skills.length === 0 && (
            <p className="text-white/60 text-center mb-4">No skills available right now.</p>
          )}
          <div className="flex flex-wrap justify-center gap-3 px-4">
            {skills.map((skill, index) => (
              <div
                key={skill?._id ?? skill?.id ?? `${skill?.name ?? "skill"}-${index}`}
                className="flex flex-col  w-fit! h-fit! items-center"
              >
                <div className="w-24! h-24! rounded-full bg-[#fff] flex items-center justify-center shadow-md mb-3">
                  <img
                    src={getSkillImage(skill)}
                    alt={skill?.name ?? "Skill"}
                    className="w-12! h-12! object-contain"
                  />
                </div>
                <p className="text-gray-300 font-medium">{skill?.name ?? "Skill"}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageWithPanel>
  );
};

export default About;
