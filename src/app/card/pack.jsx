import { Satisfy , Dancing_Script , Frank_Ruhl_Libre} from "next/font/google";
const redRoses =  Satisfy({ subsets: ["latin"], weight: ["400", "400"] });
const danceScript =  Dancing_Script({ subsets: ["latin"], weight: ["400", "400"] });


export const createPackDecoration = ( model )=>{
   const decorationPack = {}
    
    if( model === "rose" ){
      decorationPack.background = "url(https://firebasestorage.googleapis.com/v0/b/planticommerce.appspot.com/o/invitations%2Fpink.png?alt=media&token=e276aafb-ac19-4ea1-907d-51b4794ede97)"
      decorationPack.buttonsBackgroundColor = "#e9abad"
      decorationPack.buttonsColor = "#eee"
      decorationPack.buttonsBorder = "1px solid #edd0d6"
      decorationPack.initialIcon = "https://firebasestorage.googleapis.com/v0/b/planticommerce.appspot.com/o/invitations%2Frings_perfect.png?alt=media&token=71b67c14-317e-47f1-9464-902d25f10a78"
      decorationPack.cronometrer = "url(https://res.cloudinary.com/ddrymuqfl/image/upload/v1743180704/frame-removebg-preview_lvkbrf.png)"
      decorationPack.cronometrerColor = "#7f7708"
      decorationPack.cronometrerLetterFont = "Courier New,Courier,monospace"
      decorationPack.cronometrerNumberFont = "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif"
      decorationPack.ceremonyImg = "https://firebasestorage.googleapis.com/v0/b/planticommerce.appspot.com/o/invitations%2FPremium_Vector___Handdrawn_sketch_of_the_decorated_arch_for_wedding_ceremony_vector_illustration_on_white_background-removebg-preview.png?alt=media&token=0191212e-23cf-4bf9-85ab-4a252f55ebbc"
      decorationPack.partyImg = "https://firebasestorage.googleapis.com/v0/b/planticommerce.appspot.com/o/invitations%2Fcake2.png?alt=media&token=6f5ca40e-7390-46ca-b1a4-5d1a60db2808"
      decorationPack.namesFont = redRoses.style.fontFamily
      decorationPack.namesColor = "rgb(177, 134, 86)"
      decorationPack.messageColor = "#000000" 
      decorationPack.locationTitleColor = "rgb(17, 17, 17)"
      decorationPack.locationsPFonts = "Courier New,Courier,monospace"
      decorationPack.locationsH2Fonts = "'Times New Roman', Times, serif"
      decorationPack.dressCode = "https://firebasestorage.googleapis.com/v0/b/planticommerce.appspot.com/o/invitations%2FCaptura_de_pantalla_2024-08-15_201237-removebg-preview.png?alt=media&token=b0f0cadd-9965-4d30-a626-76a27312d547"
      decorationPack.bar = "https://firebasestorage.googleapis.com/v0/b/planticommerce.appspot.com/o/invitations%2FCaptura_de_pantalla_2024-08-15_202209-removebg-preview.png?alt=media&token=aea7f435-7cef-4e47-a90c-7642af98f6c9"
      decorationPack.kids = "https://firebasestorage.googleapis.com/v0/b/planticommerce.appspot.com/o/invitations%2Fkid_drawing.png?alt=media&token=b64af373-1a0a-488d-af16-523889301742"
      decorationPack.specsBorderImage = "0px"
      decorationPack.specsBackgroundTitle = ""
      decorationPack.specsFont = "'Times New Roman', Times, serif"
      decorationPack.specTitleFont = "'Courier New', Courier, monospace"
      decorationPack.specColorTitle = "#d88181"
      decorationPack.specColorP = "#d88181"
      decorationPack.specBorder = "2px solid #d881815d"
      decorationPack.assistanceTitleFont = "'Courier New', Courier, monospace"
      decorationPack.assistanceSubTitleFont = "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif"
      decorationPack.assistanceSubTitleColor = "#968166"
      decorationPack.photoIcon = "https://firebasestorage.googleapis.com/v0/b/planticommerce.appspot.com/o/invitations%2Fcamera.png?alt=media&token=e5f9402b-33fb-42a1-8f4f-925b053f57b4"
      decorationPack.giftIcon = "https://firebasestorage.googleapis.com/v0/b/planticommerce.appspot.com/o/invitations%2Fgift5.png?alt=media&token=608c27f8-d5e3-4c35-b86c-2fe77d"
      decorationPack.borderButtonGift = "1px solid #fff"
      decorationPack.hoverButtons = "#f3c8c9"
      
      return decorationPack
    }
    else if( model === "white" ){
      decorationPack.background = "url(https://firebasestorage.googleapis.com/v0/b/planticommerce.appspot.com/o/invitations%2Fggg.png?alt=media&token=989aa8d0-ff98-47fe-bdba-e4e0f1222e5e)"
      decorationPack.buttonsBackgroundColor = "#ffffff"
      decorationPack.buttonsColor = "#87a979"
      decorationPack.buttonsBorder = "1px solid #edd0d6"
      decorationPack.initialIcon = "https://firebasestorage.googleapis.com/v0/b/planticommerce.appspot.com/o/invitations%2Fpigeons.png?alt=media&token=520aa836-c679-4cc1-8fdf-ed2ea6c1795a"
      decorationPack.cronometrer = "url(https://firebasestorage.googleapis.com/v0/b/planticommerce.appspot.com/o/invitations%2Fgoldenring.png?alt=media&token=3a2d4de5-331e-4cc3-8b1b-7beb553d190f&quot)"
      decorationPack.cronometrerColor = "#7f7708"
      decorationPack.cronometrerLetterFont = "Courier New,Courier,monospace"
      decorationPack.cronometrerNumberFont = "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif"
      decorationPack.ceremonyImg = "https://firebasestorage.googleapis.com/v0/b/planticommerce.appspot.com/o/invitations%2Fcouple_shadow.png?alt=media&token=09150622-251c-44cf-97ef-b1e577dd37a7"
      decorationPack.partyImg = "https://firebasestorage.googleapis.com/v0/b/planticommerce.appspot.com/o/invitations%2Fdinner.png?alt=media&token=fc214205-ce85-4b4a-8716-7b680ffaa084"
      decorationPack.namesFont = redRoses.style.fontFamily
      decorationPack.namesColor = "rgb(61, 116, 87)"
      decorationPack.messageColor = "#b99262" 
      decorationPack.locationTitleColor = "#63a049"
      decorationPack.locationsPFonts = "Courier New,Courier,monospace"
      decorationPack.locationsH2Fonts = "'Times New Roman', Times, serif"
      decorationPack.dressCode = "https://firebasestorage.googleapis.com/v0/b/planticommerce.appspot.com/o/invitations%2FNecktie_Tuxedo_Bow_Black_Suit_Tie_Transparent_HQ_PNG_Download___FreePNGImg-removebg-preview.png?alt=media&token=c388c034-94b6-46b7-bcaa-9cc5849d3f7f"
      decorationPack.bar = "https://firebasestorage.googleapis.com/v0/b/planticommerce.appspot.com/o/invitations%2Fdrink.png?alt=media&token=1b56224a-cd64-4f9c-94f9-e0e57a091fb5"
      decorationPack.kids = "https://firebasestorage.googleapis.com/v0/b/planticommerce.appspot.com/o/invitations%2Fkids_shadow.png?alt=media&token=ec3ee63a-3070-4540-81f7-fac61a1240df"
      decorationPack.specsBorderImage = "0px solid #95c78f"
      decorationPack.specsBackgroundTitle = "#8db48a"
      decorationPack.specsBackground = "#ffffff"
      decorationPack.specsFont = "'Courier New', Courier, monospace"
      decorationPack.specColorP = "#95c78f"
      decorationPack.specColorTitle = "#ffffff"
      decorationPack.specTitleFont = "'Courier New', Courier, monospace"
      decorationPack.specBorder = "2px solid #dcefd4"
      decorationPack.assistanceTitleFont = "'Courier New', Courier, monospace"
      decorationPack.assistanceSubTitleFont = "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif"
      decorationPack.assistanceSubTitleColor = "#968166"
      decorationPack.photoIcon = "https://firebasestorage.googleapis.com/v0/b/planticommerce.appspot.com/o/invitations%2Fcamera.png?alt=media&token=e5f9402b-33fb-42a1-8f4f-925b053f57b4"
      decorationPack.giftIcon = "https://firebasestorage.googleapis.com/v0/b/planticommerce.appspot.com/o/invitations%2Fgift5.png?alt=media&token=608c27f8-d5e3-4c35-b86c-2fe77d"
      decorationPack.borderButtonGift = "1px solid #fff"
      decorationPack.hoverButtons = "#f3c8c9"
      return decorationPack
    }
    else if( model === "pumpink" ){
      decorationPack.background = "url(https://firebasestorage.googleapis.com/v0/b/planticommerce.appspot.com/o/invitations%2Fpumpink.png?alt=media&token=eb754fea-7ba6-4f4f-a228-1854eb3808c9)"
      decorationPack.buttonsBackgroundColor = "#ffffff"
      decorationPack.buttonsColor = "rgb(224, 176, 122)"
      decorationPack.buttonsBorder = "1px solid rgb(237, 208, 214)"
      decorationPack.initialIcon = "https://firebasestorage.googleapis.com/v0/b/planticommerce.appspot.com/o/invitations%2Frings_perfect.png?alt=media&token=71b67c14-317e-47f1-9464-902d25f10a78"
      decorationPack.cronometrer = "url(https://firebasestorage.googleapis.com/v0/b/planticommerce.appspot.com/o/invitations%2Fpumpinkarrow.png?alt=media&token=5169601f-eb26-4fea-ab5c-3279649153e6)"
      decorationPack.cronometrerColor = "#7f7708"
      decorationPack.cronometrerLetterFont = "Courier New,Courier,monospace"
      decorationPack.cronometrerNumberFont = "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif"
      decorationPack.ceremonyImg = "https://firebasestorage.googleapis.com/v0/b/planticommerce.appspot.com/o/invitations%2FCaptura_de_pantalla_2024-08-19_213616-removebg-preview.png?alt=media&token=dcf5a71b-89ad-4849-88bd-569457c3ccc0"
      decorationPack.partyImg = "https://firebasestorage.googleapis.com/v0/b/planticommerce.appspot.com/o/invitations%2Fcakevi.png?alt=media&token=6efc52c3-19eb-4ce4-baf1-55a9c233383a"
      decorationPack.namesFont = `"Tangerine", cursive`
      decorationPack.namesColor = "#ffffff"
      decorationPack.messageColor = "#b99262" 
      decorationPack.locationTitleColor = "rgb(224, 176, 122)"
      decorationPack.locationsPFonts = "Courier New,Courier,monospace"
      decorationPack.locationsH2Fonts = "'Times New Roman', Times, serif"
      decorationPack.dressCode = "https://firebasestorage.googleapis.com/v0/b/planticommerce.appspot.com/o/invitations%2Fshadows.png?alt=media&token=d8ecd5de-d393-41fb-a7d5-36a0b83daee7"
      decorationPack.bar = "https://firebasestorage.googleapis.com/v0/b/planticommerce.appspot.com/o/invitations%2Fglass.png?alt=media&token=bc8fda73-d8b0-4704-ac74-25a71643face"
      decorationPack.kids = "https://firebasestorage.googleapis.com/v0/b/planticommerce.appspot.com/o/invitations%2Fkids_shadow.png?alt=media&token=ec3ee63a-3070-4540-81f7-fac61a1240df"
      decorationPack.specsBorderImage = "0px solid #95c78f"
      decorationPack.specsBackgroundTitle = "rgb(224, 176, 122)"
      decorationPack.specsBackground = "rgb(255, 241, 224)"
      decorationPack.specsFont = "'Courier New', Courier, monospace"
      decorationPack.specColorP = "rgb(180, 141, 74)"
      decorationPack.specColorTitle = "#ffffff"
      decorationPack.specTitleFont = danceScript
      decorationPack.specBorder = "2px solid #dcefd4"
      decorationPack.assistanceTitleFont = "'Courier New', Courier, monospace"
      decorationPack.assistanceSubTitleFont = "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif"
      decorationPack.assistanceSubTitleColor = "#968166"
      decorationPack.photoIcon = "https://firebasestorage.googleapis.com/v0/b/planticommerce.appspot.com/o/invitations%2Fcamera5.png?alt=media&token=699b551c-6cdf-41e6-be53-705154968df2"
      decorationPack.giftIcon = "https://firebasestorage.googleapis.com/v0/b/planticommerce.appspot.com/o/invitations%2Fgift8.png?alt=media&token=030d2979-2c53-440b-8801-e33271270515"
      decorationPack.borderButtonGift = "1px solid #fff"
      decorationPack.hoverButtons = "#f3c8c9"
      return decorationPack
    }
}

