import { useCallback, useEffect, useRef, useState } from 'react'

// import './App.css'

function App() {
  const [length, setlength] = useState(5)
  const [numberallowed , setnumberallowed] = useState(false)
  const [charallowed , setCharallowed] = useState(false)
  const [password , setPassowrd] = useState()

  const passwordGenrator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberallowed) str += "0123456789"
    if(charallowed) str += "@#$%^&*!~+-_=*[]{}"
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassowrd(pass)
   
  },[length,numberallowed,charallowed,setPassowrd])

  const passwordRef = useRef(null)

  const copyclipboard = useCallback(()=>{
    passwordRef.current.select()
    passwordRef.current.setSelectionRange(0,3)
   window.navigator.clipboard.writeText(password)
  },[password])

 useEffect(()=>{
  passwordGenrator()
 },[length,numberallowed,charallowed,passwordGenrator])

  return (
    <>
   <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className='text-white text-center my-3'>Password generator</h1>
    <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
        />
        <button
          onClick={copyclipboard}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
        >copy</button>
        
    </div>
    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input 
        type="range"
        min={6}
        max={100}
        value={length}
         className='cursor-pointer'
         onChange={(e)=>{setlength(e.target.value)}}
       
       
          />
          <label>Length: {length}</label>
      </div>
      <div className="flex items-center gap-x-1">
      <input
          type="checkbox"
          defaultChecked={numberallowed}
          id="numberInput"
          onChange={()=>{setnumberallowed((prev) => !prev)}}
      />
      <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              id="characterInput"
              onChange={()=>{setCharallowed((prev) => !prev)}}
         
          />
          <label htmlFor="characterInput">Characters</label>
      </div>
    </div>
</div>
    
       
     
    </>
  )
}

export default App
