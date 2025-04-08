"use client"

import { useEffect, useState } from "react"
import Users from "../../../../handlers/cards.handle"
import { useParams } from "next/navigation"
import MenuComp from "./menuComp"
import Nav from "../../../../components/nav"
import Loading from "../../../../components/loading"


export default function Menu(){
    const { id } = useParams()
    const [ menuData , setMenuData ] = useState()
    
    useEffect(()=>{
       const getGuests = async ()=>{
        const guests = await Users.getGuests( id )
        if( !guests.message || guests.ERROR ){
            window.location.href = "/"
        }
        else{
            const diets = {
                vegan : 0,
                vegetarian : 0,
                celiac : 0,
                diabetic : 0,
                other : [],
            }
            guests.message.guests.forEach( item =>{ 
                switch( item.diet ){
                    case( "Vegano" ):
                      diets.vegan += 1 
                      break;
                    case( "Vegetariano" ):
                      diets.vegetarian += 1 
                      break;
                    case( "Celíaco" ):
                      diets.celiac += 1   
                      break;
                    case( "Diabético" ):
                      diets.diabetic += 1 
                      break;
                    default:
                      diets.other.push( item.diet )
                      break;
                }
             }
            )
            setMenuData( diets )
        }
       }
       getGuests()
    },[  ])


    useEffect(() => {
      // Cambiar el título manualmente
      document.title = "Menu";
      
      // Cambiar la meta descripción
      const meta = document.querySelector("meta[name='description']");
      if (meta) {
        meta.setAttribute("content", "Revisión del menú de los invitados");
      } else {
        const newMeta = document.createElement("meta");
        newMeta.name = "description";
        newMeta.content = "Manejar las mesas de los invitados";
        document.head.appendChild(newMeta);
      }
    }, []);
    
    return(
        <div className="menu_comp">
          <Nav id={ id }/>
          {
           menuData ?  <MenuComp id={ id } menu={ menuData }/> : <p style={ { marginTop: "50px" ,width:"100%", textAlign: "center" } }>Aún no hay invitados</p>  
          }
        </div>
    )
}