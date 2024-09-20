import { useState, useCallback, useEffect, useRef } from 'react'
import "./index.css"

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [symbolAllowed, setSymbolAllowed] = useState(false)
  const [password, setPassword] = useState('')
  const [buttonText, setButtonText] = useState('COPY')

  //use ref hook

  const passRef = useRef(null)

  const copyPass = () => {
    window.navigator.clipboard.writeText(passRef.current?.select())
    setButtonText('COPIED')

    setTimeout(() => {
      setButtonText('COPY')
    }, 1500)
  }

  const passwordGen = useCallback(() =>{
    let pass= ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if (symbolAllowed) str += "!@#$%^&*_+"

    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [length, numberAllowed, symbolAllowed, setPassword])

  useEffect(() => {
    passwordGen()
  }, [length, numberAllowed, symbolAllowed, passwordGen])

  return (
    <>
      <div className='w-full max-w-screen-md shadow-md text-center rounded-lg px-4 my-48 text-white bg-slate-600 mx-auto'>
  <h1 className='font-bold py-3'> Password Generator </h1>

  <div className='flex mb-4 shadow rounded-lg overflow-hidden'>
    <input
      type="text"
      value={password}
      className='outline-none w-full py-2 px-3 text-center text-black'
      placeholder='Password'
      readOnly
      ref={passRef}
    />
    <button onClick = {copyPass} className='bg-blue-900 px-3 hover:bg-blue-500'> {buttonText} </button>
  </div>

  <div className='flex text-sm gap-x-2 justify-center mt-4'>
    <div className='flex items-center gap-x-4'>
      <input
        type="range"
        min={8}
        max={100}
        value={length}
        className='cursor-pointer'
        onChange={(e) => setLength(e.target.value)}
      />
      <label> Length :{length} </label>
      <div className='flex items-center gap-x-4'>
        <input type="checkbox"
        defaultChecked = {numberAllowed}
        onChange={() => {
          setNumberAllowed(!numberAllowed)
        }} />
        <label> Numbers </label>
        <input type="checkbox"
        defaultChecked = {symbolAllowed}
        onChange={() => {
          setSymbolAllowed(!symbolAllowed)
        }} />
        <label> Symbols </label>
      </div>
    </div>
  </div>
</div>

    </>
  )
}

export default App
