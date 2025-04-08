import { useState } from "react"
import filterGuests from "../../../../functions/search"

export default function SearchComp( { setGuests , guests } ){
    const [ guest , setGuest ] = useState("")

    const findGuests = ()=>{{
        const find = filterGuests( guests , guest )
        if( !find ){
            setGuests( guests )
        }
        else{
            setGuests( find )
        }
    }}

    const changueGuest = ( event )=>{
        setGuest( event.target.value.toString())
    }


    return(
        <div className="search_container">
         <p>¿Buscas A Alguien En Especifico?</p>
         <input onChange={ changueGuest } placeholder="Buscar Invitado"></input>
         <img onClick={ ()=>{ findGuests() } } src="/searchuser.png"></img>
       </div>
    )
} 