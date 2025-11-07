import React, { useEffect } from 'react'
import SidePanel from "../features/sidepanel/sidepanel";


const PageWithPanel = ({ isDark, children }) => {

    return (


        <SidePanel >
            {children}
        </SidePanel>



    )
}

export default PageWithPanel