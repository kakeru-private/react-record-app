import React from 'react'
import './App.css'
import Sidebar from './components/Sidebar';
import Router from './Router';




function App() {
  

    return (
      <div className='App'>
            <div className='bar'>
              <Sidebar/>
            </div>
            <div className='main'>
              <Router/>
            </div>
      </div>
      
    );
}

export default App;
