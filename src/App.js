
import './App.css';
import React, { useState } from 'react';
import Navbar from './Components/Navbar';
import News from './Components/News';
import { Routes, Route, HashRouter } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';


export default function App() {
  const[progress,setProgress]=useState(0)
  const [mode,setMode]=useState('light')

  const changeMode=()=>{
    if(mode == 'light')
    {
      setMode('dark')
      document.body.style.backgroundColor='black';
    }
    else{
    setMode('light')
    document.body.style.backgroundColor='white';
    }
  }

  // const setProgress=(progress)=>{
  //   setStateProgress(progress)
  // }
  
  return (
      <div>
        <HashRouter>
          <Navbar  mode={mode} changeMode={changeMode}/>
          <LoadingBar
        height={3}
        color='#f11946'
        progress={progress}
        
      />
          <Routes>
            <Route path='/' element={<News  setProgress={setProgress} mode={mode} />} />
            <Route path='/business' element={<News   setProgress={setProgress} category='business' key='business' mode={mode}/>} />
            <Route path='/entertainment' element={<News  setProgress={setProgress} category='entertainment' key="entertainment" mode={mode}/>} />
            <Route path='/general' element={<News  setProgress={setProgress} category='general' key="general" mode={mode} />} />
            <Route path='/health' element={<News   setProgress={setProgress} category='health' key="health" mode={mode}/>} />
            <Route path='/science' element={<News  setProgress={setProgress} category='science' key="science" mode={mode} />} />
            <Route path='/sports' element={<News   setProgress={setProgress} category='sports' key="sports" mode={mode}/>} />
            <Route path='/technology' element={<News  setProgress={setProgress} category='technology' key="technology" mode={mode}/>} />
          </Routes>
        </HashRouter>

      </div>
  )
}



