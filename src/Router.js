import {Routes,Route} from 'react-router-dom';
import Home from './routes/Home';
import Memo from './routes/Memo';
import Record from './routes/Record';
import Todo from './routes/Todo';
import Track from './routes/Track';
import Book from './routes/Book';
import Users from './routes/Users';
import React from 'react'

const Router=()=> {
  return (
    
        <Routes>
            <Route exact path='/'element={ <Home/>}/>
            <Route path='/book' element={ <Book/>}/>
            <Route path='/memo' element={ <Memo/>}/>
            <Route path='/record' element={ <Record/>}/>
            <Route path='/todo' element={ <Todo/>}/>
            <Route path='/track' element={ <Track/>}/>
            <Route path='/users' element={ <Users />}/>
        </Routes>
    
    
  )
}

export default Router