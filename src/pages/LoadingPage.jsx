import { useProgress } from "@react-three/drei";
import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { useLoadingStore } from "../stores/loading.store";

const LoadingPage = () => {
    const { progress } = useProgress();
    const { setIsReady } = useLoadingStore();
    const [visible, setVisible] = useState(true);

    const loaderRef = useRef();
    const barRef = useRef();
    const textRef = useRef();
    const welcomeRef = useRef();

    // Entry animation
    useEffect(() => {
        if (!loaderRef.current || !textRef.current) return;

        gsap.fromTo(
            loaderRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 1.2, ease: "power2.out" }
        );

        gsap.fromTo(
            textRef.current,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, delay: 0.4, ease: "back.out(1.7)" }
        );
    }, []);

    // Progress & Exit animation
    useEffect(() => {
        if (!barRef.current || !loaderRef.current || !textRef.current || !welcomeRef.current) return;

        gsap.to(barRef.current, {
            width: `${progress}%`,
            duration: 0.4,
            ease: "power2.out",
        });

        if (progress === 100) {
            const tl = gsap.timeline({
                delay: 0.4,
                onComplete: () => {
                    gsap.to(loaderRef.current, {
                        opacity: 0,
                        duration: 1.2,
                        ease: "power2.inOut",
                        onComplete: () => {
                            setVisible(false);
                            setIsReady(true);
                        },
                    });
                },
            });

            tl.to(textRef.current, { opacity: 0, duration: 0.5 })
                .to(
                    welcomeRef.current,
                    {
                        opacity: 1,
                        scale: 1,
                        duration: 1.2,
                        ease: "back.out(1.7)",
                        onStart: () => {
                            gsap.to(welcomeRef.current, {
                                textShadow:
                                    "0 0 10px #8b5cf6, 0 0 20px #a855f7, 0 0 40px #06b6d4",
                                duration: 1,
                                yoyo: true,
                                repeat: 2,
                                ease: "sine.inOut",
                            });
                        },
                    },
                    "+=0.5"
                )
                .to(welcomeRef.current, {
                    opacity: 0,
                    duration: 1,
                    delay: 0.8,
                    ease: "power2.inOut",
                });
        }
    }, [progress]);

    if (!visible) return null;

    return (
        <div
            ref={loaderRef}
            className="fixed top-0 left-0 w-screen h-screen bg-[#060218] flex flex-col justify-center items-center z-1000000000000 overflow-hidden"
        >
            {/* Progress bar */}
            <div className="w-[300px] h-[8px] bg-white/10 rounded-full overflow-hidden">
                <div
                    ref={barRef}
                    className="h-full bg-linear-to-r from-fuchsia-500 via-purple-500 to-cyan-500 rounded-full"
                    style={{ width: "0%" }}
                />
            </div>

            {/* Percentage text */}
            <p
                ref={textRef}
                className="text-white text-lg mt-5 font-semibold tracking-[0.25em]"
            >
                {Math.floor(progress)}%
            </p>

            {/* Welcome message */}
            <p
                ref={welcomeRef}
                className="text-transparent bg-clip-text bg-linear-to-r from-fuchsia-500 via-purple-500 to-cyan-500 my-3 text-lg  text-center md:text-3xl font-extrabold opacity-0 mt-6 tracking-widest"
            >
                Welcome to my workspace
            </p>

            {/* Subtext */}
            <p className="text-sm text-white/60 mt-2 font-light tracking-[0.3em] uppercase">
                Loading your experience...
            </p>
        </div>
    );
};

export default LoadingPage;
