import './css/SignUp.css'
import React, { useContext, useState } from 'react';
import {uidContext} from '../App'

function SignOut() {
  const [sucMsg,setSucMsg] = useState('');
  const [misMsg,setMisMsg] = useState('');
  const {uid,setUid} = useContext(uidContext);

  const handleSubmit= (e) =>{
    e.preventDefault();
    
      uid ===  undefined ? 
      (
        setMisMsg('サインインしていません')
      )
      : 
      (
        setSucMsg('サインアウトしました'),
        setUid(undefined),
        setTimeout(()=>{
          window.location.reload('/users')
        },1*500)
      )
     
    
  };

  return (
    <div className='singout formCont' >
      
    
    <div className="formContainer">
      <form onSubmit={(e)=>(handleSubmit(e))}>
        <h1  className='formTitle'>Sign Out</h1>
        <hr />
        <div className='uiForm'>
          <button className='submitButton'>Sign Out</button>
          <p className='suc'>{sucMsg}</p>
          <p className='err'>{misMsg}</p>
        </div>
        
      </form>
    </div>
    </div>
  );


}


export default SignOut