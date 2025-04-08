import Image from "next/image"
import { useEffect } from "react"

const MusicComp = ( { guest , setMusicRec } )=>{
    useEffect(()=>{
      setMusicRec( ( prev )=> prev + 1 )
    },[])
    return(
        <div className="music">
         <Image alt="arrow_icon" loading="lazy" width={10} height={10} src="/arrow_2.png" />{ guest.music }
        </div>
    )
}
export default MusicComp