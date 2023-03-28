import React, { useEffect, useRef, useState } from 'react'
import './css/Table.css'
import SearchIcon from '@mui/icons-material/Search';
import Delete from '@mui/icons-material/DeleteForever';
import AddBoxIcon from '@mui/icons-material/AddBox';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import AncLink from '../components/AncLink';

function Memo() {
  const [value, setValue] = useState([]);
    const [ins,setIns] = useState(0);
    const [search, setSearch] = useState([]);
    const [add, setAdd] = useState('');
    const api = 'https://react-record-todo.herokuapp.com';
    const Dref = useRef();
    const Sref = useRef();
    const word = useRef();

    const handleSearch =() =>{
      setSearch(value.filter((memo) => memo.memo.toLowerCase().includes(word.current.value.toLowerCase())));
    }

    const handleChange =(e) =>{
      //console.log(e.target.name);
      setAdd(e.target.value);
      
      //console.log(formValues);
    }



    const handledate= (e) => {
      e.preventDefault();
      console.log(Dref.current.value);
      console.log(Sref.current.value);
      Dref.current.value === 'recent' ?  
        Sref.current.value === 'asc' ? 
          setSearch([...value].sort((a,b) => a.memo_id - b.memo_id)) : setSearch([...value].sort((a,b) => b.memo_id - a.memo_id)) 
        :
        Sref.current.value === 'asc' ? 
          setSearch([...value].sort((a,b) => Date.parse(a.update_date) - Date.parse(b.update_date))) : setSearch([...value].sort((a,b) => Date.parse(b.update_date) - Date.parse(a.update_date))) 
      

    }



    const handleEdi = (e,memo_id) =>{
      console.log(memo_id);
      const id = search.findIndex((element)=>element.memo_id === memo_id);
      console.log(search[id].memo);
      if(id !== undefined &&  search[id].memo !== ''){
        fetch('https://react-record-todo.herokuapp.com/memo/edit',{
          method:'POST',mode:'cors',credentials: 'include',
          headers: {
            'Accept':'application/json','Content-Type': 'application/json'
          },
          body:JSON.stringify(
            {
              'memo_id':`${memo_id}`,
              'memo':`${search[id].memo}`,
            },
          )
          
        })
        .then((res) => res.json())
        .then((data) => data);

        setIns(ins+1);
          
      }
    }
    

    const handleDel = (e,memo_id) =>{
      console.log(memo_id);
      const id = search.findIndex((element)=>element.memo_id === memo_id);

      if(id !== undefined){
        fetch('https://react-record-todo.herokuapp.com/memo/delete',{
          method:'POST',mode:'cors',credentials: 'include',
          headers: {
            'Accept':'application/json','Content-Type': 'application/json'
          },
          body:JSON.stringify(
            {'memo_id':`${memo_id}`,},
          )
          
        })
        .then((res) => res.json())
        .then((data) => data);

        setIns(ins+1);
      }
      

    }

    const handleTEdit=(e,memo_id)=>{
      //console.log(e.target.value)
      
      const id = memo_id;
      /*setSearch(value.map((data) => (data.memo_id === id ? : data)));*/
      setSearch(value.map(({memo,update_date,memo_id,fk_uid}) =>
       (memo_id === id ? {'memo_id':memo_id,'memo':e.target.value,'update_date':update_date,'fk_uid':fk_uid} :{'memo_id':memo_id,'memo':memo,'update_date':update_date,'fk_uid':fk_uid} )))
      
    }

    const handleAdd =() =>{
      if(add !== ''){
        
        fetch('https://react-record-todo.herokuapp.com/memo/add',{
          method:'POST',mode:'cors',credentials: 'include',
          headers: {
            'Accept':'application/json','Content-Type': 'application/json'
          },
          body:JSON.stringify(
            {'memo':`${add}`}
          )
          
        })
        .then((res) => res.json())
        .then((data) => data);
          console.log(add);
          setIns(ins+1);
          setAdd('');
          word.current.value='';
      }
      
    }

    useEffect(() => {
      
      fetch('https://react-record-todo.herokuapp.com/memo',{
        method:'GET',mode:'cors',credentials: 'include',
      })
      .then((res) => res.json())
      .then((data) => {
        return (
          setValue(data) ,
          setSearch(data)
        )});
      
    }, [ins])

  return (
      <div className='top'>
        
        
        
        <h1 id='top' className='title'>MEMO</h1>
        <AncLink/>
        
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
            
          
            
        
          </div>

          </div>


            <div className='Container'>

            <h2 id='main'>MEMOリスト</h2>
            

            
            <div className='centerContainer'>

              
            <div className='sortContainer'>
              <div className='sort'>
                <select name='date' ref={Dref} onChange={(e)=>handledate(e)}>
                  <option value='recent'>登録日</option>
                  <option value='update'>更新日</option>
                </select>

                <select name='date' ref={Sref} onChange={(e)=>handledate(e)}>
                  <option value='asc'>昇順</option>
                  <option value='desc'>降順</option>
                </select>
              </div>
            
            </div>
            
                

                  <table className='dataContainer' >
                  <tbody>
                    <tr className='hfont'>
                      <th>ID<hr /></th>
                      <th >メモ<hr /></th>
                      <th >更新日<hr /></th>
                      <th><hr /></th>
                      <th><hr /></th>
                    </tr>
                    </tbody>

                    
                      {search.map(({memo,update_date,memo_id})=> (
                      <tbody>
                        <tr key={memo_id}>
                          <td>
                            {memo_id}
                            <hr />
                          </td>
                          <td>
                          <input type='text' value={memo} className='memoForm dataForm' onChange={(e)=>{handleTEdit(e,memo_id)}}/>
                            <hr />
                        
                          </td>
                          
                          <td className='date '>
                            {update_date}
                            <hr />
                          </td>
                          
                          <td ><button className='ed'><SaveAsIcon id='icon' onClick={(e)=>handleEdi(e,memo_id)} /></button><hr /></td>
                          
                          <td ><button className='del'><Delete id='icon' onClick={(e)=>handleDel(e,memo_id)}/></button><hr /></td>
                        
                        </tr>
                        </tbody>
                      ))}
                     
                        <br/><br/>
                        <tr id='add'>
                          <td></td>
                          <td className='hfont'>MEMOの追加<hr /></td>
                          <td><hr /></td>
                          <td><hr /></td>
                          <td><hr /></td>
                        </tr>
                        <tr>
                          <td></td>
                          <td>
                            <input type='text' className='memoForm dataForm' placeholder='MEMO' onChange={(e)=>handleChange(e)} value={add}/>
                            <hr />
                          </td>
                          <td><hr /></td>
                          <td><hr /></td>
                          <td>
                            <button><AddBoxIcon onClick={()=>handleAdd()} id='icon' /></button>
                            <hr />
                          </td>
                        </tr>

                  </table>

                
                </div>         
            
            
            </div>
            
          
        
        </div>
        
      
      
      
        
    );
  
}

export default Memo