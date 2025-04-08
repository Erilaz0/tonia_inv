import Head from "next/head"
import Image from "next/image"

const MenuComp = ( { menu } )=>{
      const men = menu
      
    return(
        <div className="menu_container">
           <p className="title">En esta sección encontraras las restricciones alimentarias de tus invitados. </p>
           <div className="diet">
            <p>Veganos: { men.vegan }</p>
            <Image loading="lazy" width={30} height={30} src="/vegan.png" alt="vegan_icon"/>
           </div>
           <div className="diet">
            <p>Diabeticos: { men.diabetic }</p>
            <Image loading="lazy" width={30} height={30} src="/diabetic.png" alt="diabetic_icon"/>
           </div>
           <div className="diet">
            <p>Vegetarianos: { men.vegetarian }</p>
            <Image loading="lazy" width={30} height={30} src="/vegetarian.png" alt="vegetarian_icon"/>
           </div>
           <div className="diet">
            <p>Celiacos: { men.celiac }</p>
            <Image loading="lazy" width={30} height={30} src="/celiac.png" alt="celiac_icon"/>
           </div>
           <h1>Otras:</h1>
           {
            men.other.map((item)=>
              item !== "none" && item !== "Ninguna" && <p className="others" key={ menu.id }>{ item }</p>
            )
           }  
        </div>
    )
}

export default MenuComp