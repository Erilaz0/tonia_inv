import Card from "../handlers/cards.handle"
import Swal from 'sweetalert2';

const addTable = async ( id , guest )=>{
    Swal.fire({
        title: "Ingresa un número",
        input: "number",
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
      }).then( async (result) => {
        if (result.isConfirmed) {
          const add = await Card.addToTable( id , result.value , guest )
          if( !add.message || add.ERROR ){
            Swal.fire({
              text: 'El invitado no ah cambiado de mesa',
              icon: 'error',
            });
          }
          else{
            Swal.fire({
              text: 'El invitado ah cambiado de mesa',
              icon: 'success',
            });
          }
        }
      });
}

export default addTable