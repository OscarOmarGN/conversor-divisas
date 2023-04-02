import React, { useEffect, useState } from 'react'

const IngresarDivisa = () => {
  
  const [divisas, setDivisas] = useState([]);
  const [siglasDivisa, setSiglasDivisa] = useState([])
  useEffect(() => {
    const getDivisas = async () => {
      const resultado = await fetch(`https://api.frankfurter.app/currencies`);
      const resultadoJSON = await resultado.json();
      setDivisas(resultadoJSON);
      setSiglasDivisa(Object.keys(resultadoJSON))
    }
    getDivisas();
  }, []);
  
  const divisasArr = [];
  const  selectDivisas = () => {
    for(const divisa in divisas){
      divisasArr.push(`${divisa}: ${divisas[divisa]}`);
    }
  }
  selectDivisas();
  
  const [divisaIngresada, setDivisaIngresada] = useState(1);
  const inputDivisa = (e) => {
    setDivisaIngresada(parseInt(e.target.value));
  }

  const [valorConvertido, setValorConvertido] = useState(0);
  
  const [valueConvertir, setValueConvertir] = useState('');
  const [valueInput, setValueInput] = useState(siglasDivisa);

  const valorA = (e) => {
    setValueInput(e.target.value)
  }
  
  const valorB = (e) => {
    setValueConvertir(e.target.value)
    console.log(e.target.value)
  }

  const urlConvertir = `https://api.frankfurter.app/latest?amount=${divisaIngresada}&from=${valueInput}&to=${valueConvertir}`;
  const calcularDivisa = async (url) => {
    const resultado = await fetch(url)
    const resultadoJSON = await resultado.json();
    setValorConvertido(resultadoJSON.rates !== undefined ? resultadoJSON.rates : 0);
  }

  useEffect(() => {
    calcularDivisa(urlConvertir)
  }, [urlConvertir])

  console.log(valueInput)

  return (
    <div className='divisas-content'>
      <div className="divisa-a-convertir" >
        <input type="number" defaultValue={1} />
        <select name="divisa-a-convertir">
          { 
            divisasArr.map((divisa, index) => {
              return <option key={index} value={siglasDivisa[index]} onClick={(e) => {setValueInput(e.target.value)}} >{divisa}</option>
            })
          }
        </select>
      </div>
      <div className="divisa-resultado">
        <input className='input-resultado' disabled type="text" defaultValue={valueInput} />
        <select name="divisa-resultado" >
          {
            divisasArr.map((divisa, index) => {
              return <option className='opcion-divisa' key={index} value={siglasDivisa[index]} onClick={valorB}>{divisa}</option>
            })
          }
        </select>
      </div>
    </div>
  )
}

export default IngresarDivisa;