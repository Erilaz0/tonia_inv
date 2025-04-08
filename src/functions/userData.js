import Swal from 'sweetalert2';
import Card from '../handlers/cards.handle';

const userData = async (email, id) => {
  if (email.length > 5 && email.includes("@")) {
    Swal.fire({
      title: 'Confirma tu asistencia',
      html: `
        <style>
          .swal-container {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            gap: 10px;
          }
          .swal-label {
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 5px;
            text-align: start;
            width: 100%;
          }
          .swal-input, .swal-select {
            width: 100%;
            padding: 8px;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 14px;
          }
        </style>
        
        <div class="swal-container">
          <label class="swal-label">Tu Nombre</label>
          <input id="swal-nombre" class="swal-input" placeholder="Escribe tu nombre" required>
    
          <label class="swal-label">Restricción Alimentaria</label>
          <select id="swal-restriccion" class="swal-select">
            <option value="none">Sin restricción</option>
            <option value="Vegetariano">Vegetariano/a</option>
            <option value="Vegano">Vegano/a</option>
            <option value="Celíaco">Celiaco/a</option>
            <option value="Diabético">Diabetico/a</option>
            <option value="otro">Otro</option>
          </select>
          
          <input id="swal-otra-restriccion" class="swal-input" placeholder="Especifica tu restricción" style="display: none;">
    
          <label class="swal-label">Música Recomendada</label>
          <input id="swal-musica" class="swal-input" placeholder="Canción o género favorito">
    
          <label class="swal-label">Mensaje</label>
          <input id="swal-mensaje" class="swal-input" placeholder="Mensaje para la pareja">
          
          <select id="swal-asistencia" class="swal-select">
            <option value="Sí">Sí</option>
            <option value="No">No</option>
          </select>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      cancelButtonText: 'Cancelar',
      didOpen: () => {
        // Detectar cambio en el select de restricción
        document.getElementById("swal-restriccion").addEventListener("change", function () {
          const otroInput = document.getElementById("swal-otra-restriccion");
          if (this.value === "otro") {
            otroInput.style.display = "block";
          } else {
            otroInput.style.display = "none";
            otroInput.value = ""; // Limpiar si se cambia la opción
          }
        });
      },
      preConfirm: () => {
        const restriccion = document.getElementById('swal-restriccion').value;
        const otraRestriccion = document.getElementById('swal-otra-restriccion').value;
        return {
          nombre: document.getElementById('swal-nombre').value,
          restriccion: restriccion === "otro" ? otraRestriccion : restriccion,
          musica: document.getElementById('swal-musica').value,
          mensaje: document.getElementById('swal-mensaje').value,
          asistencia: document.getElementById('swal-asistencia').value
        };
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
       if( result.value.nombre.length < 2 ){
        Swal.fire({
          title: 'El Nombre y apellido son obligatorios',
          confirmButtonText: 'Aceptar'
        });
       }
       else{
        const musica = result.value.musica.length === 0 ? "none" : result.value.musica;  // Se corrigió la referencia
        const mensaje = result.value.mensaje.length === 0 ? "none" : result.value.mensaje;
        const guest = {
          name: result.value.nombre,
          diet: result.value.restriccion,
          music: musica,
          attendance: result.value.asistencia,
          message: mensaje,
          email: email
        };
        const addingGuest = await Card.addGuest(id, guest);
        if ( addingGuest.ERROR_EMAIL ){
         Swal.fire({
            title: 'Este email ya existe',
            confirmButtonText: 'Aceptar'
          });
        }else if( !addingGuest || !addingGuest.MESSAGE ) {
          Swal.fire({
            title: 'Error del servidor, intentalo mas tarde',
            confirmButtonText: 'Aceptar'
          });
        }
        else if( addingGuest.MESSAGE ){
          Swal.fire({
            title: 'Confirmación Enviada, ¡Te esperamos!',
            confirmButtonText: 'Aceptar'
          });
        }
        else{
          Swal.fire({
            title: 'Error del servidor, intentalo mas tarde',
            confirmButtonText: 'Aceptar'
          });
        }
       }
     
      }
      });
      } else {
       Swal.fire({
       title: 'Ingresa un email válido',
       icon: "error",
       confirmButtonText: 'Aceptar'
      });
  }
};

export default userData;
