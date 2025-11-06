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
        <div className=" absolute w-[150px]! h-[150px]! bg-[#fff2]  rounded-md z-50 px- top-5 left-5  grid ">
        <button onClick={toggleButton} className=' w-fit! h-fit! '>
            click to toggle
        </button>
      
        </div>
    )
}

export default RoomToggleButton