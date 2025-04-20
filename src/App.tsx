import { useState, useRef, useEffect } from 'react';
import './App.css'
import { Divide, X, Plus, Minus, Equal, Delete } from 'lucide-react';
import { BtnOperador } from './components/BtnOperador';
import TeclaNumerica from './components/TeclaNumerica';



function App() {
  const [valor1, setValor1] = useState<number>(0);
  const [valor2, setValor2] = useState<number>(0);
  const [visor, setVisor] = useState<number>(0);
  const [operadorSelecionado, setOperadorSelecionado] = useState<string>('');

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = '0';
    }
  }, []);

  function handleValor(event: React.ChangeEvent<HTMLInputElement>) {
    let valorEncontrado = event.target.value;
    if (valorEncontrado === '' || isNaN(Number(valorEncontrado))) {
      valorEncontrado = '0';
    }
    setVisor(parseFloat(valorEncontrado));
  }

  function adicionarNumero(numero: string) {
    if (inputRef.current) {
      const valorAtual = inputRef.current.value;
      if (valorAtual === '0') {
        inputRef.current.value = numero;
      } else {
        inputRef.current.value += numero;
      }
    }
    setVisor(parseFloat(inputRef.current?.value || '0') || 0);
  }

  function trocarSinal() {
    if (inputRef.current) {
      const valorAtual = inputRef.current.value;
      if (valorAtual !== '0') {
        inputRef.current.value = (parseFloat(valorAtual) * -1).toString();
      } else {
        inputRef.current.value += 0;
      }
    }
    setVisor(parseFloat(inputRef.current?.value || '0') || 0);
  }

  function colocarPonto() {
    console.log(inputRef.current?.value);
    if (inputRef.current) {
      let valorAtual = inputRef.current.value;
      if (valorAtual !== '0') {
        if (!valorAtual.includes('.')) {
          valorAtual += '.';
        }
      } else {
        inputRef.current.value += '0';
      }
    }
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

  function limparTudo() {
    setValor1(0);
    setValor2(0);
    setOperadorSelecionado('');
    if (inputRef.current) {
      inputRef.current.value = '0';
    }
  }

  function limparCaracter() {
    if (inputRef.current) {
      let valorAtual = inputRef.current.value;
      if (valorAtual.length > 1) {
        valorAtual = valorAtual.slice(0, -1);
        inputRef.current.value = valorAtual;
      } else {
        inputRef.current.value = '0';
      }
    }
    setVisor(parseFloat(inputRef.current?.value || '0'));
  }

  function limparVisor(){
    setVisor(0);
    setValor2(0);
    inputRef.current!.value = '0';
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
    
    setValor2(valorAtual);

    if (inputRef.current) {
      inputRef.current.value = resultadoCalculado.toString();
    }
  }

  return (
    <div className='tela w-screen h-screen flex justify-center items-center'>
      <div className='calculadora bg-white w-80 p-2 flex flex-col justify-center items-center rounded-2xl'>
        <div className='visor w-full my-5 rounded-lg text-black flex'>
          <div className='w-2/4 text-gray-400 text-lg flex gap-4 items-end justify-end'>
            <p>{valor1} {operadorSelecionado} {valor2}</p>
          </div>
          <input type='number' className='text-4xl font-semibold text-right w-full focus:outline-0' onChange={handleValor} ref={inputRef} readOnly/>
        </div>
        <div className='grid grid-flow-col grid-rows-5 gap-2 w-full'>
            <BtnOperador operador="C" onClick={limparTudo} />
            <TeclaNumerica numero="7" onClick={() => adicionarNumero("7")}/>
            <TeclaNumerica numero="4" onClick={() => adicionarNumero("4")} />
            <TeclaNumerica numero="1" onClick={() => adicionarNumero("1")} />
            <TeclaNumerica numero="+/-" onClick={trocarSinal} />

            <BtnOperador operador={<Divide />} onClick={divisao} />
            <TeclaNumerica numero="8" onClick={() => adicionarNumero("8")} />
            <TeclaNumerica numero="5" onClick={() => adicionarNumero("5")} />
            <TeclaNumerica numero="2" onClick={() => adicionarNumero("2")} />
            <TeclaNumerica numero="0" onClick={() => adicionarNumero("0")} />

            <BtnOperador operador={<X />} onClick={multiplicao} />
            <TeclaNumerica numero="9" onClick={() => adicionarNumero("9")} />
            <TeclaNumerica numero="6" onClick={() => adicionarNumero("6")} />
            <TeclaNumerica numero="3" onClick={() => adicionarNumero("3")} />
            <TeclaNumerica numero="." onClick={colocarPonto} />

            <BtnOperador operador={<Delete />} onClick={limparCaracter} />
            <BtnOperador operador={<Minus />} onClick={subtracao} />
            <BtnOperador operador={"CE"} onClick={limparVisor} />
              <BtnOperador operador={<Plus />} onClick={soma} />
            <BtnOperador operador={<Equal />} onClick={calcular} />
        </div>
      </div>
    </div>
  )
}

export default App
