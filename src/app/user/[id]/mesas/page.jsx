"use client"

import Nav from "../../../../components/nav"
import Card from "../../../../handlers/cards.handle"
import { useParams } from "next/navigation"
import { useEffect , useState } from "react"
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import deleteTable from "../../../../functions/deleteTable"
import createTable from "../../../../functions/createtable"
import Loading from "../../../../components/loading"
import Image from "next/image"
import Head from "next/head"

export default function Tables(){

    const { id } = useParams()
    const [ tables , setTables ] = useState([])

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

    const imprimir = async () => {
        const doc = new jsPDF();
        const pageHeight = doc.internal.pageSize.height;
        const logoBase64 = await loadImageAsBase64("/tilogo.png");
      
        // Logo y título en la primera página
        doc.addImage(logoBase64, "PNG", 80, 10, 50, 50);
        doc.setFontSize(18);
        doc.text("Mesas", 20, 70);
      
        let currentY = 80;
      
        for (let i = 0; i < tables.length; i++) {
          const mesa = tables[i];
      
          // Estimar altura: título (10) + invitados (~10px cada uno)
          const estimatedHeight = 10 + mesa.guests.length * 10 + 10;
          const remainingHeight = pageHeight - currentY;
      
          if (estimatedHeight > remainingHeight) {
            doc.addPage();
            currentY = 20;
          }
      
          // Título de la mesa
          doc.setFontSize(14);
          doc.text(`Mesa: ${mesa.table_name}`, 20, currentY);
          currentY += 10;
      
          autoTable(doc, {
            startY: currentY,
            head: [["Nombre", "Email", "Menú"]],
            body: mesa.guests.map(g => [
              g.name || "-",
              g.email || "-",
              g.diet || "Regular"
            ]),
            styles: { fontSize: 10, cellPadding: 4 },
            headStyles: { fillColor: [0, 102, 204], textColor: [255, 255, 255] },
            alternateRowStyles: { fillColor: [245, 245, 245] },
            margin: { left: 20, right: 20 },
            didDrawPage: (data) => {
              currentY = data.cursor.y + 15; // Agrega espacio entre mesas
            },
          });
        }
      
        doc.save("mesas.pdf");
      };

    useEffect(()=>{
      const getGuests = async ()=>{
        const guests = await Card.getGuests( id )
        if( !guests.message || guests.ERROR ){
          window.location.href = "/"
        }
        else{
            setTables( guests.message.guestTable )
        }
      }
      getGuests()
    },[id])

    useEffect(() => {
      // Cambiar el título manualmente
      document.title = "Mesas";
      
      // Cambiar la meta descripción
      const meta = document.querySelector("meta[name='description']");
      if (meta) {
        meta.setAttribute("content", "Manejar las mesas de los invitados");
      } else {
        const newMeta = document.createElement("meta");
        newMeta.name = "description";
        newMeta.content = "Manejar las mesas de los invitados";
        document.head.appendChild(newMeta);
      }
    }, []);
  
    return(
      <>  
        <Head>
         <title>Mesas</title>
         <meta name="description" content="Manejar las mesas de los invitados" />
        </Head>
        <div className="table_container" style={ { width: "100%" } }>
         <Nav id={ id }/>
         <div className="topdf" onClick={ ()=>{ imprimir() } }>
          <Image loading="lazy" alt="pdf_icon" width={ 35 } height={ 20 } style={ { cursor: "pointer" } } src="/pdf_logo.png" />
          <p style={ { cursor: "pointer" } }>Imprimir mesas</p>
         </div>
         <div className="buttons_cont">
          <button style={ { cursor: "pointer" } } onClick={ ()=>{ createTable( id ) } }>Crear Mesa +</button>
          <button style={ { cursor: "pointer" } } onClick={ ()=>{ deleteTable( id ) } }>Eliminar Mesa -</button>
         </div>
         <div className="table_subcontainer">
          {
            tables && tables.length > 0 ?
            tables.map( item =>( 
              <div key={ item._id } className="table">
               <p className="table_name">Mesa { item.table_name }</p>
               { item.guests.map( item => 
                <div key={ item._id } className="guests">
                 <p>{ item.name }</p>
                 <div className="menu"> Menu: { item.diet === "Vegano" ? <Image loading="lazy" width={20} height={20} src="/vegan.png" alt="vegan_icon"/> : item.diet === "Vegetariano" ? <Image loading="lazy" width={20} height={20} src="/vegetarian.png" alt="vegetarian_icon"/> : item.diet === "Celíaco" ? <Image loading="lazy" width={20} height={20} src="/celiac.png" alt="celiac_icon"/> : item.diet === "Diabético" ? <Image loading="lazy" width={20} height={20} src="/diabetic.png" alt="diabetic_icon"/> : "Regular" }</div>
                 <p>{ item.email }</p>
                </div>
                ) }
              </div>
             ))
              :
             ( <p style={ { fontSize: "20px", marginTop: "50px" ,width:"100%", textAlign: "center" } }>Aún no hay Mesas</p> )
          }
         </div>
        </div>
        </>
    )
}
