import { useEffect } from "react";
import Experience from "./Experience/Experience";
import RoomToggleButton from "./features/navbuttons/RoomToggleButton";
import SidePanel from "./features/sidepanel/sidepanel";
import { useMediaQuery } from "./stores/useMediaQuery";

export default function App() {

  const { updateDimensions } = useMediaQuery();

  useEffect(() => {

    window.addEventListener('resize', updateDimensions)
    return () => {
      window.addEventListener('resize', updateDimensions)
    }
  }, [])

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* 3D Canvas */}
      <Experience />

      {/* Only the panel occupies its actual width/height */}
      <div className="absolute z-150 top-0 right-0 bottom-0 pointer-events-none flex justify-end items-end">
        <SidePanel />
      </div>

      <RoomToggleButton />
    </div>
  );
}