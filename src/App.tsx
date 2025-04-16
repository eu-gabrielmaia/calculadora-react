import { useState, useRef } from 'react'
import './App.css'
import { Divide, X, Plus, Minus, Equal } from 'lucide-react';
import { BtnOperador } from './components/BtnOperador';



function App() {
  const [valor1, setValor1] = useState<number>(0);
  const [valor2, setValor2] = useState<number>(0);
  const [resultado, setResultado] = useState<number>(0);
  const [operadorSelecionado, setOperadorSelecionado] = useState<string>('');

  const inputRef = useRef<HTMLInputElement>(null);
  const valor2Ref = useRef<HTMLInputElement>(null);
  const resultadoRef = useRef<HTMLInputElement>(null);


  function divisao(){
    setOperadorSelecionado('divisao');
    setValor1(inputRef.current?.value ? parseFloat(inputRef.current.value) : 0);
    setResultado(0);
    if (inputRef.current) {
      inputRef.current.value = '0';
    }
  }

  function soma(){
    setOperadorSelecionado('soma');
    setValor1(inputRef.current?.value ? parseFloat(inputRef.current.value) : 0);
    setResultado(0);
  }

  function subtracao(){
    setOperadorSelecionado('subtracao');
    setValor1(inputRef.current?.value ? parseFloat(inputRef.current.value) : 0);
    setResultado(0);
  }

  function multiplicao(){
    setOperadorSelecionado('multiplicacao');
    setValor1(inputRef.current?.value ? parseFloat(inputRef.current.value) : 0);
    setResultado(0);
  }

  function calcular(){
    if (inputRef.current) {
      setValor2(inputRef.current.value ? parseFloat(inputRef.current.value) : 0);
    }
    
    switch (operadorSelecionado) {
      case 'soma':
        setResultado(valor1 + valor2);
        break;
      case 'subtracao':
        setResultado(valor1 - valor2);
        break;
      case 'multiplicacao':
        setResultado(valor1 * valor2);
        break;
      case 'divisao':
        setResultado(valor1 / valor2);
        console.log(`Valor 1: ${valor1}, Valor 2: ${valor2}, Resultado da divisão: ${valor1 / valor2}`);
        console.log(typeof (valor2));
        break;
      default:
        break;
    }
  }

  return (
    <>
      <div className='bg-white w-100 h-250 p-10 flex flex-col gap-4 justify-center items-center rounded-2xl'>
        <div className='bg-white w-full p-10 rounded-lg shadow-md text-black'>
          <input type='number' className=' text-4xl text-right w-full focus:outline-0'/>
        </div>
        <div className='grid grid-flow-col grid-rows-4'>
          <div className='flex gap-4 items-center justify-around w-full'>
            <BtnOperador operador={<Divide />} onClick={divisao} />
            <BtnOperador operador={<Plus />} onClick={soma} />
            <BtnOperador operador={<Minus />} onClick={subtracao} />
            <BtnOperador operador={<X />} onClick={multiplicao} />
          </div>

        </div>
        <div className='grid grid-flow-col grid-rows-4'>
          <div><BtnOperador operador={<Equal />} onClick={calcular} /></div>

        </div>
      </div>
    </>
  )
}

export default App
