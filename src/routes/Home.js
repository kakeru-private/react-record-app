import React, { useEffect, useRef, useState } from 'react'
import AnchorLink from 'react-anchor-link-smooth-scroll';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector } from "react-redux";

function Home() {
  const tInit = [{todo:'',deadline:'',todo_id:'',remarks:''}];
  const mInit = [{memo:'',update_date:'',memo_id:''}];
  const [todoValue, setTodoValue] = useState(tInit);
  const [memoValue, setMemoValue] = useState(mInit);
  const [todoSearchValue, setTodoSearchValue] = useState(tInit);
  const [memoSearchValue, setMemoSearchValue] = useState(mInit);
  const uid = useSelector((state) => state.users.uid);
  const [ins, setIns] = useState(0);
  const [mlen,setmLen] = useState(false);
  const [tlen,settLen] = useState(false);


  const TDref = useRef();
  const TSref = useRef();
  const MDref = useRef();
  const MSref = useRef();
  const word = useRef();

  const handleSearch =() =>{
    setTodoSearchValue(todoValue.filter((todo) => todo.todo.toLowerCase().includes(word.current.value.toLowerCase())));
    setMemoSearchValue(memoValue.filter((memo) => memo.memo.toLowerCase().includes(word.current.value.toLowerCase())));
  }

  const handleMemo= (e) => {
    e.preventDefault();
    console.log(MDref.current.value);
    console.log(MSref.current.value);
    MDref.current.value === 'recent' ?  
      MSref.current.value === 'asc' ? 
      setMemoValue([...memoValue].sort((a,b) => a.memo_id - b.memo_id)) : setMemoValue([...memoValue].sort((a,b) => b.memo_id - a.memo_id)) 
      :
      MSref.current.value === 'asc' ? 
      setMemoValue([...memoValue].sort((a,b) => Date.parse(a.update_date) - Date.parse(b.update_date))) : setMemoValue([...memoValue].sort((a,b) => Date.parse(b.update_date) - Date.parse(a.update_date))) 
    

  }

  const handleTodo= (e) => {
    e.preventDefault();
    console.log(TDref.current.value);
    console.log(TSref.current.value);
    TDref.current.value === 'recent' ?  
      TSref.current.value === 'asc' ? 
      setTodoValue([...todoValue].sort((a,b) => a.todo_id - b.todo_id)) : setTodoValue([...todoValue].sort((a,b) => b.todo_id - a.todo_id)) 
      :
      TSref.current.value === 'asc' ? 
      setTodoValue([...todoValue].sort((a,b) => Date.parse(a.deadline) - Date.parse(b.deadline))) : setTodoValue([...todoValue].sort((a,b) => Date.parse(b.deadline) - Date.parse(a.deadline))) 
    

  }


  useEffect(() => {
    fetch('https://react-record-todo.herokuapp.com',{
      method:'POST',mode:'cors',credentials: 'include',
      headers: {
        'Content-Type': 'text/plain'
      },
      body:
        {
          'uid':`${uid}`,
        },
      
    })
    .then((res) => res.json())
    .then((data) => {
      if(data.message === 'connection err' && uid !== undefined){
        setTimeout(()=>{
          setIns(ins+1)
          setmLen(false)
          settLen(false)
        },1*500)
        
      }else if(data.length > 0){
        if(data[0].length > 0){
          setMemoValue(data[0])
          setMemoSearchValue(data[0])
          setmLen(true)
        }
        if(data[1].length > 0){
          setTodoValue(data[1])
          setTodoSearchValue(data[1])
          settLen(true)
        }
        
        
      }else{
        setMemoValue(mInit)
        setTodoValue(tInit)
        setMemoSearchValue(mInit)
        setTodoSearchValue(tInit)
        setmLen(false)
        settLen(false)
      }
      
        
        word.current.value=''
      })
      
  }, [ins])
    return(
      <div className='top'>
        <h1 id='top' className='title'>HOME</h1>
        <div className='anc'>
            <div className='ancin'>
              <ul>
                  <p>NAVIGATE</p>
                  <ol><AnchorLink href='#top' offset={100}>TOP</AnchorLink></ol>
                  <ol><AnchorLink href='#search' offset={100}>SEARCH</AnchorLink></ol>
                  <ol><AnchorLink href='#memo' offset={100}>MEMO</AnchorLink></ol>
                  <ol><AnchorLink href='#todo' offset={100}>TODO</AnchorLink></ol>
              </ul>
            </div>
        </div>
      
        <div className='mainCont'>
        <div className='searchContainer'>
            
            <div id='search'>
                <SearchIcon  id='icon'/>
            </div>
            <div className='input'>
              <input id='searchForm' className='as' type='text' ref={word} onChange={()=>handleSearch()} placeholder='検索ワードを入力してください' /> 
            </div>

          </div>
      <div className='tableContainer'>
        
      
      <div className='Container'>
      <h2 id='memo'>MEMOリスト</h2>
        <div className='memoHome'>

            <div className='centerContainer'>

              
            <div className='sortContainer'>
              <div className='sort'>
                <select name='date' ref={MDref} onChange={(e)=>handleMemo(e)}>
                  <option value='recent'>登録日</option>
                  <option value='update'>更新日</option>
                </select>

                <select name='date' ref={MSref} onChange={(e)=>handleMemo(e)}>
                  <option value='asc'>昇順</option>
                  <option value='desc'>降順</option>
                </select>
              </div>
            
            </div>
            
                

                  <table className='dataContainer'>
                  <tbody>
                    <tr>
                      <th>ID<hr /></th>
                      <th >メモ<hr /></th>
                      <th >更新日<hr /></th>
  
                    </tr>
                    </tbody>

                    <tbody>
                      {mlen ? memoSearchValue.map(({memo,update_date,memo_id})=> (
                      
                        <tr key={memo_id}>
                          <td>
                            {memo_id}
                            <hr />
                          </td>
                          <td>
                          <p className=' mmemoForm dataForm'>{memo}</p>
                            <hr />
                        
                          </td>
                          
                          <td className='date '>
                            {update_date}
                            <hr />
                          </td>
                          
                        </tr>
                        
                      )):''}
                      </tbody>
                  </table>
                  </div>
                
                
            </div>
            <div className='divi'>
              <hr />
            </div>
            <h2 id='todo'>TODOリスト</h2>
            <div className='todoHome'>

            
            
                        <div className='centerContainer'>
                <div className='sortContainer'>
                  <div className='sort'>
                    <select name='date' ref={TDref} onChange={(e)=>handleTodo(e)}>
                      <option value='recent'>登録日</option>
                      <option value='update'>締め切り</option>
                    </select>

                    <select name='date' ref={TSref} onChange={(e)=>handleTodo(e)}>
                      <option value='asc'>昇順</option>
                      <option value='desc'>降順</option>
                    </select>
                  </div>

                </div>


              <table className='dataContainer'>
              <tbody>
                <tr>
                  <th >ID<hr /></th>
                  <th >todo<hr /></th>
                  <th >締め切り<hr /></th>
                  <th>備考<hr /></th>
                </tr>
                </tbody>

                <tbody>
                  {tlen ? todoSearchValue.map(({todo,deadline,todo_id,remarks})=> (
                  
                    <tr key={todo_id}>
                      <td>
                        {todo_id}
                        <hr />
                      </td>
                      <td>
                      <p className='todoForm dataForm' >{todo}</p>
                        <hr />
                    
                      </td>
                      
                      <td >
                      {deadline}
                        <hr />
                      </td>

                      <td>
                      <p className='todoForm remarks dataForm' >{remarks}</p>
                        <hr />
                      </td>
                    
                    
                    </tr>
                    
                  )):''}
                  </tbody>
              </table>

            </div>

            </div>

            </div>
            
            
          </div>
                    
          
        </div>
        </div>
        
    )
}

export default Home