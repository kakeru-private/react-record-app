import React, { useEffect, useRef, useState } from 'react'
import './css/Table.css'
import SearchIcon from '@mui/icons-material/Search';
import Delete from '@mui/icons-material/DeleteForever';
import AddBoxIcon from '@mui/icons-material/AddBox';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import AncLink from '../components/AncLink';



function Book() {
  const api = 'https://react-record-todo.herokuapp.com/';
  const date = new Date();
  const time = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
  const initialValues = {isbn:'',title:'',author:'',publisher:'',site:'',release_date:time};
  const [formValues,setFormValues] = useState(initialValues);
  const [value, setValue] = useState([]);
    const [ins,setIns] = useState(0);
    const [search, setSearch] = useState([]);


    const Dref = useRef();
    const Sref = useRef();
    const word = useRef();

    const handleSearch =() =>{
      setSearch(value.filter((book) => book.title.toLowerCase().includes(word.current.value.toLowerCase()) || book.author.toLowerCase().includes(word.current.value.toLowerCase())
      || book.publisher.toLowerCase().includes(word.current.value.toLowerCase())|| book.site.toLowerCase().includes(word.current.value.toLowerCase())));
    }

    const handledate= (e) => {
      e.preventDefault();
      console.log(Dref.current.value);
      console.log(Sref.current.value);
      Dref.current.value === 'recent' ?  
        Sref.current.value === 'asc' ? 
          setSearch([...value].sort((a,b) => a.book_id - b.book_id)) : setSearch([...value].sort((a,b) => b.book_id - a.book_id)) 
        :
        Sref.current.value === 'asc' ? 
          setSearch([...value].sort((a,b) => Date.parse(a.release_date) - Date.parse(b.release_date))) : setSearch([...value].sort((a,b) => Date.parse(b.release_date) - Date.parse(a.release_date))) 
      

    }



    const handleEdi = (e,book_id) =>{
      console.log(book_id);
      const id = search.findIndex((element)=>element.book_id === book_id);
      console.log(search[id].title);
      if(id !== undefined && search[id].title !== ''){
        fetch(api+'/api/book/edit',{
          method:'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(
            {
              'book_id':`${book_id}`,
              'isbn':`${search[id].isbn}`,
              'title':`${search[id].title}`,
              'release_date':`${search[id].release_date}`,
              'author':`${search[id].author}`,
              'publisher':`${search[id].publisher}`,
              'site':`${search[id].site}`,
            },
          )
        })
        .then((res) => res.json())
        .then((data) => data);

        setIns(ins+1);
          
      }
    }
    

    const handleDel = (e,book_id) =>{
      console.log(book_id);
      const id = search.findIndex((element)=>element.book_id === book_id);

      if(id !== undefined){
        fetch(api+'/api/book/delete',{
          method:'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(
            {'book_id':`${book_id}`,},
          )
        })
        .then((res) => res.json())
        .then((data) => data);

        setIns(ins+1);
      }
      

    }

    const handleTEdit=(e,book_id)=>{
      const id = book_id;
      /*setSearch(value.map((data) => (data.book_id === id ? : data)));*/
      setSearch([...search].map(({title,release_date,book_id,author,fk_uid,site,isbn,publisher}) =>
       (book_id === id ? 
        {'book_id':book_id,'isbn':isbn,'title':e.target.value,'author':author,'publisher':publisher,'site':site,'release_date':release_date,'fk_uid':fk_uid} 
        :
        {'book_id':book_id,'isbn':isbn,'title':title,'author':author,'publisher':publisher,'site':site,'release_date':release_date,'fk_uid':fk_uid} )))
    }

    const handleAEdit=(e,book_id)=>{
      const id = book_id;
      /*setSearch(value.map((data) => (data.book_id === id ? : data)));*/
      setSearch([...search].map(({title,release_date,book_id,author,fk_uid,site,isbn,publisher}) =>
      (book_id === id ? 
       {'book_id':book_id,'isbn':isbn,'title':title,'author':e.target.value,'publisher':publisher,'site':site,'release_date':release_date,'fk_uid':fk_uid} 
       :
       {'book_id':book_id,'isbn':isbn,'title':title,'author':author,'publisher':publisher,'site':site,'release_date':release_date,'fk_uid':fk_uid} )))
      
    }

    const handleREdit=(e,book_id)=>{
      const id = book_id;
      /*setSearch(value.map((data) => (data.book_id === id ? : data)));*/
      setSearch([...search].map(({title,release_date,book_id,author,fk_uid,site,isbn,publisher}) =>
      (book_id === id ? 
       {'book_id':book_id,'isbn':isbn,'title':title,'author':author,'publisher':publisher,'site':site,'release_date':e.target.value,'fk_uid':fk_uid} 
       :
       {'book_id':book_id,'isbn':isbn,'title':title,'author':author,'publisher':publisher,'site':site,'release_date':release_date,'fk_uid':fk_uid} )))
    
    }

    const handlePEdit=(e,book_id)=>{
      const id = book_id;
      /*setSearch(value.map((data) => (data.book_id === id ? : data)));*/
      setSearch([...search].map(({title,release_date,book_id,author,fk_uid,site,isbn,publisher}) =>
      (book_id === id ? 
       {'book_id':book_id,'isbn':isbn,'title':title,'author':author,'publisher':e.target.value,'site':site,'release_date':release_date,'fk_uid':fk_uid} 
       :
       {'book_id':book_id,'isbn':isbn,'title':title,'author':author,'publisher':publisher,'site':site,'release_date':release_date,'fk_uid':fk_uid} )))
    
    }

    const handleIEdit=(e,book_id)=>{
      const id = book_id;
      /*setSearch(value.map((data) => (data.book_id === id ? : data)));*/
      setSearch([...search].map(({title,release_date,book_id,author,fk_uid,site,isbn,publisher}) =>
      (book_id === id ? 
       {'book_id':book_id,'isbn':e.target.value,'title':title,'author':author,'publisher':publisher,'site':site,'release_date':release_date,'fk_uid':fk_uid} 
       :
       {'book_id':book_id,'isbn':isbn,'title':title,'author':author,'publisher':publisher,'site':site,'release_date':release_date,'fk_uid':fk_uid} )))
    
    }

    const handleSEdit=(e,book_id)=>{
      const id = book_id;
      /*setSearch(value.map((data) => (data.book_id === id ? : data)));*/
      setSearch([...search].map(({title,release_date,book_id,author,fk_uid,site,isbn,publisher}) =>
      (book_id === id ? 
       {'book_id':book_id,'isbn':isbn,'title':title,'author':author,'publisher':publisher,'site':e.target.value,'release_date':release_date,'fk_uid':fk_uid} 
       :
       {'book_id':book_id,'isbn':isbn,'title':title,'author':author,'publisher':publisher,'site':site,'release_date':release_date,'fk_uid':fk_uid} )))
    
    }

    const handleChange = (e) =>{
      console.log(e.target.name);
      const {name,value} = e.target;
      setFormValues({...formValues,[name]:value});
      console.log(formValues);
    }
  
    const handleSubmit= (e) =>{
      
      console.log('submit');
      if(formValues.title !== '' && formValues.author !== ''){
        
        const title = formValues.title;
        const isbn = formValues.isbn;
        const publisher = formValues.publisher;
        const site = formValues.site;
        var release_date = formValues.release_date;
        const author = formValues.author;
        if(release_date === ''){
          release_date = time;
        } 
        fetch(api+'/api/book/add',{
          method:'POST',
          headers:{'Content-Type': 'application/json'},
          body: JSON.stringify(
            {
              'isbn':`${isbn}`,
              'title':`${title}`,
              'release_date':`${release_date}`,
              'author':`${author}`,
              'publisher':`${publisher}`,
              'site':`${site}`,
            },
            
            )
        })
        .then((res) => res.json())
        .then((data) => data)
          setIns(ins+1);
      }

      
      setFormValues({book:'',release_date:time,author:''});
      
    };
  

   
    

    useEffect(() => {
      
      fetch(api+'/api/book')
      .then((res) => res.json())
      .then((data) => {
        return (
          setValue(data) ,
          setSearch(data),
          word.current.value=''
        )});
      
    }, [ins])

  return (
    <div className='top'>
     
        
        
    <h1 className='title'>BOOK</h1>
      
    <AncLink />
    
    <div className='tableContainer'>
      
      <div className='mainBody'>
        
        <div className='searchContainer'>

          <div id='search'>
              <SearchIcon  id='icon'/>
          </div>

          <div className='input'>
            <input id='searchForm' type='text' className='as' ref={word} onChange={()=>handleSearch()} placeholder='検索ワードを入力してください' /> 
          </div>

        </div>

        <div className='Container'>
        <h2 >BOOKリスト</h2>
                    <div className='centerContainer'>
            <div className='sortContainer'>
              <div className='sort'>
                <select name='date' ref={Dref} onChange={(e)=>handledate(e)}>
                  <option value='recent'>登録日</option>
                  <option value='update'>発売日 </option>
                </select>

                <select name='date' ref={Sref} onChange={(e)=>handledate(e)}>
                  <option value='asc'>昇順</option>
                  <option value='desc'>降順</option>
                </select>
              </div>

            </div>
        

          <table className='dataContainer' id='main'>
          <tbody>
            <tr className='hfont'>
              <th >ID <hr /></th>
              <th>タイトル<hr /></th>
              <th >著者<hr/></th>
              <th >出版社<hr/></th>
              <th>ISBN<hr/></th>
              <th>発売日<hr/></th>
              <th>購入媒体・サイト<hr/></th>
              <th><hr/></th>
              <th><hr/></th>
            </tr>
            </tbody>

            
              {search.map(({title,release_date,book_id,author,publisher,site,isbn})=> (
              
              <tbody>
                <tr key={book_id}>
                  <td>
                    {book_id}
                    <hr />
                  </td>
                  <td>
                  <input type='text' value={title} className='todoForm dataForm' onChange={(e)=>{handleTEdit(e,book_id)}}/>
                    <hr />
                  </td>

                  <td>
                  <input type='text' value={author} className='todoForm dataForm' onChange={(e)=>{handleAEdit(e,book_id)}}/>
                    <hr />
                  </td>
                  
                  <td>
                  <input type='text' value={publisher} className='todoForm dataForm' onChange={(e)=>{handlePEdit(e,book_id)}}/>
                    <hr />
                  </td>
                  
                  <td>
                  <input type='text' value={isbn} className='todoForm dataForm' onChange={(e)=>{handleIEdit(e,book_id)}}/>
                    <hr />
                  </td>

                  <td >
                  <input type='date' value={release_date} className='todoForm dataForm' onChange={(e)=>{handleREdit(e,book_id)}}/>
                    <hr />
                  </td>
                  <td>
                  <input type='text' value={site} className='todoForm dataForm' onChange={(e)=>{handleSEdit(e,book_id)}}/>
                    <hr />
                  </td>

                  
                  
                  <td ><button><SaveAsIcon id='icon' onClick={(e)=>handleEdi(e,book_id)} /></button><hr /></td>
                  
                  <td ><button><Delete id='icon' onClick={(e)=>handleDel(e,book_id)}/></button><hr /></td>
                
                </tr>
                </tbody>
                
              ))}
                <br/><br/>
                
               
                <tr id='add'>
                  
                  <td></td>
                  <td className='hfont'>BOOKの追加<hr /></td>
                  <td><hr /></td>
                  <td><hr /></td>
                  <td><hr /></td>
                  <td><hr /></td>
                  <td><hr /></td>
                  <td><hr /></td>
                  <td><hr /></td>
                </tr>
                
                <tr>
                  
                  <td></td>
                  <td>
                    <input type='text' placeholder='title not null' className='todoForm dataForm' name='title' onChange={(e)=>handleChange(e) } value={formValues.title}/>  
                    <hr />
                  </td>
                  <td>
                    <input type='text' placeholder='author not null' className='todoForm dataForm' name='author' onChange={(e)=>handleChange(e)} value={formValues.author}/>
                    <hr />
                  </td>
                  <td>
                    <input type='text' placeholder='publisher' className='todoForm dataForm' name='publisher' onChange={(e)=>handleChange(e)} value={formValues.publisher}/>
                    <hr />
                  </td>
                  <td>
                    <input type='text' placeholder='ISBN' className='todoForm dataForm' name='isbn' onChange={(e)=>handleChange(e)} value={formValues.isbn}/>
                    <hr />
                  </td>
                  <td>
                    <input type='date' name='release_date' className='todoForm dataForm'onChange={(e)=>handleChange(e)} defaultValue={time}/>
                    <hr />
                  </td>
                  <td>
                    <input type='text' placeholder='site' className='todoForm dataForm' name='site' onChange={(e)=>handleChange(e)} value={formValues.site}/>
                    <hr />
                  </td>
                  <td><hr /></td>
                  <td>
                    <button><AddBoxIcon  id='icon' onClick={(e)=>(handleSubmit(e))} /></button>
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

export default Book