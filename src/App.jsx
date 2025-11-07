import { useEffect } from "react";
import Experience from "./Experience/Experience";
import RoomToggleButton from "./features/navbuttons/RoomToggleButton";
import { useMediaQuery } from "./stores/useMediaQuery";
import { Outlet } from "react-router";
import { useLoadingStore } from "./stores/loading.store";
import LoadingPage from "./pages/LoadingPage";

export default function App() {
  const { updateDimensions } = useMediaQuery();


  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, [updateDimensions]);






  return (
    <>
      <LoadingPage />
      <div className="relative w-full h-screen overflow-hidden">
        {/* 3D Canvas */}
        <RoomToggleButton /> <Experience />
        <Outlet />
      </div>

    </>

  );
}
