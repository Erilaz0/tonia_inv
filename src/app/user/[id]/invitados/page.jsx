"use client"

import { useEffect, useState } from "react"
import { jsPDF } from "jspdf";
import Users from "../../../../handlers/cards.handle"
import { useParams } from "next/navigation"
import addTable from "../../../../functions/addTable"
import Loading from "../../../../components/loading"
import Nav from "../../../../components/nav";
import autoTable from "jspdf-autotable";
import deleteGuest from "../../../../functions/deleteGuest"
import SearchComp from "./searchComp";
import Image from "next/image";

export default function UserApp(){
    const { id } = useParams()
    const [ guests , setGuests ] = useState([])
    const [ quantity , setQuantity ]  = useState( 0 )
    const [ original , setOriginal ] = useState([])

    const getGuests = async ()=>{
        const guests = await Users.getGuests( id )
        if( !guests.message || guests.ERROR ){
            window.location.href = "/"
        }
        else{
            setGuests( guests.message.guests )
            setOriginal( guests.message.guests )
            const count = guests.message.guests.filter( item => item.attendance === "Sí" )
            setQuantity( count.length )
        }
       }
    
    useEffect(()=>{
       getGuests()
    },[id])



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
        
         const array_guests = []
        original.map( item => {
                        const guestObject = {
                          name: item.name,
                          email : item.email,
                          attendance: item.attendance,
                          table: item.table
                        }
                        array_guests.push( guestObject )
               }
        )
                
                    // Título
       const logoBase64 = await loadImageAsBase64("/tilogo.png")

       // Agregar la imagen (posición x=10, y=10, tamaño 50x50)
       doc.addImage(logoBase64, "PNG", 80, 10, 50, 50);
       doc.setFontSize(18);
       doc.text("Lista de Invitados", 20, 80);
                
       // Encabezados de la tabla

                
                    // Agregar los datos del array
       autoTable(doc, { // 👈 Debes pasar `doc` como primer argumento
             startY: 90, // 📌 Posición de inicio de la tabla
             head: [["Nombre", "Email", "Table", "Asistencia"]], // 📌 Encabezados
             body: array_guests.map(guest => [guest.name, guest.email, guest.table, guest.attendance]), // 📌 Datos
             styles: { fontSize: 10, cellPadding: 4 }, // 📌 Estilos
             headStyles: { fillColor: [255, 0, 0], textColor: [255, 255, 255] }, // 📌 Encabezado rojo con texto blanco
             alternateRowStyles: { fillColor: [240, 240, 240] } // 📌 Color alterno en filas
           });
                
        // Guardar el PDF
        doc.save("invitados.pdf");
                };

        useEffect(() => {
                    // Cambiar el título manualmente
        document.title = "Invitados";
                    
                    // Cambiar la meta descripción
        const meta = document.querySelector("meta[name='description']");
        if (meta) {
             meta.setAttribute("content", "Manejar los invitados");
        } else {
             const newMeta = document.createElement("meta");
             newMeta.name = "description";
             newMeta.content = "Manejar las mesas de los invitados";
             document.head.appendChild(newMeta);
        }
        }, []);
        
    
    return(
        <div className="guest_comp">
            <Nav id={ id }/>
            <div className="quantity">
             <p className="title_invite" style={ { border: "0px" } }>Asistencia:</p>
             <p className="confirmed">Han Confirmado Asistencia: { quantity }</p>
             <p className="unconfirmed">No Pueden Asistir: { guests && guests.length > 0 ? guests.length - quantity : 0 }</p>
            </div>
            <div className="topdf" onClick={ ()=>{ imprimir() } }>
             <Image loading="lazy" alt="pdf_icon" width={ 35 } height={ 20 } style={ { cursor: "pointer" } } src="/pdf_logo.png" />
             <p  style={ { cursor: "pointer" } }>Imprimir lista de Invitados</p>
            </div>
            <div className="guests_container">
            <SearchComp setGuests={ setGuests } guests={ original }/>
             <p className="title_invite">Invitados:</p>
             { guests.length > 0 ?
                 guests.map( item =>
                    <div key={ item._id } className="guest_item">
                     <div className="bar">
                      <p>{ item.name }</p>
                      <button style={ { cursor: "pointer" } } onClick={ async ()=>{ deleteGuest( id , item.email ) } } className="delete">X</button>
                     </div>
                     <p>Menú: { item.diet !== "none" ? item.diet : "Regular" }</p>
                     <p>Email: { item.email }</p>
                     <p>Musica: { item.music }</p>
                     <p>Mesa: { item.table } <button  style={ { cursor: "pointer" } } id={ item._id } onClick={ ()=>{ addTable( id , { name : item.name ,diet: item.diet , email: item.email } ) } } className="table">Agregar mesa +</button></p>
                     {
                        item.attendance === "Sí" ? 
                        <p style={ { backgroundColor : "rgb(109, 230, 105)" } } className="assistance">Asistencia: { item.attendance }</p>
                        :
                        <p style={ { backgroundColor : "rgb(216, 52, 40)" , color: "#ffffff" } } className="assistance">Asistencia: { item.attendance }</p>
                     }
                    </div>
                 )
                 :
                 <p style={ { marginTop: "50px" ,width:"100%", textAlign: "center" } }>Aún no hay invitados</p>   
             } 
            </div>
        </div>
    )
}