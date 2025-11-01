import { createContext, useEffect, useState } from 'react'

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Nav from './components/Nav'
import './App.css'
import Form from './components/Form'
import Home from './components/Home'
import View from './components/View'


const App = () => {

const[editId,setEditId] = useState(null)
const[viewId,setViewId] = useState(null) 

const[sWidth,setSwidth] = useState(window.innerWidth)

useEffect(()=>{
  let sizeChange = ()=>{
    setSwidth(window.innerWidth)
  }
  window.addEventListener('resize',sizeChange)
  return ()=>{
    window.addEventListener('resize',sizeChange)
  }
},[])


if(!(JSON.parse(localStorage.getItem('task')))){
  localStorage.setItem('task',JSON.stringify([]))
}
let task = JSON.parse(localStorage.getItem('task'))



  return (
   
    <div>
      <Router>
        <Nav sWidth={sWidth} editId={setEditId} />
        <Routes>
          <Route path='/' element={ task.length <= 0 ? <Form/> : <Home/> } />
          <Route path='/form' element={<Form  editId={editId}/>}  /> 
          <Route path='/home' element={<Home editId={setEditId} viewId={setViewId}/>}  /> 
          <Route path='/view' element={ <View viewId = {viewId} /> } />
        </Routes>
      </Router>  
    </div>
 
  )
}

export default App