import { create } from 'zustand';


export const useMediaQuery = create((set) => ({
    isMobile: window.innerWidth < 768,
    width: window.innerWidth,
    height: window.innerHeight,

    updateDimensions: (value) => set(() => ({
        isMobile: window.innerWidth < 768,
        width: window.innerWidth,
        height: window.innerHeight
    }))
}))