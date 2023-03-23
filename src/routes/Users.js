import React, { useRef, useState } from 'react'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import './css/Table.css';
import SignUp from './SignUp';
import SignIn from './SignIn';
import ChangePass from './ChangePass';
import Delete from './Delete';
import SignOut from './SignOut';

function Users() {
  const [click,setClick] = useState(-1);
  const contentEl = useRef();

  const handleclick = (index) =>{
    if(click === index){
      return setClick(-1);
    }
    setClick(index);
    console.log(contentEl);
  }

  return (
    <div className='top'>
      <h1 className='title'>login/account</h1>
      <div className='tab'>
        <div className='SignIn'>
          <div className='acc'>
            <KeyboardArrowUpIcon onClick={()=>handleclick(1)} className={`${1 === click ? 'reverse' : ''}`}/>Sign In
          </div>
          <div ref={contentEl} className='nam'
            style={
              click === 1
                ? {
                    height: 500,
                    backgroundColor: "#739db8",
                  }
                : { height: "0px", overflow: "hidden" }
            }>
             <SignIn />

          </div>
        </div >
        <div className='SignUp'>
          <div className='acc'>
            <KeyboardArrowUpIcon onClick={()=>handleclick(2)} className={`${2 === click ? 'reverse' : ''}`}/>Sign Up
          </div>
          <div ref={contentEl} className='nam'
            style={
              click === 2
                ? {
                    height: 500,
                    backgroundColor: "#739db8",
                  }
                : { height: "0px", overflow: "hidden" }
            }>
              <SignUp />
          </div>
        </div>
        <div className='passchange'>
          <div className='acc'>
            <KeyboardArrowUpIcon onClick={()=>handleclick(3)} className={`${3 === click ? 'reverse' : ''}`}/>Change Password
          </div>
          <div ref={contentEl}  className='nam'
            style={
              click === 3
                ? {
                    height: 500,
                    backgroundColor: "#739db8",
                  }
                : { height: "0px", overflow: "hidden" }
            }>
              <ChangePass/>
          </div>
        </div>
        <div className='SignOut'>
          <div className='acc'>
            <KeyboardArrowUpIcon onClick={()=>handleclick(4)} className={`${4 === click ? 'reverse' : ''}`}/>Sign Out
          </div>
          <div ref={contentEl} className='nam'
            style={
              click === 4
                ? {
                    height: 500,
                    backgroundColor: "#739db8",
                  }
                : { height: "0px", overflow: "hidden" }
            }>
              <SignOut />
          </div>

        </div>

        <div className='Delete'>
          <div className='acc'>
            <KeyboardArrowUpIcon onClick={()=>handleclick(5)} className={`${5 === click ? 'reverse' : ''}`}/>Delete Account
          </div>
          <div ref={contentEl} className='nam'
            style={
              click === 5
                ? {
                    height: 500,
                    backgroundColor: "#739db8",
                  }
                : { height: "0px", overflow: "hidden" }
            }>
              <Delete />
          </div>

        </div>
      </div>
      
    </div>  
  )
}

export default Users