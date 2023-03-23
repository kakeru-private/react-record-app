import './css/SignUp.css'
import React, { useState } from 'react';


function Delete() {
  const initialValues = {username:'',mailaddress:'',password:''};
  const [formValues,setFormValues] = useState(initialValues);
  const [formErrors,setFormErrors] = useState({});
  const [isSubmit,setIsSubmit] = useState(false);
  const [sucMsg,setSucMsg] = useState('');

  const handleSuc=()=>{
    const name = formValues.username;
    const mailaddress = formValues.mailaddress;
    const password = formValues.password;
    fetch('/api/users/delete',{
      method:'POST',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify(
        {
          name:name,
          mail:mailaddress,
          password:password
        }
        
        )
    })
    .then((res) => res.json())
    .then((data) => {
      return(
        setSucMsg('削除が完了しました'),
        setFormValues(initialValues),
        console.log(data),
        setTimeout(()=>{
          window.location.reload('/users')
        },1*500)
        
      )
    })
  }

  const handleChange = (e) =>{
    //console.log(e.target.name);
    const {name,value} = e.target;
    setFormValues({...formValues,[name]:value});
    //console.log(formValues);
  }

  const handleSubmit= (e) =>{
    e.preventDefault();
    
    setFormErrors(validate(formValues));
    
    setIsSubmit(true);
    
  };

  const handleLogin =()=>{

  
    const name = formValues.username;
    const mailaddress = formValues.mailaddress;
    const password = formValues.password;
    fetch('/api/users',{
      method:'POST',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify(
        {
          name:name,
          mail:mailaddress,
          password:password
        }
        
        )
    })
    .then((res) => res.json())
    .then((data) => {
      return(
        /*console.log(data.length),*/

        data.message === 'passmiss' ? setFormErrors({...formErrors,password:'emailかpasswordが間違っています'}) : data.message === 'notFound' ? setFormErrors({...formErrors,username:'そのusernameは存在しません'}): 
        handleSuc()
      )
    })

    setIsSubmit(false);
    console.log(formErrors);
  }

  /*{isSubmit ? handleLogin():''}*/
  const validate =(values)=>{
    
    const errors = {};
    const redex = /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;

    if(!values.username){
      errors.username='ユーザー名を入力してください';
    }

    if(!values.mailaddress){
      errors.mailaddress='メールアドレスを入力してください';
    }else if(!redex.test(values.mailaddress)){
      errors.mailaddress='正しいメースアドレスを入力してください';
    }


    if(!values.password){
      errors.password='パスワードを入力してください';
    }

    
    //console.log(errors)

    return errors;
  }

  return (
    <div className='delete formCont' >
      
    
    <div className="formContainer">
      <form onSubmit={(e)=>(handleSubmit(e))}>
        <h1  className='formTitle'>Delete form</h1>
        <hr />
        <div className='uiForm'>
          <div className='formField'>
            <label>user name</label>
            <input type='text' placeholder='user name' name='username' onChange={(e)=>handleChange(e)} value={formValues.username}/>
          </div>
          <p className='errorMsg'>{formErrors.username}</p>
          <div className='formField'>
            <label>email</label>
            <input type='text' placeholder='mailaddress' name='mailaddress' onChange={(e)=>handleChange(e)} value={formValues.mailaddress}/>
          </div>
          <p className='errorMsg'>{formErrors.mailaddress}</p>
          <div className='formField'>
            <label>password</label>
            <input type='password' placeholder='password' name='password' onChange={(e)=>handleChange(e)} value={formValues.password}/>
          </div>
          <p className='errorMsg'>{formErrors.password}</p>
          <button className='submitButton'>Delete</button>
          { isSubmit ? handleLogin():''}
          <p className='suc'>{sucMsg}</p>
        </div>
      </form>
    </div>
    </div>
  );


}


export default Delete