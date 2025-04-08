import { useEffect, useState } from "react"
import { createPackDecoration } from "../pack"
import "../../../styles/main.scss"
import Cronometrer from "./cronometro"
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules'
import redirect from "../../../functions/redirect";
import payData from "../../../functions/payData"
import userData from "../../../functions/userData"
import { useParams } from "next/navigation"
import Image from "next/image";


export default function Invitation( invitation ){
    const [ styles , setStyles ] = useState()
    const [ email , setEmail ] = useState()
    const id = useParams().id
    let card = invitation.invitation
    useEffect(()=>{
      const deco = createPackDecoration( invitation.invitation.model )
      setStyles( deco )
    },[])


    useEffect(() => {
      setTimeout(() => {
          const observer = new IntersectionObserver(entries => {
              entries.forEach(entry => {
                  if (entry.isIntersecting) {
                      entry.target.classList.add("visible");
                      observer.unobserve(entry.target); // Evita llamadas innecesarias
                  }
              });
          },{ threshold: 0.5 });
  
          const elements = document.querySelectorAll(".appear.hidden");
          elements.forEach(elemento => observer.observe(elemento));
  
          return () => observer.disconnect();
      }, 200);
  }, [card]); 

  const changueEmail = ( event )=>{
     setEmail( event.target.value )
  }

  useEffect(() => {
    // Cambiar el título manualmente
    document.title = "Invitacion";
    
    // Cambiar la meta descripción
    const meta = document.querySelector("meta[name='description']");
    if (meta) {
      meta.setAttribute("content", "Invitacion web");
    } else {
      const newMeta = document.createElement("meta");
      newMeta.name = "description";
      newMeta.content = "Manejar las mesas de los invitados";
      document.head.appendChild(newMeta);
    }
  }, []);
   
    return(
        <div className="container" style={ styles && { backgroundImage : styles.background } }>
         <div className="first_appear_container"> 
          <Image className="firstImage" width={300} height={300} alt="foto_principal" src={ card.images.imagen1 }></Image>
          {
            card.model !== "pumpink" ?
            <p className="names"  style={ styles && { color: styles.namesColor , fontFamily : styles.namesFont } }>{ card.names }</p>
            :
            <p className="names"  style={ styles && { width: "100%", clipPath: "polygon(0px 7%, 100% 0px, 100% 92%, 0px 100%)", fontSize: "78px", color: styles.namesColor , fontFamily : styles.namesFont  , padding: "30px 20px 20px" , backgroundColor: "rgb(237, 208, 172)" ,marginTop: "-80px", borderBottom : "15px solid rgb(250, 230, 179)" , borderTop : "15px solid rgb(250, 230, 179)"} }>{ card.names }</p>
          }
          {
            styles && <Image className="icon_one" width={ 80 } height={ 80 } loading="lazy" alt="pdf_icon" style={ { cursor: "pointer" } } src={ styles.initialIcon } />
          }
          <p style={ styles && { color : styles.messageColor } } className="message">{ card.message }</p>
           <Cronometrer date={ card.date } styles={ styles } px={ card.model && card.model !== "pumpink" ? "translateY(30px)" : "translateX(17px) translateY(20px)" }/>
         </div>
         <div className="locations">
          {
            card.event_text !== "none" && 
            <div className="loc">
              {
                styles && <Image alt="imagen_ceremonia" width={230} height={230} className="appear hidden" src={ styles && styles.ceremonyImg } style={ { borderBottom : card.model === "white" ? "1px solid rgba(0, 0, 0, 0.29)" : "0px"  } }></Image>
              }
             <p className="title appear hidden" style={ styles && { fontFamily : styles.locationsH2Fonts , color : styles.locationTitleColor } }>Ceremonia</p>
             <p className="appear hidden" style={ { fontFamily : styles && styles.locationsPFonts } }>{ card.event_text }</p>
             <button  onClick={ ()=>{ redirect( card.event_address ) } } className="appear hidden" style={ styles && { color: styles.buttonsColor, border: styles.buttonsBorder, backgroundColor : styles.buttonsBackgroundColor } } >Ver Ubicacion</button>
            </div>
          }
          {
            card.party_text !== "none" && 
            <div className="loc">
              {
                styles && <Image alt="imagen_ceremonia" width={230} height={230} className="appear hidden" src={ styles && styles.partyImg } style={ { borderBottom : card.model === "white" ? "1px solid rgba(0, 0, 0, 0.29)" : "0px"  } }></Image>
              }
             <p className="title appear hidden"  style={ styles && { fontFamily : styles.locationsH2Fonts , color : styles.locationTitleColor } }>Celebración</p>
             <p className="appear hidden" style={ { fontFamily : styles && styles.locationsPFonts } }>{ card.event_text }</p>
             <button onClick={ ()=>{ redirect( card.party_address ) } } className="appear hidden" style={ styles && { color: styles.buttonsColor, border: styles.buttonsBorder, backgroundColor : styles.buttonsBackgroundColor } } >Ver Ubicacion</button>
            </div>
          }
         </div>
         <div className="specs">
            { styles && 
                card.dress_code !== "none" && 
                <div className="spec appear hidden" style={ { border : styles.specBorder , backgroundColor : styles.specsBackground } }>
                <p  style={ { color : styles.specColorTitle , fontFamily : styles.specTitleFont , backgroundColor : styles.specsBackgroundTitle } } className="spec-title">Dress Code</p>
                <Image alt="dress_code" width={190} height={210} src={ styles.dressCode } style={ { border : styles.specsBorderImage  } }></Image>
                <p style={ { color : styles.specColorP } }  className="spec-description">{ card.dress_code }</p>
               </div>
            }
            { styles && 
                card.bar !== "none" &&
                <div className="spec appear hidden" style={ { border : styles.specBorder, backgroundColor : styles.specsBackground } }>
                <p  style={ { color : styles.specColorTitle , fontFamily : styles.specTitleFont , backgroundColor : styles.specsBackgroundTitle } } className="spec-title">Bar</p>
                <Image alt="bar" width={190} height={210} src={ styles.bar } style={ { border : styles.specsBorderImage  } }></Image>
                <p style={ { color : styles.specColorP } }  className="spec-description">{ card.bar }</p>
               </div>
            }
            { styles &&
                card.kids !== "none" && 
                <div className="spec appear hidden" style={ { border : styles.specBorder , backgroundColor : styles.specsBackground } }>
                <p style={ { color : styles.specColorTitle , fontFamily : styles.specTitleFont , backgroundColor : styles.specsBackgroundTitle } } className="spec-title">Niños</p>
                <Image alt="kids" width={190} height={210} src={ styles.kids } style={ { border : styles.specsBorderImage  } }></Image>
                <p style={ { color : styles.specColorP } }  className="spec-description">{ card.kids }</p>
               </div>
            }
         </div>
         <div className="assistance">
          <p className="assistance_title appear hidden" style={ styles && { fontFamily : styles.assistanceTitleFont } }>¿Vienes?</p>
          <p className="assistance_subtitle appear hidden" style={ styles && { fontFamily : styles.assistanceSubTitleFont , color : styles.assistanceSubTitleColor } }>Envía Aquí Tu Confirmación</p>
          <input onChange={ changueEmail } className="appear hidden" placeholder="TÚ EMAIL:"></input>
          <button onClick={ ()=>{ userData( email , id ) } } className="appear hidden" style={ styles &&  { color : styles.buttonsColor , backgroundColor : styles.buttonsBackgroundColor , border : styles.buttonsBorder } }>Enviar</button>
         </div>
         {
          styles && <Image className="photoIcon appear hidden" alt="camera" width={100} height={100} src={ styles.photoIcon } style={ { border : styles.specsBorderImage  } }></Image>
         }
         <div className="swiper_container">
          <Swiper
          modules={[Autoplay]}
           spaceBetween={50}
           slidesPerView={1}
           autoplay={ { delay : 2000 } }
           loop={true}
           >
           <SwiperSlide>
            <Image alt="Slide 1" width={100} height={100} src={ card.images.imagen2 }></Image>
           </SwiperSlide>
           <SwiperSlide>
            <Image alt="Slide 1" width={100} height={100} src={ card.images.imagen3 }></Image>
           </SwiperSlide>
           <SwiperSlide>
            <Image alt="Slide 1" width={100} height={100} src={ card.images.imagen4 }></Image>
           </SwiperSlide>
           {/* Agrega más slides si lo deseas */}
          </Swiper>
         </div>
         <div className="gift_message">
          <p className="appear hidden">
             Su presencia en nuestro día especial es el mejor regalo que podemos recibir. Sin embargo, si desean contribuir con un obsequio adicional, les dejamos nuestro número de cuenta. ¡Gracias de antemano por su generosidad y cariño!
          </p>
         </div>
         <div className="gift">
          {
            styles &&  <Image className="appear hidden" alt="camera" width={100} height={100} src={ styles.giftIcon } style={ { border : styles.specsBorderImage  } }></Image>
          }
          
          <button onClick={ ()=>{ payData( card.account_text ) } } className="appear hidden" style={ styles && { color: styles.buttonsColor, border: styles.borderButtonGift, backgroundColor : styles.buttonsBackgroundColor } } >Regalar</button>
         </div>
        </div>
    )
}