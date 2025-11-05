import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { useSidepanelStore } from "../../stores/sidepanel.store";

const SidePanel = () => {
  const panelRef = useRef(null);
  const { visible } = useSidepanelStore();
console.log(visible);
  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    const isMobile = window.innerWidth < 768;

    gsap.from(el, {
        opacity:0
    })


    if (visible) {
      gsap.to(el, {
        x: 0,
        y: 0,
        opacity:1,
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
        pointer-events-auto
        bg-white text-gray-900 shadow-lg overflow-y-auto
        md:w-[30vw]! md:h-screen
        w-full h-[50%]
      "
    >
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-3">Panel Content</h2>
        <p className="text-gray-600">
          Panel slides from right on desktop, bottom on mobile.
        </p>
        
      </div>
    </div>
  );
};


export default SidePanel