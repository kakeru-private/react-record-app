import React, { useEffect, useRef, useState } from 'react'
import './css/Table.css'
import SearchIcon from '@mui/icons-material/Search';
import Delete from '@mui/icons-material/DeleteForever';
import AddBoxIcon from '@mui/icons-material/AddBox';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import AncLink from '../components/AncLink';
import { useSelector } from "react-redux";

function Todo() {
    const date = new Date();
    const time = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0,16);
    const initialValues = {todo:'',deadline:time,remarks:''};
    const [formValues,setFormValues] = useState(initialValues);
    const init = [{todo:'',deadline:time,todo_id:'',remarks:'',fk_uid:''}];
    const [value, setValue] = useState(init);
    const [ins,setIns] = useState(0);
    const [search, setSearch] = useState(init);
    const uid = useSelector((state) => state.users.uid);

    
    const Dref = useRef();
    const Sref = useRef();
    const word = useRef();

    const handleSearch =() =>{
      setSearch(value.filter((todo) => todo.todo.toLowerCase().includes(word.current.value.toLowerCase()) || todo.remarks.toLowerCase().includes(word.current.value.toLowerCase())));
    }

    const handledate= (e) => {
      e.preventDefault();
      console.log(Dref.current.value);
      console.log(Sref.current.value);
      Dref.current.value === 'recent' ?  
        Sref.current.value === 'asc' ? 
          setSearch([...value].sort((a,b) => a.todo_id - b.todo_id)) : setSearch([...value].sort((a,b) => b.todo_id - a.todo_id)) 
        :
        Sref.current.value === 'asc' ? 
          setSearch([...value].sort((a,b) => Date.parse(a.deadline) - Date.parse(b.deadline))) : setSearch([...value].sort((a,b) => Date.parse(b.deadline) - Date.parse(a.deadline))) 
      

    }



    const handleEdi = (e,todo_id) =>{
      console.log(todo_id);
      const id = search.findIndex((element)=>element.todo_id === todo_id);
      console.log(search[id].todo);
      if(id !== undefined &&  search[id].todo !== '' && uid !== undefined){
        var deadline = search[id].deadline;
        if(deadline === ''){
          deadline = value[id].deadline;
        }
        if(deadline === ''){
          deadline = time;
        }
        fetch('https://react-record-todo.herokuapp.com/todo/edit',{
          method:'POST',mode:'cors',credentials: 'include',
          headers: {
            'Accept':'application/json','Content-Type': 'application/json'
          },
          body:JSON.stringify(
            {
              'todo_id':`${todo_id}`,
              'todo':`${search[id].todo}`,
              'deadline':`${deadline}`,
              'remarks':`${search[id].remarks}`,
              'uid':`${uid}`,
            },
          )
          
        })
        .then((res) => res.json())
        .then((data) => data);

        setIns(ins+1);
          
      }
    }
    

    const handleDel = (e,todo_id) =>{
      console.log(todo_id);
      const id = search.findIndex((element)=>element.todo_id === todo_id);

      if(id !== undefined && uid !== undefined){
        fetch('https://react-record-todo.herokuapp.com/todo/delete',{
          method:'POST',mode:'cors',credentials: 'include',
          headers: {
            'Accept':'application/json','Content-Type': 'application/json'
          },
          body:JSON.stringify(
            {
              'todo_id':`${todo_id}`,
              'uid':`${uid}`,
            },
          )
          
        })
        .then((res) => res.json())
        .then((data) => data);

        setIns(ins+1);
      }
      

    }

    const handleTEdit=(e,todo_id)=>{
      const id = todo_id;
      /*setSearch(value.map((data) => (data.todo_id === id ? : data)));*/
      setSearch([...search].map(({todo,deadline,todo_id,remarks,fk_uid}) =>
       (todo_id === id ? {'todo_id':todo_id,'todo':e.target.value,'deadline':deadline,remarks:remarks,'fk_uid':fk_uid} :{'todo_id':todo_id,'todo':todo,'deadline':deadline,remarks:remarks,'fk_uid':fk_uid} )))
    }

    const handleDEdit=(e,todo_id)=>{
      const id = todo_id;
      /*setSearch(value.map((data) => (data.todo_id === id ? : data)));*/
      setSearch([...search].map(({todo,deadline,todo_id,remarks,fk_uid}) =>
       (todo_id === id ? {'todo_id':todo_id,'todo':todo,'deadline':e.target.value,remarks:remarks,'fk_uid':fk_uid} :{'todo_id':todo_id,'todo':todo,'deadline':deadline,remarks:remarks,'fk_uid':fk_uid} )))
        
      
    }

    const handleREdit=(e,todo_id)=>{
      const id = todo_id;
      /*setSearch(value.map((data) => (data.todo_id === id ? : data)));*/
      setSearch([...search].map(({todo,deadline,todo_id,remarks,fk_uid}) =>
       (todo_id === id ? {'todo_id':todo_id,'todo':todo,'deadline':deadline,remarks:e.target.value,'fk_uid':fk_uid} :{'todo_id':todo_id,'todo':todo,'deadline':deadline,remarks:remarks,'fk_uid':fk_uid} )))
        
      
    }

    const handleChange = (e) =>{
      console.log(e.target.name);
      const {name,value} = e.target;
      setFormValues({...formValues,[name]:value});
      console.log(formValues);
    }
  
    const handleSubmit= (e) =>{
      
      console.log('submit');
      if(formValues.todo !== '' && uid !== undefined){
        
        const todo = formValues.todo;
        var deadline = formValues.deadline;
        const remarks = formValues.remarks;
        if(deadline === ''){
          deadline = time;
        } 
        fetch('https://react-record-todo.herokuapp.com/todo/add',{
          method:'POST',mode:'cors',credentials: 'include',
          headers:{'Accept':'application/json','Content-Type': 'application/json'},
          body: JSON.stringify(
            {
              'todo':`${todo}`,
              'deadline':`${deadline}`,
              'remarks':`${remarks}`,
              'uid':`${uid}`,
            },
            
            )
            
        })
        .then((res) => res.json())
        .then((data) => data)
          setIns(ins+1);
      }

      
      setFormValues({todo:'',deadline:time,remarks:''});
      
    };
  
    useEffect(() => {
      fetch('https://react-record-todo.herokuapp.com/todo',{
          method:'POST',mode:'cors',credentials: 'include',
          headers: {
            'Accept':'application/json','Content-Type': 'application/json'
          },
          body: JSON.stringify(
            {
              'uid':`${uid}`,
            },
            
            )
        })
        .then((res) => res.json())
        .then((data) => {
          return (
            data.length > 0 ?
            (
              setValue(data) ,
              setSearch(data)
            )
            :
            (
              setValue(init) ,
              setSearch(init)
            ),
            
            word.current.value=''
          )})
      
      
      
    }, [ins])

  return (
      <div className='top'>
        
        
        
        <h1 className='title'>TODO</h1>
        <AncLink />
        
        <div className='tableContainer'>

          <div className='mainBody'>
            <div className='searchContainer'>

              <div id='search'>
                  <SearchIcon  id='icon'/>
              </div>

              <div className='input'>
                <input id='searchForm' className='as' type='text' ref={word} onChange={()=>handleSearch()} placeholder='検索ワードを入力してください' /> 
              </div>

            </div>

          

              
            <div className='Container'>
            <h2 >TODOリスト</h2>
                        <div className='centerContainer'>
                <div className='sortContainer'>
                  <div className='sort'>
                    <select name='date' ref={Dref} onChange={(e)=>handledate(e)}>
                      <option value='recent'>登録日</option>
                      <option value='update'>締め切り</option>
                    </select>

                    <select name='date' ref={Sref} onChange={(e)=>handledate(e)}>
                      <option value='asc'>昇順</option>
                      <option value='desc'>降順</option>
                    </select>
                  </div>

                </div>
            

              <table className='dataContainer'>
              <tbody>
                <tr className='hfont'>
                  <th >ID<hr /></th>
                  <th >todo<hr /></th>
                  <th >締め切り<hr /></th>
                  <th>備考<hr /></th>
                  <th><hr /></th>
                  <th><hr /></th>
                </tr>
                </tbody>

                
                  {search.map(({todo,deadline,todo_id,remarks})=> (
                  <tbody>
                    <tr key={todo_id}>
                      <td>
                        {todo_id}
                        <hr />
                      </td>
                      <td>
                      <input type='text' value={todo} className='todoForm dataForm' onChange={(e)=>{handleTEdit(e,todo_id)}}/>
                        <hr />
                    
                      </td>
                      
                      <td >
                      <input type='datetime-local' value={deadline} className='todoForm dataForm' onChange={(e)=>{handleDEdit(e,todo_id)}}/>
                        <hr />
                      </td>

                      <td>
                      <input type='text' value={remarks} className='todoForm dataForm' onChange={(e)=>{handleREdit(e,todo_id)}}/>
                        <hr />
                      </td>
                      
                      <td ><button className='ed'><SaveAsIcon id='icon' onClick={(e)=>handleEdi(e,todo_id)} /></button><hr /></td>
                      
                      <td ><button className='del'><Delete id='icon' onClick={(e)=>handleDel(e,todo_id)}/></button><hr /></td>
                    
                    </tr>
                    </tbody>
                  ))}

                    <br/><br/>
                    <tr>
                      <td></td>
                      <td className='hfont'>TODOの追加<hr /></td>
                      <td><hr /></td>
                      <td><hr /></td>
                      <td><hr /></td>
                      <td><hr /></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>
                        <input type='text ' className='todoForm dataForm' placeholder='TODO not null' name='todo'  onChange={(e)=>handleChange(e) } value={formValues.todo}/>
                        <hr />
                      </td>
                      <td>
                        <input type='datetime-local' className='todoForm dataForm' name='deadline' onChange={(e)=>handleChange(e)} value={formValues.deadline}/> 
                        <hr />
                      </td>
                      <td>
                        <input type='text'  className='todoForm dataForm' placeholder='remarks' name='remarks' onChange={(e)=>handleChange(e)} value={formValues.remarks}/>
                        <hr />
                      </td>
                      <td><hr /></td>
                      <td >
                        <button><AddBoxIcon  id='icon' onClick={(e)=>(handleSubmit(e))}/></button>
                        <hr />
                      </td>
                    </tr>
                 


                  
              </table>

            </div>
            </div>
              
            </div>
            
            
         
                    
          
        </div>
          
        
        </div>
        
      
      
      
        
    );
}

export default Todo