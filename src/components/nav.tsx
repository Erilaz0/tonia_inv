import Image from "next/image"
import  redirect  from "../functions/redirect"

const Nav = ( id )=>{
    return(
        <header>
         <Image loading="lazy" src="/back_icon.png" width={40} height={40} alt="back_icon"  onClick={ ()=>{ redirect( `/user/${id.id}` ) } }/>
         <Image priority className="logo" src="/tilogo_white.png" width={80} height={80} alt="Logo" />
        </header>
    )
}

export default Nav