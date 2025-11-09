import { useContext } from "react"
import { contextID } from "../layouts/Layout"

const Player = () => {

  const { trackID } = useContext(contextID)

  return (
    <div className="h-23 bg-neutral-950 w-full absolute bottom-0 overflow-x-hidden scrollbar-hidden px-100">
      <iframe
        className="w-full overflow-auto scrollbar-hidden bg-neutral-900" 
        data-testid="embed-iframe" 
        src={`https://open.spotify.com/embed/track/${trackID}`} 
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" >
          
        </iframe>

    </div>
  )
}

export default Player