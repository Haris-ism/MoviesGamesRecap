import React, {useState} from "react"

const Asd=()=> {
  function z (){
    console.log("function")
    return 6
  }
  const [count,setCount] = useState(z())
  function decrement(){
    setCount(count-1)
    setCount(count-1)
  }
  function increment(){
    setCount(x=>x+1)
    setCount(x=>x+1)
  }
  return(
    <>
    <button onClick={decrement}>-</button>
    <span>{count}</span>
    <button onClick={increment}>+</button>
    </>
  )
}

export default Asd
