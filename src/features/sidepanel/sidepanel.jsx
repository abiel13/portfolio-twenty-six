import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { useSidepanelStore } from "../../stores/sidepanel.store";
import { useLocation, useNavigate } from "react-router";

const SidePanel = ({ children }) => {
  const panelRef = useRef(null);
  const { visible, close } = useSidepanelStore();
  const navigate = useNavigate()
  console.log(visible);
  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    const isMobile = window.innerWidth < 768;

    gsap.from(el, {
      opacity: 0
    })


    if (visible) {
      gsap.to(el, {
        x: 0,
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
      });
    } else {
      gsap.to(el, {
        x: isMobile ? 0 : "100%",
        y: isMobile ? "100%" : 0,
        duration: 0.5,
        ease: "power3.inOut",
        // opacity:0
      });
    }
  }, [visible]);

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    const isMobile = window.innerWidth < 768;
    gsap.set(el, {
      x: isMobile ? 0 : "100%",
      y: isMobile ? "100%" : 0,
    });
  }, []);


  return (
    <div
      ref={panelRef}
      className="
      absolute z-150 top-0 right-0 bottom-0  flex flex-col justify-end items-end  bg-transparent text-gray-900 shadow-lg  md:w-[30vw]! md:h-screen! w-full h-screen!
      "
    >
     
      {children}
    </div>
  );
};


export default SidePanel