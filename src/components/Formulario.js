import React, {useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types'


const Formulario = ({crearCita}) => {


//CREANDO STATE DE CITA 

const[cita, actualizarCita] = useState({
  mascota:'',
  propietario: '',
  fecha:'',
  hora: '',
  sintomas:''
});


//Ejecutando cada vez que se escribe

const actualizarState = (e) =>{
actualizarCita({
  ...cita,
  [e.target.name]: e.target.value
})
};

const [error, actualizarError] = useState(false)


//EXTRAYENDO VALORES

const {mascota, propietario, fecha, hora, sintomas} = cita;

//CUANDO EL USUARIO PRESIONA AGREGAR CITA


const submitCita = (e) =>{
  
  e.preventDefault();

  // Validar cita
if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === ''){
actualizarError(true);
return;
}

//Eliminar el mensaje previo de error

actualizarError(false);

  //Asignar un ID
cita.id = uuidv4();
  //Crear la cita
crearCita(cita);
  //Reiniciar el form

  actualizarCita({
    mascota:'',
  propietario: '',
  fecha:'',
  hora: '',
  sintomas:''
})
}

  return (
    <>
  <h2>Crear cita</h2>

{error ? <p className="alerta-error">Todos los campos son necesarios</p> : null}

  <form
  onSubmit={submitCita}
  >
    <label>Nombre Mascota</label>
    <input 
    type="text"
    name="mascota"
    className="u-full-width"
    placeholder="Nombre Mascota"
    onChange={actualizarState}
    value={mascota}
    />

        <label>Nombre Dueño</label>
    <input 
    type="text"
    name="propietario"
    className="u-full-width"
    placeholder="Nombre Dueño"
    onChange={actualizarState}
     value={propietario}

    />


        <label>Fecha</label>
    <input 
    type="date"
    name="fecha"
    className="u-full-width"
    onChange={actualizarState}
        value={fecha}

    />


        <label>Hora</label>
    <input 
    type="time"
    name="hora"
    className="u-full-width"
    onChange={actualizarState}
        value={hora}

    />

        <label>Sintomas</label>
  <textarea
  className="u-full-width"
  name="sintomas"
  onChange={actualizarState}
  value={sintomas}

  ></textarea>

  <button
  type="submit"
  className="u-full-width button-primary"
  >Agregar Cita</button>

  </form>
  </>
  )
}

Formulario.propTypes = {
  crearCita: PropTypes.func.isRequired
}

export default Formulario
