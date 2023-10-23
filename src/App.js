import { useContext, useEffect } from 'react';
import './App.css';
import { useState } from 'react';

function App() {
  const [paises,setPaises] = useState();
  const [bandera,setBandera] = useState();
  const [aciertos,setAciertos] = useState(0);
  const [errores,setErrores] = useState(0);

  useEffect(()=>{
    fetch('https://flagcdn.com/es/codes.json')
    .then(response => response.json())
    .then(data => {
      let paisesSeleccionados = [];
      for(var i=0;i<3;i++){
        const randomPais = Object.keys(data)[Math.floor(Math.random()*Object.keys(data).length)];
        paisesSeleccionados.push({codigo:randomPais,nombre:data[randomPais]})
      }
      console.log(paisesSeleccionados)
      
      const randomCountry = paisesSeleccionados[Math.floor(Math.random()*paisesSeleccionados.length)].codigo
      setBandera(randomCountry)
      setPaises(paisesSeleccionados)
      })     
  },[aciertos,errores])



  const handleSelection = ({target}) => {
    target.value === bandera ? setAciertos(prev => prev+1) : setErrores(prev=>prev+1);
  }


  return (
    <>
      {paises && paises.map((pais,i)=>{
        return <button key={i} onClick={handleSelection} value={pais.codigo}>{pais.nombre}</button>
      })}
      {bandera && <img src={`https://flagcdn.com/256x192/${bandera}.png`}/>}
      <p>aciertos: {aciertos}</p>
      <p>errores: {errores}</p>
    </>
  );
}

export default App;
