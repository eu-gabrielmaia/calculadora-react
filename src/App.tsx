import { useState, useRef } from 'react'
import './App.css'
import { Divide, X, Plus, Minus, Equal, Delete } from 'lucide-react';
import { BtnOperador } from './components/BtnOperador';
import TeclaNumerica from './components/TeclaNumerica';



function App() {
  const [valor1, setValor1] = useState<number>(0);
  const [valor2, setValor2] = useState<number>(0);
  const [visor, setVisor] = useState<number>(0);
  const [resultado, setResultado] = useState<number>(0);
  const [operadorSelecionado, setOperadorSelecionado] = useState<string>('');

  const inputRef = useRef<HTMLInputElement>(null);

  function handleValor(event: React.ChangeEvent<HTMLInputElement>) {
    let valorEncontrado = event.target.value;
    if (valorEncontrado === '' || isNaN(Number(valorEncontrado))) {
      valorEncontrado = '0';
    }
    setVisor(parseFloat(valorEncontrado));
  }

  function divisao() {
    setOperadorSelecionado('/');
    setValor1(visor);
  }

  function soma() {
    setOperadorSelecionado('+');
    setValor1(visor);
  }

  function subtracao() {
    setOperadorSelecionado('-');
    setValor1(visor);
  }

  function multiplicao() {
    setOperadorSelecionado('x');
    setValor1(visor);
  }

  function limpar() {
    setValor1(0);
    setValor2(0);
    setResultado(0);
    setOperadorSelecionado('');
    if (inputRef.current) {
      inputRef.current.value = '0';
    }
  }

  function calcular() {
    const valorAtual = visor;
    let resultadoCalculado = 0;

    switch (operadorSelecionado) {
      case '+':
        resultadoCalculado = valor1 + valorAtual;
        break;
      case '-':
        resultadoCalculado = valor1 - valorAtual;
        break;
      case 'x':
        resultadoCalculado = valor1 * valorAtual;
        break;
      case '/':
        resultadoCalculado = valor1 / valorAtual;
        break;
      default:
        break;
    }

    setResultado(resultadoCalculado);
    setValor2(valorAtual);

    if (inputRef.current) {
      inputRef.current.value = resultado.toString();
    }
  }

  return (
    <div className='tela w-screen h-screen flex justify-center items-center'>
      <div className='calculadora bg-white w-80 p-2 flex flex-col justify-center items-center rounded-2xl'>
        <div className='visor w-full p-10 rounded-lg text-black flex'>
          <div className='w-3/4 text-gray-400 text-lg flex gap-4 items-end justify-end'>
            <p>{valor1} {operadorSelecionado} {valor2}</p>
          </div>
          <input type='number' className='text-4xl font-semibold text-right w-full focus:outline-0' onChange={handleValor} ref={inputRef}/>
        </div>
        <div className='grid grid-flow-col grid-rows-5 gap-2 w-full'>
            <BtnOperador operador="C" onClick={limpar} />
            <TeclaNumerica numero="7" onClick={limpar} />
            <TeclaNumerica numero="4" onClick={limpar} />
            <TeclaNumerica numero="1" onClick={limpar} />
            <TeclaNumerica numero="+/-" onClick={limpar} />

            <BtnOperador operador={<Divide />} onClick={divisao} />
            <TeclaNumerica numero="8" onClick={limpar} />
            <TeclaNumerica numero="5" onClick={limpar} />
            <TeclaNumerica numero="2" onClick={limpar} />
            <TeclaNumerica numero="0" onClick={limpar} />

            <BtnOperador operador={<X />} onClick={multiplicao} />
            <TeclaNumerica numero="9" onClick={limpar} />
            <TeclaNumerica numero="6" onClick={limpar} />
            <TeclaNumerica numero="3" onClick={limpar} />
            <TeclaNumerica numero="." onClick={limpar} />

            <BtnOperador operador={<Delete />} onClick={limpar} />
            <BtnOperador operador={<Minus />} onClick={subtracao} />
            <div className='row-span-2 h-full bg-zinc-800 rounded-lg hover:bg-zinc-600 flex flex-col justify-center'>
              <BtnOperador operador={<Plus />} onClick={soma} />
            </div>
            <BtnOperador operador={<Equal />} onClick={calcular} />
        </div>
      </div>
    </div>
  )
}

export default App
