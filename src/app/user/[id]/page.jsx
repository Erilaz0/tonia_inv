"use client"

import { useParams } from "next/navigation"
import Card from "../../../handlers/cards.handle"
import { useEffect, useState } from "react"
import Link from "next/link"
import "../../../styles/main.scss"

export default function UserApp(){
    const { id } = useParams()
    const [ name , setName ] = useState("")

    const callUser = async()=>{
     const call = await Card.ById( id )
     if( !call ){
      setName("")
     }
     else{
      setName( call.message.user )
     }
    }

    useEffect(()=>{
      callUser()
    },[])
    
    return(
        <div className="initial" style={{ display : "flex", flexDirection : "column" , gap:"10px", alignItems: "center" }}>
         <p style={{ textAlign: "start", padding: "14px 20px", paddingRight:"0px", paddingLeft: "10px", fontSize: "18px", background: "linear-gradient(to right,rgb(231, 194, 152), #b2ebf2)", color: "#004d40", border: "none", marginBottom: "12px", width: "85%", borderRadius: "12px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", transition: "all 0.2s ease-in-out" }}>¡Hola { name }!, tu evento te espera, ¿que quieres revisar hoy?</p>
         <Link href={ `/user/${id}/invitados` } style={{ textAlign: "start", padding: "14px 20px", paddingLeft: "10px", fontSize: "18px", background: "linear-gradient(to right, #e0f7fa, #b2ebf2)", color: "#004d40", border: "none", marginBottom: "12px", width: "80%", borderRadius: "12px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", cursor: "pointer", transition: "all 0.2s ease-in-out" }}>Invitados</Link>
         <Link href={ `/user/${id}/musica` } style={{ textAlign: "start", padding: "14px 20px", paddingLeft: "10px", fontSize: "18px", background: "linear-gradient(to right, #e0f7fa, #b2ebf2)", color: "#004d40", border: "none", marginBottom: "12px", width: "80%", borderRadius: "12px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", cursor: "pointer", transition: "all 0.2s ease-in-out" }}>Música</Link>
         <Link href={ `/user/${id}/menu` } style={{ textAlign: "start", padding: "14px 20px", paddingLeft: "10px", fontSize: "18px", background: "linear-gradient(to right, #e0f7fa, #b2ebf2)", color: "#004d40", border: "none", marginBottom: "12px", width: "80%", borderRadius: "12px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", cursor: "pointer", transition: "all 0.2s ease-in-out" }}>Menú</Link>
         <Link href={ `/user/${id}/mesas` } style={{ textAlign: "start", padding: "14px 20px", paddingLeft: "10px", fontSize: "18px", background: "linear-gradient(to right, #e0f7fa, #b2ebf2)", color: "#004d40", border: "none", marginBottom: "12px", width: "80%", borderRadius: "12px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", cursor: "pointer", transition: "all 0.2s ease-in-out" }}>Mesas</Link>
         <Link href={ `/user/${id}/mensajes` } style={{ textAlign: "start", padding: "14px 20px", paddingLeft: "10px", fontSize: "18px", background: "linear-gradient(to right, #e0f7fa, #b2ebf2)", color: "#004d40", border: "none", marginBottom: "12px", width: "80%", borderRadius: "12px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", cursor: "pointer", transition: "all 0.2s ease-in-out" }}>Mensajes</Link>
        </div>
    )
}