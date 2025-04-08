import Card from "../handlers/cards.handle"
import Swal from 'sweetalert2';

const deleteTable = async ( id , number )=>{

  Swal.fire({
    title: 'Escribe algo',
    input: 'text',
    inputLabel: 'Número de Mesa',
    inputPlaceholder: 'Ej. 1',
    showCancelButton: true,
    confirmButtonText: 'Eliminar',
    cancelButtonText: 'Cancelar'
  }).then(result => {
    if (result.isConfirmed) {
      const valor = parseInt( result.value );
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
            const del = await Card.deleteTable( id , valor )
            if( !del.message || del.ERROR ){
              Swal.fire({
                  title: 'Mesa no eliminada',
                  icon: "error",
                  confirmButtonText: 'Aceptar'
                });
            }
            else{
               Swal.fire({
                title: 'Mesa eliminada',
                icon: "success",
                confirmButtonText: 'Aceptar'
              });      
            }
        }
      });
    }
  });
}

export default deleteTable