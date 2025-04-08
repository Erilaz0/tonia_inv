"use client"

import { useEffect, useState } from "react"
import Users from "../../../../handlers/cards.handle"
import { useParams } from "next/navigation"
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import Image from "next/image";

export default function Menu(){
    const { id } = useParams()
    const [ messages , setMessages ] = useState([])
    
    useEffect(()=>{
       const getGuests = async ()=>{
        const guests = await Users.getGuests( id )
        if( !guests.message || guests.ERROR ){
            window.location.href = "/"
        }
        else{
          const messages_array = [];
          const guestItem = guests.message.guests;
          for( let i = 0; i < guestItem.length ; i++ ){
            if (guestItem[i] && guestItem[i].message) {
              if (guestItem[i].message.length > 0) {
                 messages_array.push({
                    name: guestItem[i].name,
                    message: guestItem[i].message,
                 });
              }
           }
          };
          setMessages( messages_array )
        }
       }
       getGuests()
    },[])

    const loadImageAsBase64 = async (url) => {
      return new Promise((resolve, reject) => {
          const img = new window.Image();
          img.crossOrigin = "Anonymous"; 
          img.src = url;
          img.onload = () => {
              const canvas = document.createElement("canvas");
              canvas.width = img.width;
              canvas.height = img.height;
              const ctx = canvas.getContext("2d");
              ctx.drawImage(img, 0, 0);
              resolve(canvas.toDataURL("image/png"));
          };
          img.onerror = (err) => reject(err);
      });
  };

    const imprimir = async ()=>{
      const doc = new jsPDF();
      const logoBase64 = await loadImageAsBase64("/tilogo.png")

      // Agregar la imagen (posición x=10, y=10, tamaño 50x50)
      doc.addImage(logoBase64, "PNG", 80, 10, 50, 50);
      doc.setFontSize(18);
      doc.text("Lista de Mensajes", 20, 80);
  
      // Agregar los datos del array
    autoTable(doc, {
      startY: 90, // 📌 Posición de inicio de la tabla
      head: [["Invitado", "Mensaje"]], // 📌 Encabezados
      body: messages.map(guest => [guest.name, guest.message]), // 📌 Datos
      styles: { fontSize: 10, cellPadding: 4 }, // 📌 Estilos
      headStyles: { fillColor: [255, 0, 0], textColor: [255, 255, 255] }, // 📌 Encabezado rojo con texto blanco
      alternateRowStyles: { fillColor: [240, 240, 240] } // 📌 Color alterno en filas
    });
  
      // Guardar el PDF
      doc.save("mensajes_tonia_inv.pdf");
    };

    useEffect(() => {
      // Cambiar el título manualmente
      document.title = "Mensajes";
      
      // Cambiar la meta descripción
      const meta = document.querySelector("meta[name='description']");
      if (meta) {
        meta.setAttribute("content", "Ver mensajes de los invitados");
      } else {
        const newMeta = document.createElement("meta");
        newMeta.name = "description";
        newMeta.content = "Manejar las mesas de los invitados";
        document.head.appendChild(newMeta);
      }
    }, []);
    
    return(
<div>
  <header style={{
    backgroundColor: 'rgb(87, 87, 87)',
    width: '100%',
    height: '90px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px',
    paddingLeft: "0px",
    paddingRight: "0px",
  }}>
    <Image onClick={ ()=>{ window.location.href = `/user/${ id }` } } loading="lazy" alt="Logo" width={ 35 } height={ 20 } src="/back_icon.png" style={{ cursor: "pointer", width: '40px', height: '40px',marginLeft: '20px'}} />
    <Image loading="lazy" alt="logo" width={ 80 } height={ 80 } style={ { cursor: "pointer", width: '80px', height: '80px', marginRight: '50px' } } src="/tilogo_white.png"/>
  </header>
  <div style={ { display: "flex" , cursor:"pointer"} } className="topdf" onClick={ ()=>{ imprimir() } }>
   <Image loading="lazy" alt="pdf_icon" width={ 35 } height={ 20 } style={ { cursor: "pointer" , marginTop: "15px"} } src="/pdf_logo.png" />
   <p style={ { fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif" } }>Imprimir lista de Mensajes</p>
  </div>
  <div className="messages_comp" style={{
    backgroundColor: '#f8f8f8', 
    borderRadius: '8px', 
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',  
    width:"100%",
    margin: '0 auto',
    display: "flex",
    alignItems:"center",
    padding:"0",
    margin:"0",
    flexDirection: "column",
    paddingTop: "30px",
    minHeight: "1000px",
    paddingBottom: "30px",
  }}>
    {
      messages.length > 0 ? messages.map(item => (
        <div key={item.name + Math.random()} style={{
          backgroundColor: '#fff',
          borderRadius: '8px',
          marginBottom: '15px',
          padding: '20px',
          paddingLeft:"10px",
          paddingRight:"10px",
          width: "90%",
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease',
        }}>
          <p style={{
            fontSize: '20px',
            fontWeight: '600',
            color: '#333',
            margin: '0 0 8px 0',
          }}>
            {item.name}
          </p>
          <p style={{
            fontSize: '16px',
            color: '#555',
            lineHeight: '1.5',
            margin: '0',
          }}>
            {item.message}
          </p>
        </div>
      )) : (
        <p style={{
          fontSize: '18px',
          fontStyle: 'italic',
          color: '#aaa',
          margin: "0",
          textAlign: 'center',
        }}>
          No hay mensajes aún
        </p>
      )
    }
  </div>
</div>
    )
}