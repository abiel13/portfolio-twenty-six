import { create  } from "zustand";


export const useRoomStore = create((set) => ({
    isDarkRoom :true,
    isTransitioning:false,

    setDarkRoom : (value)=> set(() => ({isDarkRoom:value}) ),

    setTransitioning: (value ) => set(() => ({isTransitioning: value}) )
}))