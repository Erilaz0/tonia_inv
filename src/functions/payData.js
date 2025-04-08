import Swal from 'sweetalert2';
const payData = async ( text )=>{
    Swal.fire({
        title: 'Nuestras cuentas',
        text: text,
        confirmButtonText: 'Aceptar'
      });
}

export default payData
