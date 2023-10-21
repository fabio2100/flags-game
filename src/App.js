import { useEffect } from 'react';
import './App.css';
import { useState } from 'react';

function App() {
  const [paises,setPaises] = useState();
  const [randomPaises,setRandomPaises] = useState();
  const [elegidos,setElegidos] = useState();
  const [bandera,setBandera] = useState();

  useEffect(()=>{
    fetch('https://flagcdn.com/es/codes.json')
    .then(response => response.json())
    .then(data => {console.log({data});setPaises(data)})
  },[])

  const handleClick = () => {
    let paisesSeleccionados = [];
    for(var i=0;i<3;i++){
      const randomPais = Object.keys(paises)[Math.floor(Math.random()*Object.keys(paises).length)];
      paisesSeleccionados.push({codigo:randomPais,nombre:paises[randomPais]})
    }
    console.log({paisesSeleccionados})
    setElegidos(paisesSeleccionados.map((pais,i)=>{
      return <li key={i}>{pais.nombre}</li>
    }))

    const randomCountry = paisesSeleccionados[Math.floor(Math.random()*paisesSeleccionados.length)].codigo
    setBandera(`https://flagcdn.com/256x192/${randomCountry}.png`)
  }


  return (<>
    <button onClick={handleClick}>Comenzar</button>
    <ul>{elegidos}</ul>
    <img src={bandera}/>
    </>
  );
}

export default App;
