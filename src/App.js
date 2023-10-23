import { useContext, useEffect } from 'react';
import './App.css';
import { useState } from 'react';

function App() {
  const [paises,setPaises] = useState();
  const [bandera,setBandera] = useState();
  const [aciertos,setAciertos] = useState(0);
  const [errores,setErrores] = useState(0);
  const [esAcierto,setIsAcierto] = useState(false);
  const [esError,setIsError] = useState(false);

  useEffect(()=>{
    fetch('https://flagcdn.com/es/codes.json')
    .then(response => response.json())
    .then(data => {
      let paisesSeleccionados = [];
      for(var i=0;i<3;i++){
        const randomPais = Object.keys(data)[Math.floor(Math.random()*Object.keys(data).length)];
        paisesSeleccionados.push({codigo:randomPais,nombre:data[randomPais]})
      }     
      const randomCountry = paisesSeleccionados[Math.floor(Math.random()*paisesSeleccionados.length)].codigo
      setBandera(randomCountry)
      setPaises(paisesSeleccionados)
      })     
  },[aciertos,errores])



  const handleSelection = ({target}) => {
    if(target.value === bandera) 
      {setAciertos(prev => prev+1);
        setIsAcierto(true);
    }else{
        setIsAcierto(false)
      setErrores(prev=>prev+1);}  
  }


  return (
    <>
      <div className="row justify-content-center">
      {bandera && <img className='w-50 p-3' src={`https://flagcdn.com/256x192/${bandera}.png`}/>}
      </div>
      <div>
      {paises && paises.map((pais,i)=>{
        return <button className='btn btn-outline-dark col-4' key={i} onClick={handleSelection} value={pais.codigo}>{pais.nombre}</button>
      })}
      </div>
      <div class="progress">
        <div className="progress-bar bg-success" role="progressbar" style={{width: aciertos*100/(errores+aciertos)+'%'}} aria-valuenow="15" aria-valuemin="0" aria-valuemax="100">{aciertos+errores>0 && aciertos}</div>
        <div className="progress-bar bg-danger" role="progressbar" style={{width: errores*100/(errores+aciertos)+'%'}} aria-valuenow="30" aria-valuemin="0" aria-valuemax="100">{errores+errores>0 && errores}</div>
      </div>
      <div>
      <p>aciertos: {aciertos} errores: {errores}</p>
      </div>
    </>
  );
}

export default App;
