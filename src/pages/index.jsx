import React, { useEffect } from 'react'
import PageWithPanel from "./PageWithPanel";
import { useSidepanelStore } from '../stores/sidepanel.store';



const IndexPage = () => {


  const { close } = useSidepanelStore()

  useEffect(() => {
    close()
  }, [])

  return (
    <PageWithPanel>

    </PageWithPanel>
  )
}

export default IndexPage