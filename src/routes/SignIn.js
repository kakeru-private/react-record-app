import './css/SignUp.css'
import React, {  useState } from 'react';
import { useNavigate } from 'react-router-dom';


function SignIn() {
  const initialValues = {username:'',password:''};
  const [formValues,setFormValues] = useState(initialValues);
  const [formErrors,setFormErrors] = useState({});
  const [isSubmit,setIsSubmit] = useState(false);
  const navigate = useNavigate();
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
    
  };

  const handleLogin =()=>{

  
    const name = formValues.username;
    const password = formValues.password;
    fetch(api+'/api/users/signin',{
      method:'POST',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify(
        {
          name:name,
          password:password
        }
        
        )
    })
    .then((res) => res.json())
    .then((data) => {
      return(

        data.message !==  'success' ? setFormErrors({...formErrors,password:'usernameまたはpasswordが間違っています'}) : (setFormValues(initialValues),navigate('/'))
        
      )
    })

    setIsSubmit(false);
    console.log(formErrors);
  }

  /*{isSubmit ? handleLogin():''}*/
  const validate =(values)=>{
    
    const errors = {};

    
    if(!values.username){
      errors.username='ユーザー名を入力してください';
    }



    if(!values.password){
      errors.password='パスワードを入力してください';
    }

    
    //console.log(errors)

    return errors;
  }

  return (
    <div className='singin formCont'>
      
    
    <div className="formContainer">
      <form onSubmit={(e)=>(handleSubmit(e))}>
        <h1  className='formTitle'>Sign In form</h1>
        <hr />
        <div className='uiForm'>
          <div className='formField'>
            <label>user name</label>
            <input type='text' placeholder='user name' name='username' onChange={(e)=>handleChange(e)} value={formValues.username}/>
          </div>
          <p className='errorMsg'>{formErrors.username}</p>
          <div className='formField'>
            <label>password</label>
            <input type='password' placeholder='password' name='password' onChange={(e)=>handleChange(e)} value={formValues.password}/>
          </div>
          <p className='errorMsg'>{formErrors.password}</p>
          <button className='submitButton'>SignIn</button>
          {Object.keys(formErrors).length === 0 && isSubmit ? handleLogin():''}
        </div>
      </form>
    </div>
    </div>
  );


}


export default SignIn