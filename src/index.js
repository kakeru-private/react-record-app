import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import store from './components/store'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <Provider>
      <BrowserRouter store={store}>
        <App />
      </BrowserRouter>    
    </Provider>
    
      
  
);