import React, {useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita'


function App() {


  //CITAS EN LOCAL STORAGE

  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales){
    citasIniciales = [];
  }

//Arreglo de citas

const [citas, guardarCitas] = useState(citasIniciales);

//USE EFECT PARA REALIZAR CIERTAS OPERACIONES CUANDO EL STATE CAMBIA

useEffect(() => {
  
  if (citasIniciales){
    localStorage.setItem('citas', JSON.stringify(citas));
  }else{
    localStorage.setItem('citas', JSON.stringify([]));
  }
 
}, [citas, citasIniciales])

//Funcion que tome las citas acttuales y agregue la nueva


const crearCita = cita => {
guardarCitas([
  ...citas,
  cita]
);
}

//Funcion que elimina citas

const eliminarCita = id =>{
const nuevasCitas= citas.filter(cita => cita.id !==id);
guardarCitas(nuevasCitas)
}


//MENSAJE CONDICIONAL
const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus citas';


  return (<>
    <h1>Administrador de pacientes</h1>
    <div className="container">
    <div className="one-half column">
<Formulario
crearCita={crearCita}

/>
    </div>
    <div className="one-half column">
      <h2>{titulo}</h2>
      {citas.map(cita =>
      (<Cita 
      key={cita.id}
      cita={cita}
      eliminarCita={eliminarCita}
      />)
      )}
    </div>
    </div>
    </>
  );
}

export default App;
