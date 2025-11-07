import React from 'react'
import { NavLink, useLocation } from 'react-router'
import { useRoomStore } from '../../stores/toggleRoomStore'
import { useSidepanelStore } from '../../stores/sidepanel.store'
import { useLoadingStore } from '../../stores/loading.store'
import { FaHome, FaUserAlt, FaFolderOpen, FaMoon, FaSun } from 'react-icons/fa'

const RoomToggleButton = () => {
  const isDarkRoom = useRoomStore(state => state.isDarkRoom)
  const setDarkRoom = useRoomStore(state => state.setDarkRoom)
  const isTransitioning = useRoomStore(state => state.isTransitioning)
  const setTransitioning = useRoomStore(state => state.setTransitioning)
  const close = useSidepanelStore(state => state.close)
  const { isReady } = useLoadingStore()
  const location = useLocation()

  const toggleButton = () => {
    if (isTransitioning) return
    setTransitioning(true)
    close()
    setDarkRoom(!isDarkRoom)
  }

  if (!isReady) return null

  const isActive = (path) => location.pathname === path

  return (
    <div className="absolute top-5 left-5 z-50 grid grid-cols-2 gap-3 bg-[#fff2] backdrop-blur-md rounded-xl p-4 w-[180px] h-[180px] place-items-center shadow-lg">
      {/* Dark/Light toggle */}
      <button
        onClick={toggleButton}
        className={`text-xl p-3 rounded-md transition-all duration-200 shadow-md ${
          isDarkRoom
            ? 'bg-yellow-400 text-black hover:bg-yellow-300'
            : 'bg-gray-800 text-white hover:bg-gray-700'
        }`}
        aria-label="Toggle dark and light mode"
      >
        {isDarkRoom ? <FaSun /> : <FaMoon />}
      </button>

      {/* About Page */}
      <NavLink
        to="/about"
        className={`text-xl p-3 rounded-md transition-all duration-200 shadow-md ${
          isActive('/about')
            ? 'bg-gradient-to-r from-green-500 to-teal-400 text-black'
            : 'bg-white/10 text-white hover:bg-white/20'
        }`}
        aria-label="About Page"
      >
        <FaUserAlt />
      </NavLink>

      {/* Projects Page */}
      <NavLink
        to="/projects"
        className={`text-xl p-3 rounded-md transition-all duration-200 shadow-md ${
          isActive('/projects')
            ? 'bg-gradient-to-r from-green-500 to-teal-400 text-black'
            : 'bg-white/10 text-white hover:bg-white/20'
        }`}
        aria-label="Projects Page"
      >
        <FaFolderOpen />
      </NavLink>

      {/* Home Page */}
      <NavLink
        to="/"
        className={`text-xl p-3 rounded-md transition-all duration-200 shadow-md ${
          isActive('/')
            ? 'bg-gradient-to-r from-green-500 to-teal-400 text-black'
            : 'bg-white/10 text-white hover:bg-white/20'
        }`}
        aria-label="Home Page"
      >
        <FaHome />
      </NavLink>
    </div>
  )
}

export default RoomToggleButton