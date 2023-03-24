import React, { useEffect, useRef, useState } from 'react'
import './css/Table.css'
import SearchIcon from '@mui/icons-material/Search';
import Delete from '@mui/icons-material/DeleteForever';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AncLink from '../components/AncLink';


function Track() {
    const [value, setValue] = useState([]);
    const [ins,setIns] = useState(0);
    const [search, setSearch] = useState([]);
    const [rid,setRid] = useState([]);
    const initialValues = {title:'',fk_rid:0,artist:''};
    const [formValues,setFormValues] = useState(initialValues);
  
    const Dref = useRef();
    const Sref = useRef();
    const word = useRef();
    const api = 'https://react-record-todo.herokuapp.com';

    const handleSearch =() =>{
      setSearch(value.filter((track) => track.title.toLowerCase().includes(word.current.value.toLowerCase()) || track.artist.toLowerCase().includes(word.current.value.toLowerCase()) 
      || track.tTitle.toLowerCase().includes(word.current.value.toLowerCase())));
    }

    const handledate= (e) => {
      e.preventDefault();
      console.log(Dref.current.value);
      console.log(Sref.current.value);
      Dref.current.value === 'recent' ?  
        Sref.current.value === 'asc' ? 
          setSearch([...value].sort((a,b) => a.track_id - b.track_id)) : setSearch([...value].sort((a,b) => b.track_id - a.track_id)) 
        :
        Sref.current.value === 'asc' ? 
        setSearch([...value].sort((a,b) => a.fk_rid - b.fk_rid)) : setSearch([...value].sort((a,b) => b.fk_rid - a.fk_rid)) 
        

    }



    

    const handleTEdit=(e,track_id)=>{
      const id = track_id;
      /*setSearch(value.map((data) => (data.track_id === id ? : data)));*/
      setSearch([...search].map(({title,track_id,tTitle,artist,fk_rid}) =>
      (track_id === id ?
        {'track_id':track_id,'title':title,'artist':artist,'tTitle':e.target.value,'fk_rid':fk_rid} 
       :
        {'track_id':track_id,'title':title,'artist':artist,'tTitle':tTitle,'fk_rid':fk_rid} 
      )))
    }

    const handleAEdit=(e,track_id)=>{
      const id = track_id;
      /*setSearch(value.map((data) => (data.track_id === id ? : data)));*/
      setSearch([...search].map(({title,track_id,tTitle,artist,fk_rid}) =>
      (track_id === id ?
        {'track_id':track_id,'title':title,'artist':e.target.value,'tTitle':tTitle,'fk_rid':fk_rid} 
       :
       {'track_id':track_id,'title':title,'artist':artist,'tTitle':tTitle,'fk_rid':fk_rid} 
      )))
    }

    
    const handleEdi = (e,track_id) =>{
      
      const id = search.findIndex((element)=>element.track_id === track_id);
      
      if(id !== undefined &&  search[id].title !== '' &&  search[id].artist !== ''){
        fetch(api+'/track/edit',{
          method:'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(
            {
                'track_id':`${search[id].track_id}`,
                'title':`${search[id].title}`,
                'artist':`${search[id].artist}`,
                'fk_rid':`${search[id].fk_rid}`,
            },
          ),
          mode: 'no-cors'
        })
        .then((res) => res.json())
        .then((data) => data);

        setIns(ins+1);
          
      }
    }
    

    const handleDel = (e,track_id) =>{
      const id = search.findIndex((element)=>element.track_id === track_id);

      if(id !== undefined){
        fetch(api+'/track/delete',{
          method:'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(
            {'track_id':`${track_id}`,},
          ),
          mode: 'no-cors'
        })
        .then((res) => res.json())
        .then((data) => data);

        setIns(ins+1);
      }
      

    }

    const handleChange = (e) =>{
      const {name,value} = e.target;
      setFormValues({...formValues,[name]:value});
    }
  
    const handleTrackAdd=(e)=>{
      const id = rid.indexOf((element)=>element.record_id === formValues.fk_rid);
      if(formValues.title !== '' && formValues.artist !== '' && id !== undefined){
        
        fetch(api+'/track/add',{
          method:'POST',
          headers:{'Content-Type': 'application/json'},
          body: JSON.stringify(
            {
              'title':`${formValues.title}`,
              'artist':`${formValues.artist}`,
              'fk_rid':`${formValues.fk_rid}`
            },
            
            ),
            mode: 'no-cors'
        })
        .then((res) => res.json())
        .then((data) => data)
          setIns(ins+1);
          
      }

      setFormValues(initialValues);
   
    }

    const handleSChange=(e)=>{
      setFormValues({...formValues,fk_rid:e.target.value});
    }

    useEffect(() => {
      
      fetch(api+'/track',{
        mode: 'no-cors'
      })
      .then((res) => res.json())
      .then((data) => {
        
        
        return (
          setValue(data[0]) ,
          setSearch(data[0]),
          setRid(data[1]),
          word.current.value=''
        )});
          
    }, [ins])

  return (
      <div className='top'>
        
        
        
        <h1 className='title'>TRACK</h1>
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
            <h2 >trackリスト</h2>
              <div className='centerContainer'>
                <div className='sortContainer'>

                  <div className='sort'>
                    <select name='date' ref={Dref} onChange={(e)=>handledate(e)}>
                      <option value='recent'>登録日</option>
                      <option value='record'>レコードID</option>
                    </select>
                    <select name='date' ref={Sref} onChange={(e)=>handledate(e)}>
                      <option value='asc'>昇順</option>
                      <option value='desc'>降順</option>
                    </select>
                  </div>

                </div>
            

              <table className='dataContainer'>
              <tbody >
                <tr className='hfont'>
                  <th >TRACK ID<hr /></th>
                  <th >RECORD ID<hr /></th>
                  <th>レコード名<hr /></th>
                  <th >タイトル<hr /></th>
                  <th >アーティスト<hr /></th>
                  
                  <th><hr /></th>
                  <th><hr /></th>
                  
                </tr>
                </tbody>

                
                  {search.map(({track_id,tTitle,artist,title,fk_rid})=> (
                     
                    <tbody>
                    <tr key={track_id}>
                      
                      <td>
                        {track_id}
                        <hr />
                      </td>

                      <td>
                        {fk_rid}
                        <hr />
                      </td>

                      <td>
                      <p className='todoForm dataForm'>{title}</p>
                        <hr />
                    
                      </td>

                      <td>
                      <input type='text' value={tTitle} className='todoForm dataForm' onChange={(e)=>{handleTEdit(e,track_id)}}/>
                        <hr />
                    
                      </td>

                      <td>
                      <input type='text' value={artist} className='todoForm dataForm' onChange={(e)=>{handleAEdit(e,track_id)}}/>
                        <hr />
                    
                      </td>

                      
                      
                      

                      
                      
                      <td ><button><SaveAsIcon id='icon' onClick={(e)=>handleEdi(e,track_id)} /></button><hr /></td>
                      
                      <td ><button><Delete id='icon' onClick={(e)=>handleDel(e,track_id)}/></button><hr /></td>
                      
                    </tr>

                    
                    
                       
                    </tbody>     
                  ))}
                     
                     <br/><br/>
                    
                    
                    <tr>
                      <td></td>
                      <td></td>
                      <td className='hfont'>TRACKの追加<hr /></td>
                      <td><hr /></td>
                      <td><hr /></td>
                      <td><hr /></td>
                      <td><hr /></td>
                      
                    </tr>

                    <tr>
                      <td></td>
                      <td></td>
                      <td>
                      <select name='fk_rid' className='todoForm dataForm' onChange={(e)=>handleSChange(e)}>
                          <option value='0' hidden>選択してください</option>
                          {rid.map(({record_id,title})=>(
                            <option value={record_id}>RECORD id:{record_id} RECORD:{title}</option>
                          ))}
                        </select>
                        <hr />
                      </td>
                      <td>
                        <input type='text' name='title' placeholder='title not null' value={formValues.title} className='todoForm dataForm' onChange={(e)=>handleChange(e)}/>
                        <hr />
                      </td>
                      <td>
                      <input type='text' name='artist' placeholder='artist not null' value={formValues.artist} className='todoForm dataForm' onChange={(e)=>handleChange(e)}/>
                        <hr />
                      </td>
                      <td><hr /></td>
                      <td>
                        <button><AddBoxIcon onClick={(e)=>handleTrackAdd(e)}/></button>
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

export default Track