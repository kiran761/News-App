
import './App.css';
import React, { Component } from 'react';
import Navbar from './Components/Navbar';
import News from './Components/News';
import { Routes, Route, HashRouter } from 'react-router-dom';


export default class App extends Component {
  render() {
    return (
      <div>
        <HashRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<News />} />
            <Route path='/business' element={<News category='business' key='business' />} />
            <Route path='/entertainment' element={<News category='entertainment' key="entertainment" />} />
            <Route path='/general' element={<News category='general' key="general" />} />
            <Route path='/health' element={<News category='health' key="health" />} />
            <Route path='/science' element={<News category='science' key="science" />} />
            <Route path='/sports' element={<News category='sports' key="sports" />} />
            <Route path='/technology' element={<News category='technology' key="technology" />} />
          </Routes>
        </HashRouter>

      </div>
    )
  }
}

