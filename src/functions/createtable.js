import Card from "../handlers/cards.handle"
import Swal from 'sweetalert2';

const createTable = async ( id )=>{
    Swal.fire({
        title: "Ingresa un número",
        input: "number",
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
      }).then( async (result) => {
        if (result.isConfirmed) {
          const number = parseInt( result.value )
          const add = await Card.createTable( id , number  )
          if( !add.message || add.ERROR ){
            Swal.fire({
              text: 'Mesa no creada, tal ves ya exista',
              icon: 'error',
            });
          }
          else{
            Swal.fire({
              text: 'Mesa creada',
              icon: 'success',
            });
          }
        }
      });
}

export default createTable