import './css/SignUp.css'
import React, { useState } from 'react';
function ChangePass() {
  const initialValues = {username:'',mailaddress:'',password:''};
  const [formValues,setFormValues] = useState(initialValues);
  const [formErrors,setFormErrors] = useState({});
  const [isSubmit,setIsSubmit] = useState(false);
  const [sucMsg,setSucMsg] = useState('');
  const api = 'https://react-record-todo.herokuapp.com';

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
    console.log(isSubmit);
    console.log(formErrors.length);
  };

  const handleLogin =()=>{

  
    const name = formValues.username;
    const mail = formValues.mailaddress;
    const password = formValues.password;
    fetch(api+'/api/users/changepass',{
      method:'POST',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify(
        {
          name:name,
          mail:mail,
          password:password
        }
        
        ),
        mode: 'no-cors'
    })
    .then((res) => res.json())
    .then((data) => {
      return(

        data.message !==  'success' ?
         setFormErrors({...formErrors,password:'usernameまたはemailが間違っています'}) 
         : 
         (setSucMsg('変更が完了しました'),
         setFormValues(initialValues),
         setTimeout(()=>{
          window.location.reload('/users')
         },1*1000))
        
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
    <div className='changePass formCont'>
      
    
    <div className="formContainer">
      <form onSubmit={(e)=>(handleSubmit(e))}>
        <h1 className='formTitle'>Change Password form</h1>
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
            <label>new password</label>
            <input type='password' placeholder='password' name='password' onChange={(e)=>handleChange(e)} value={formValues.password}/>
          </div>
          <p className='errorMsg'>{formErrors.password}</p>
          <button className='submitButton'>submit</button>
          {Object.keys(formErrors).length === 0 && isSubmit ? handleLogin():''}
          <p className='suc'>{sucMsg}</p>
        </div>
      </form>
    </div>
    </div>
  );


}


export default ChangePass