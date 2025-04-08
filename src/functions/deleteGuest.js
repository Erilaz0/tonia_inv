import Card from "../handlers/cards.handle"
import Swal from 'sweetalert2';

const deleteGuest = async ( id , email )=>{
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción no se puede deshacer.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
        reverseButtons: true
      }).then( async (result) => {
        if (result.isConfirmed) {
            const del = await Card.deleteGuest( id , email )
            if( !del.message || del.ERROR ){
              Swal.fire({
                  title: 'Invitado no eliminado',
                  icon: "error",
                  confirmButtonText: 'Aceptar'
                });
            }
            else{
               Swal.fire({
                title: 'Invitado eliminado',
                icon: "success",
                confirmButtonText: 'Aceptar'
              });      
            }
        }
      });
}

export default deleteGuest