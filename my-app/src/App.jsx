import { useState, useReducer, useRef, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  useEffect(()=>{
    var url = 'https://jsonplaceholder.typicode.com/posts'
    fetch(url).then(res => res.json()).then(data => console.log(data))


  },[])

  var [name, setName] = useState(undefined);
  
  var valueInput = useRef(0);

  function handClick(){
    setName(valueInput.current.value)
  }

  var [state, dispatch] = useReducer(reducer, {count : 0})
  function reducer(state, action){
    console.log(action)
    switch(action.type){
      case '+' : return {count : state.count +1}
      case '-' : return {count : state.count -1}

    }
  }

  function handAdd(){
    dispatch({type : '+'})
  }
  function handSub(){
    dispatch({type : '-'})
  }

  
  return (
    <>
      {/* <ul>
        {
          data.map((item, index)=>{
            return <li key={index}>{item}</li>
          })
        }
      </ul> */}

      <button onClick={handAdd} style={{backgroundColor : 'red'}}>Tăng</button>
      <button onClick={handSub} style={{backgroundColor : 'blue'}}>Giảm</button><br />
      <span>{state.count}</span><br />

      <input ref={valueInput} type="text" name="" id="" placeholder='Nhập tên' /><br />
      <button onClick={handClick}>In</button><br />
      <span>{name}</span><br />
    </>
  )
}

export default App
