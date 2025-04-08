"use client"

import Card from "../../../handlers/cards.handle"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import Invitation from "./invitation"
import Loading from "../../../components/loading"

export default function getCard(){

    const id = useParams().id
    const [ invitation , setInvitation ] = useState()
 
    useEffect(()=>{
        const getInvitation = async ()=>{
            if( id ){
                const card = await Card.ById( id )
                if( !card ){
                  alert( "no se obtuvo" )
                }
                else{
                 setInvitation( card.message )
                }
              }
              else{
                alert("no hay id")
              }
        }
        getInvitation()
    },[])

    return(
        <div style={{ width: "100%" }}>
         { invitation ? <Invitation invitation={ invitation }  id={ id } /> : <Loading/> }
        </div>
    )
}