import React from 'react'
import { useRoomStore } from '../../stores/toggleRoomStore'
import { useSidepanelStore } from '../../stores/sidepanel.store'

const RoomToggleButton = () => {
 const isDarkRoom = useRoomStore(state => state.isDarkRoom)
 const setDarkRoom = useRoomStore(state => state.setDarkRoom)
   const isTransitioning = useRoomStore(state => state.isTransitioning)
   const setTransitioning = useRoomStore(state => state.setTransitioning) 
   const close  = useSidepanelStore(state  => state.close)
 
 const toggleButton = () => {
    if(isTransitioning) return;
        setTransitioning(true);
        close();
        setDarkRoom(!isDarkRoom);
    }


    return (
        <button onClick={toggleButton} className='absolute w-fit! h-fit! z-50 bg-white top-5 left-5'>
            click to toggle
        </button>
    )
}

export default RoomToggleButton