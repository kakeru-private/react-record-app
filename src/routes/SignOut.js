import './css/SignUp.css'
import React, { useState } from 'react';


function SignOut() {
  const [sucMsg,setSucMsg] = useState('');
  const [misMsg,setMisMsg] = useState('');
  
  const handleSubmit= (e) =>{
    e.preventDefault();
    fetch('https://react-record-todo.herokuapp.com/users/signout',{
        method:'POST',mode:'cors',credentials: 'include',
        headers:{'Content-Type': 'text/plain'},
        
      })
      .then((res) => res.json())
      .then((data) => {
        return(
          data.message !==  'success' ? 
          setMisMsg('サインインしていません')
           : 
          setSucMsg('サインアウトしました'),
          console.log(data),
          setTimeout(()=>{
            window.location.reload('/users')
          },1*500)
        )
      })
    
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