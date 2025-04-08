import "../styles/main.scss"

export default function Loading( color ){

  
  return (
    <div className="loader" style={ color && color?.color === false ? { backgroundColor: "transparent" }  : { width:"100%" } }>
     <img src="/tilogo.png"></img>
    </div>
  );
};

