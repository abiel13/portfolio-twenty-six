import React, { useState, useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import PageWithPanel from "./PageWithPanel";
import { useSidepanelStore } from "../stores/sidepanel.store";
import { NavLink } from "react-router";
import { fetchProjects } from "../api/projects.api.js";

const getProjectImage = (project) =>  project?.image  ?? project?.thumbnailUrl ;

const getProjectTags = (project) =>
  Array.isArray(project?.tags)
    ? project.tags
    : Array.isArray(project?.tools)
      ? project.tools
      : [];

function ProjectCard({ project, onLearnMore }) {
    const cardRef = useRef(null);
    const tags = getProjectTags(project);

    useEffect(() => {
        gsap.fromTo(
            cardRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
        );
    }, []);

    return (
        <article
            ref={cardRef}
            className="bg-gradient-to-b from-white/5 to-white/2 rounded-2xl shadow-lg overflow-hidden border border-white/5 hover:scale-[1.02] transition-transform duration-300"
        >
            <div className="relative h-40 sm:h-48 w-full">
                <img
                    src={getProjectImage(project)}
                    alt={`${project?.name ?? "Project"} screenshot`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
            </div>

            <div className="p-4">
                <h3 className="text-lg font-semibold truncate">{project?.name ?? project?.title ?? "Project"}</h3>
                <p className="mt-2 text-sm text-white/70 line-clamp-2">
                    {project?.description ?? "No description available."}
                </p>

                <div className="mt-3 flex items-center justify-between gap-2">
                    <div className="flex gap-2 flex-wrap">
                        {tags.slice(0, 3).map((t) => (
                            <span
                                key={t}
                                className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/3 text-white/80"
                            >
                                {t}
                            </span>
                        ))}
                    </div>

                    <button
                        onClick={() => onLearnMore(project)}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-sm shadow-sm hover:opacity-95"
                        aria-label={`Learn more about ${project?.name ?? "project"}`}
                    >
                        Learn more
                    </button>
                </div>
            </div>
        </article>
    );
}



export default function ProjectsPage({ projects: initialProjects }) {
    const stableInitialProjects = useMemo(
        () => (Array.isArray(initialProjects) ? initialProjects : []),
        [initialProjects]
    );
    const [query, setQuery] = useState("");
    const [projects, setProjects] = useState(stableInitialProjects);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selected, setSelected] = useState(null);
    const modalRef = useRef(null);
    const { open } = useSidepanelStore();
 

 

    useEffect(() => {
        open();
    }, [open])

    useEffect(() => {
        setProjects(stableInitialProjects);
    }, [stableInitialProjects]);

    useEffect(() => {
        const controller = new AbortController();
        const searchTerm = query.trim();

        const loadProjects = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const data = await fetchProjects({
                    search: searchTerm ? searchTerm : undefined,
                    signal: controller.signal,
                });

                if (Array.isArray(data)) {
                    setProjects(data);
                } else {
                    setProjects([]);
                }
            } catch (err) {
                if (err.name !== "CanceledError" && err.name !== "AbortError") {
                    setError("Failed to load projects.");
                    if (!searchTerm) {
                        setProjects(stableInitialProjects);
                    }
                }
            } finally {
                if (!controller.signal.aborted) {
                    setIsLoading(false);
                }
            }
        };

        const debounceId = setTimeout(() => {
            loadProjects();
        }, 300);

        return () => {
            clearTimeout(debounceId);
            controller.abort();
        };
    }, [stableInitialProjects, query]);

    useEffect(() => {
        if (selected && modalRef.current) {
            gsap.fromTo(
                modalRef.current,
                { opacity: 0, y: 30, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power2.out" }
            );
        }
    }, [selected]);

    const filtered = projects.filter((p) => {
        const title = p?.title ?? "";
        const name = p?.name ?? "";
        const summary = p?.short ?? p?.description ?? "";
        const tags = getProjectTags(p).join(" ");

        return `${title} ${name} ${summary} ${tags}`.toLowerCase().includes(query.toLowerCase());
    });

    return (
        <PageWithPanel>


            <div className="min-h-screen w-screen md:w-full  p-2 md:p-4 bg-[#060218] text-white overflow-y-auto">
                <NavLink className={'text-white underline font-bold border-blue-700 flex justify-end'} to={'/'}>
                <p>Close</p>
                </NavLink>
                <header className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-extrabold">Projects</h1>
                            <p className="mt-1 hidden md:block text-white/70">Selected work — click a card to learn more.</p>
                        </div>

                        <div className="w-full md:w-64">
                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search projects..."
                                className="w-full bg-white/5 placeholder:text-white/50 border border-white/6 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-400"
                            />
                        </div>
                    </div>

                    <hr className="my-6 border-white/6" />
                </header>

                <main className="max-w-6xl mx-auto">
                    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                        {isLoading && (
                            <p className="col-span-full text-center text-white/70">Loading projects...</p>
                        )}
                        {!isLoading && error && (
                            <p className="col-span-full text-center text-red-400">{error}</p>
                        )}
                        {!isLoading && !error && filtered.length === 0 && projects.length === 0 && (
                            <p className="col-span-full text-center text-white/60">
                                No projects available right now.
                            </p>
                        )}
                        {filtered.map((p) => (
                            <ProjectCard
                                key={p?._id ?? p?.id ?? p?.slug ?? p?.name ?? p?.title}
                                project={p}
                                onLearnMore={setSelected}
                            />
                        ))}
                    </section>

                    {filtered.length === 0 && projects.length > 0 && (
                        <p className="mt-8 text-center text-white/60">No projects match your search.</p>
                    )}
                </main>

                {selected && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/70 backdrop-blur-sm">
                        <div
                            ref={modalRef}
                            className="max-w-3xl w-full bg-[#0b0b1a] rounded-2xl shadow-2xl border border-white/6 overflow-hidden"
                        >
                            <div className="relative">
                                <img
                                    src={getProjectImage(selected)}
                                    alt={`Screenshot for ${selected?.name ?? "Project"}`}
                                    className="w-full h-56 object-cover"
                                />

                                <button
                                    onClick={() => setSelected(null)}
                                    className="absolute right-3 top-3 bg-white/6 rounded-full p-1"
                                    aria-label="Close project details"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="p-6">
                                <h2 className="text-2xl font-bold">{selected?.name ?? "Project"}</h2>
                                <p className="mt-3 text-white/80">
                                    {selected?.description ?? "No additional details."}
                                </p>

                                <div className="mt-4 flex gap-2 flex-wrap">
                                    {getProjectTags(selected).map((t) => (
                                        <span key={t} className="text-xs px-2 py-1 rounded-full bg-white/5">
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                <div className="mt-6 flex items-center gap-3">
                               {
                                selected?.links?.[1] && ( <a
                                        href={selected?.links?.[1] ?? ""}
                                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-green-500 to-teal-400 text-black font-semibold"
                                    >
                                        View project
                                    </a>)
                               }    
                                    <a
                                        href={selected?.links?.[0] ?? "#"}
                                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-green-400 text-black font-semibold"
                                    >
                                        View Github
                                    </a>

                                    <button
                                        onClick={() => setSelected(null)}
                                        className="px-4 py-2 rounded-xl border border-white/6"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div></PageWithPanel>
    );
}
