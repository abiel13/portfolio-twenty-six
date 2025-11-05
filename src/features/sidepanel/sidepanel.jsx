import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useSidepanelStore } from "../../stores/sidepanel.store";

const AnimatedPanel = () => {
  const panelRef = useRef();
  const isVisible = useSidepanelStore((state) => state.visible);
  const setVisible = useSidepanelStore((state) => state.setVisible)

  useEffect(() => {
    if (isVisible) {
      // Animate in
      gsap.to(panelRef.current, {
        y: 0,
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
        pointerEvents: "auto",
      });
    } else {
      // Animate out (different behavior for desktop and mobile)
      const isMobile = window.innerWidth < 768;
      gsap.to(panelRef.current, {
        y: isMobile ? "100%" : 0,
        x: isMobile ? 0 : "100%",
        opacity: 0,
        duration: 0.4,
        ease: "power2.inOut",
        pointerEvents: "none",
      });
    }
  }, [isVisible]);

  return (
    <div
      ref={panelRef}
      className={`
        fixed z-50 bg-white dark:bg-neutral-900 shadow-2xl 
        w-full md:w-80 h-[60vh] md:h-full 
        bottom-0 md:top-0 md:right-0 
        rounded-t-2xl md:rounded-none 
        opacity-0 translate-y-full md:translate-y-0 md:translate-x-full 
        p-5 flex flex-col transition-all
      `}
    >
      {/* Close Button */}
      <button
        onClick={() => setVisible()}
        className="self-end mb-4 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
      >
        ✕
      </button>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">

      </div>
    </div>
  );
};

export default AnimatedPanel;
