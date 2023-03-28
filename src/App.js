import React, { createContext, useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar';
import Router from './Router';




function App() {
  const uidContext = createContext();
  const [uid,setUid] = useState(undefined);
  const value = {
    uid,
    setUid,
  }

    return (
      <div className='App'>
            
          <uidContext.Provider value={value}>
            <div className='bar'>
              <Sidebar/>
            </div>
            <div className='main'>
              <Router/>
            </div>
          </uidContext.Provider>
          
        
      </div>
      
    );
}

export default App;
