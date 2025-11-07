import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import PageWithPanel from './PageWithPanel'
import { useSidepanelStore } from "../stores/sidepanel.store";
import { NavLink } from "react-router";
// Default project data — change these later
const DEFAULT_PROJECTS = [
    {
        id: "p1",
        title: "Banking App",
        image: "https://images.unsplash.com/photo-1542223616-8f3b1b8a6f2b?q=80&w=1400&auto=format&fit=crop",
        short: "A modern banking app with payments and subscriptions.",
        details:
            "Built with Next.js, Appwrite and Dwolla. Features: auth, payments, subscription flow, responsive UI.",
        tags: ["Next.js", "Appwrite", "Payments"],
        url: "#",
    },
    {
        id: "p2",
        title: "Anime Vault",
        image: "https://images.unsplash.com/photo-1505682634904-d7c1de7b1b34?q=80&w=1400&auto=format&fit=crop",
        short: "Video library with infinite scrolling and search.",
        details: "Fetched from Pexels API. Horizontal sliders and categorized templates.",
        tags: ["React", "API", "UX"],
        url: "#",
    },
    {
        id: "p3",
        title: "ChatApp Clone",
        image: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1400&auto=format&fit=crop",
        short: "Real-time chat with rooms and media support.",
        details: "Socket-based realtime messaging, media uploads, and typing indicators.",
        tags: ["Socket.io", "Node.js"],
        url: "#",
    },
    {
        id: "p4",
        title: "Video Editor",
        image: "https://images.unsplash.com/photo-1526378726133-90b6c7a9c7c1?q=80&w=1400&auto=format&fit=crop",
        short: "In-browser video editing timeline and overlays.",
        details: "Undo/redo, scrubber rows, transform tracking using Immer & RxJS.",
        tags: ["JS", "RxJS", "Immer"],
        url: "#",
    },
    {
        id: "p5",
        title: "To‑Do Alarm App",
        image: "https://images.unsplash.com/photo-1496317899792-9d7dbcd928a1?q=80&w=1400&auto=format&fit=crop",
        short: "Flutter todo app with looping alarms until acknowledged.",
        details: "No external packages — alarm system, notifications, and recurring tasks.",
        tags: ["Flutter", "Mobile"],
        url: "#",
    },
    {
        id: "p6",
        title: "Assessment Platform",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1400&auto=format&fit=crop",
        short: "Students answer questions per class & department for evaluation.",
        details: "Role-based flows, reporting, and CSV export for teachers.",
        tags: ["React", "Node"],
        url: "#",
    },
];

function ProjectCard({ project, onLearnMore }) {
    const cardRef = useRef(null);

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
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
            </div>

            <div className="p-4">
                <h3 className="text-lg font-semibold truncate">{project.title}</h3>
                <p className="mt-2 text-sm text-white/70 line-clamp-2">{project.short}</p>

                <div className="mt-3 flex items-center justify-between gap-2">
                    <div className="flex gap-2 flex-wrap">
                        {project.tags.slice(0, 3).map((t) => (
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
                        aria-label={`Learn more about ${project.title}`}
                    >
                        Learn more
                    </button>
                </div>
            </div>
        </article>
    );
}



export default function ProjectsPage({ projects = DEFAULT_PROJECTS }) {
    const [query, setQuery] = useState("");
    const [selected, setSelected] = useState(null);
    const modalRef = useRef(null);
    const { close, open } = useSidepanelStore();

    const onclick = () => {
        navigate('/')

    }

    useEffect(() => {
        open();
    }, [])

    useEffect(() => {
        if (selected && modalRef.current) {
            gsap.fromTo(
                modalRef.current,
                { opacity: 0, y: 30, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power2.out" }
            );
        }
    }, [selected]);

    const filtered = projects.filter((p) =>
        `${p.title} ${p.short} ${p.tags.join(" ")}`.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <PageWithPanel>


            <div className="min-h-screen p-2 md:p-4 bg-[#060218] text-white overflow-y-auto">
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
                        {filtered.map((p) => (
                            <ProjectCard key={p.id} project={p} onLearnMore={setSelected} />
                        ))}
                    </section>

                    {filtered.length === 0 && (
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
                                    src={selected.image}
                                    alt={`Screenshot for ${selected.title}`}
                                    className="w-full h-56 object-cover"
                                />

                                <button
                                    onClick={() => setSelected(null)}
                                    className="absolute right-3 top-3 bg-white/6 rounded-full p-2"
                                    aria-label="Close project details"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="p-6">
                                <h2 className="text-2xl font-bold">{selected.title}</h2>
                                <p className="mt-3 text-white/80">{selected.details}</p>

                                <div className="mt-4 flex gap-2 flex-wrap">
                                    {selected.tags.map((t) => (
                                        <span key={t} className="text-xs px-2 py-1 rounded-full bg-white/5">
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                <div className="mt-6 flex items-center gap-3">
                                    <a
                                        href={selected.url}
                                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-green-500 to-teal-400 text-black font-semibold"
                                    >
                                        View project
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
