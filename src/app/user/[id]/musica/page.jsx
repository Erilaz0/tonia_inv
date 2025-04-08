"use client"

import { useEffect, useState } from "react"
import Users from "../../../../handlers/cards.handle"
import { useParams } from "next/navigation"
import MusicComp from "./music"
import Nav from "../../../../components/nav"
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import Image from "next/image"
import Loading from "../../../../components/loading"

export default function Music(){
    const { id } = useParams()
    const [ guests , setGuests ] = useState()
    const [ musicRec , setMusicRec ] = useState( 0 ) 
    
    useEffect(()=>{
       const getGuests = async ()=>{
        const guests = await Users.getGuests( id )
        if( !guests.message || guests.ERROR ){
            window.location.href = "/"
        }
        else{
            setGuests( guests.message.guests )
        }
       }
       getGuests()
    },[])

    const loadImageAsBase64 = async (url) => {
        return new Promise((resolve, reject) => {
            const img = new window.Image();
            img.crossOrigin = "Anonymous"; // Permite cargar imágenes sin problemas de CORS
            img.src = url;
            img.onload = () => {
                const canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);
                resolve(canvas.toDataURL("image/png")); // Devuelve la imagen en Base64
            };
            img.onerror = (err) => reject(err);
        });
    };
                     const imprimir = async ()=>{
                        const doc = new jsPDF();
            
                        const array_music = []
                        guests.map( item => {
                            if( item.music !== "none" ){
                                const guestObject = {
                                    music: "- " + item.music,
                                    name: "- " + item.name,
                                  }
                                  array_music.push( guestObject )
                            }
                        }
                          )
                    
                        // Título
                        const logoBase64 = await loadImageAsBase64("/tilogo.png")

                        // Agregar la imagen (posición x=10, y=10, tamaño 50x50)
                        doc.addImage(logoBase64, "PNG", 80, 10, 50, 50);
                        doc.setFontSize(18);
                        doc.text("Lista de Musica", 20, 80);
                    
                        // Agregar los datos del array
                   autoTable(doc, { 
                        startY: 90, // 📌 Posición de inicio de la tabla
                        head: [["Musica", "Recomendada por"]], // 📌 Encabezados
                        body: array_music.map(guest => [guest.music, guest.name]), // 📌 Datos
                        styles: { fontSize: 10, cellPadding: 4 }, // 📌 Estilos
                        headStyles: { fillColor: [255, 0, 0], textColor: [255, 255, 255] }, // 📌 Encabezado rojo con texto blanco
                        alternateRowStyles: { fillColor: [240, 240, 240] } // 📌 Color alterno en filas
                    });
                    
                        // Guardar el PDF
                        doc.save("musica_tonia_inv.pdf");
                    };

                    useEffect(() => {
                        // Cambiar el título manualmente
                        document.title = "Musica";
                        
                        // Cambiar la meta descripción
                        const meta = document.querySelector("meta[name='description']");
                        if (meta) {
                          meta.setAttribute("content", "Ver musica recomendada");
                        } else {
                          const newMeta = document.createElement("meta");
                          newMeta.name = "description";
                          newMeta.content = "Manejar las mesas de los invitados";
                          document.head.appendChild(newMeta);
                        }
                      }, []);
    return(
        <div className="music_comp">
            <Nav id={ id }/>
            <div className="music_container">
             <p className="title">Recomendaciones musicales</p>
             <Image loading="lazy" alt="music_icon" width={80} height={80} src="/music.png" />
             <div className="topdf" onClick={ ()=>{ imprimir() } }>
              <Image loading="lazy" alt="pdf_icon" width={ 35 } height={ 20 } style={ { cursor: "pointer" } } src="/pdf_logo.png" />
              <p>Imprimir lista de canciones</p>
            </div>
             <p className="music_quantity" style={{ fontSize: "15px" }} >Hasta el momento { musicRec } invitados han pedido una cancion</p>
            <div className="music_cont">
            { Array.isArray( guests ) && guests.length > 0 ?
                guests.map( item =>
                    item.music !== "none" && <MusicComp key={ item._id } guest={ item } setMusicRec={ setMusicRec }/>
                 )
                 :
             <p style={ { fontSize: "20px", marginTop: "50px" ,width:"100%", textAlign: "center" } }>Aún no hay Canciones</p>   
             }
            </div>
            </div>
        </div>
    )
}