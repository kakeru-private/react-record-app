import React from 'react';
import './Sidebar.css'
import {SidebarData} from './SidebarData'
import { useNavigate } from 'react-router-dom';



function Sidebar() {
    const navigate = useNavigate();
    const handleNav =(nav) =>{
        navigate(nav);
    }
    return (
      <div className="Sidebar">
          <ul className="SidebarList">
              {SidebarData.map((value,index)=>(
                  <li key={index} 
                      id={window.location.pathname === value.link ? 'active' : ''}
                      className="row" onClick={()=> {
                        handleNav(value.link)
                  }}>
                      <div className='icon'>{value.icon}</div>
                      <div id='title'>{value.title}</div>
                  </li>
              ))}
              
          </ul>
      </div>
    )
  }
  
  export default Sidebar