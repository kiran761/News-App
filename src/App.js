
import './App.css';
import React, { Component } from 'react';
import Navbar from './Components/Navbar';
import News from './Components/News';
import { Routes, Route, HashRouter } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';


export default class App extends Component {
  state={
    progress:0
  }
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  render() {
    return (
      <div>
        <HashRouter>
          <Navbar />
          <LoadingBar
        height={3}
        color='#f11946'
        progress={this.state.progress}
        
      />
          <Routes>
            <Route path='/' element={<News setProgress={this.setProgress}  />} />
            <Route path='/business' element={<News setProgress={this.setProgress}  category='business' key='business' />} />
            <Route path='/entertainment' element={<News setProgress={this.setProgress}  category='entertainment' key="entertainment" />} />
            <Route path='/general' element={<News setProgress={this.setProgress}  category='general' key="general" />} />
            <Route path='/health' element={<News setProgress={this.setProgress}  category='health' key="health" />} />
            <Route path='/science' element={<News setProgress={this.setProgress}  category='science' key="science" />} />
            <Route path='/sports' element={<News setProgress={this.setProgress}  category='sports' key="sports" />} />
            <Route path='/technology' element={<News setProgress={this.setProgress}  category='technology' key="technology" />} />
          </Routes>
        </HashRouter>

      </div>
    )
  }
}

