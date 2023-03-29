import './css/SignUp.css'
import React, { useState } from 'react';
import { useSelector,useDispatch } from "react-redux";

function SignOut() {
  const [sucMsg,setSucMsg] = useState('');
  const [misMsg,setMisMsg] = useState('');
  const uid = useSelector((state) => state.uid);
  const dispatch = useDispatch();
  const setUid = () => {
    dispatch({type:'signout'});
  }

  const handleSubmit= (e) =>{
    e.preventDefault();
    if(uid === undefined){
      setMisMsg('サインインしていません')
    }else{
      setSucMsg('サインアウトしました')
      setUid()
      setTimeout(()=>{
        window.location.reload('/users')
      },1*500)
    }
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