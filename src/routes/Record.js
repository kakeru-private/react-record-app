import React, { useEffect, useRef, useState } from 'react'
import './css/Table.css'
import SearchIcon from '@mui/icons-material/Search';
import Delete from '@mui/icons-material/DeleteForever';
import AddBoxIcon from '@mui/icons-material/AddBox';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AncLink from '../components/AncLink';



function Record() {
  const date = new Date();
  const time = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
  const initialValues = {title:'',release_date:time,artist:'',record_num:'',numOfTrack:1,site:''};
  const [formValues,setFormValues] = useState(initialValues);
  const [trackForm,setTrackForm] = useState([]);
  const [value, setValue] = useState([]);
    const [ins,setIns] = useState(0);
    const [search, setSearch] = useState([]);
    const [track,setTrack] = useState([]);
    const [trackEdi, setTrackEdi] = useState([]);
    const api = 'https://react-record-todo.herokuapp.com/';
    
  
    
    const Dref = useRef();
    const Sref = useRef();
    const word = useRef();

    const [click,setClick] = useState(-1);
    const contentEl = useRef();

    const handleclick = (index) =>{
      if(click === index){
        return setClick(-1);
      }
      setClick(index);
     
    }

    const handleSearch =() =>{
      setSearch(value.filter((record) => record.title.toLowerCase().includes(word.current.value.toLowerCase()) || record.artist.toLowerCase().includes(word.current.value.toLowerCase()) 
      || record.record_num.toLowerCase().includes(word.current.value.toLowerCase()) || record.site.toLowerCase().includes(word.current.value.toLowerCase())));
    }

    const handledate= (e) => {
      e.preventDefault();
      console.log(Dref.current.value);
      console.log(Sref.current.value);
      Dref.current.value === 'recent' ?  
        Sref.current.value === 'asc' ? 
          setSearch([...value].sort((a,b) => a.record_id - b.record_id)) : setSearch([...value].sort((a,b) => b.record_id - a.record_id)) 
        :
        Dref.current.value === 'update' ? 
        Sref.current.value === 'asc' ? 
          setSearch([...value].sort((a,b) => Date.parse(a.release_date) - Date.parse(b.release_date))) : setSearch([...value].sort((a,b) => Date.parse(b.release_date) - Date.parse(a.release_date))) 
        :
        Sref.current.value === 'asc' ? 
          setSearch([...value].sort((a,b) => a.numOfTrack - b.numOfTrack)) : setSearch([...value].sort((a,b) => b.numOfTrack - a.numOfTrack))
      console.log(search);

    }



    const handleEdi = (e,record_id) =>{
      
      const id = search.findIndex((element)=>element.record_id === record_id);
      console.log(search[id].record);
      if(id !== undefined &&  search[id].title !== '' &&  search[id].artist !== ''){
        var release_date = search[id].release_date;
        if(release_date === ''){
          release_date = value[id].release_date;
        }
        if(release_date === ''){
          release_date = time;
        }
        fetch(api+'/api/record/edit',{
          method:'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(
            {
              'record_id':`${record_id}`,
              'title':`${search[id].title}`,
              'release_date':`${search[id].release_date}`,
              'artist':`${search[id].artist}`,
              'record_num':`${search[id].record_num}`,
              'numOfTrack':`${search[id].numOfTrack}`,
              'site':`${search[id].site}`
            },
          )
        })
        .then((res) => res.json())
        .then((data) => data);

        setIns(ins+1);
          
      }
    }
    

    const handleDel = (e,record_id) =>{
      console.log(record_id);
      const id = search.findIndex((element)=>element.record_id === record_id);

      if(id !== undefined){
        fetch(api+'/api/record/delete',{
          method:'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(
            {'record_id':`${record_id}`,},
          )
        })
        .then((res) => res.json())
        .then((data) => data);

        setIns(ins+1);
      }
      

    }

    const handleTEdit=(e,record_id)=>{
      const id = record_id;
      /*setSearch(value.map((data) => (data.record_id === id ? : data)));*/
      setSearch([...search].map(({record_num,release_date,record_id,title,artist,numOfTrack,site,fk_uid}) =>
      (record_id === id ?
        {'record_id':record_id,'title':e.target.value,'release_date':release_date,'artist':artist,'record_num':record_num,'numOfTrack':numOfTrack,'site':site,'fk_uid':fk_uid} 
       :
        {'record_id':record_id,'title':title,'release_date':release_date,'artist':artist,'record_num':record_num,'numOfTrack':numOfTrack,'site':site,'fk_uid':fk_uid}
      )))
    }

    const handleAEdit=(e,record_id)=>{
      const id = record_id;
      /*setSearch(value.map((data) => (data.record_id === id ? : data)));*/
      setSearch([...search].map(({record_num,release_date,record_id,title,artist,numOfTrack,site,fk_uid}) =>
      (record_id === id ?
        {'record_id':record_id,'title':title,'release_date':release_date,'artist':e.target.value,'record_num':record_num,'numOfTrack':numOfTrack,'site':site,'fk_uid':fk_uid} 
       :
        {'record_id':record_id,'title':title,'release_date':release_date,'artist':artist,'record_num':record_num,'numOfTrack':numOfTrack,'site':site,'fk_uid':fk_uid}
      )))
    }

    const handleNEdit=(e,record_id)=>{
      const id = record_id;
      /*setSearch(value.map((data) => (data.record_id === id ? : data)));*/
      setSearch([...search].map(({record_num,release_date,record_id,title,artist,numOfTrack,site,fk_uid}) =>
      (record_id === id ?
        {'record_id':record_id,'title':title,'release_date':release_date,'artist':artist,'record_num':record_num,'numOfTrack':e.target.value,'site':site,'fk_uid':fk_uid} 
       :
        {'record_id':record_id,'title':title,'release_date':release_date,'artist':artist,'record_num':record_num,'numOfTrack':numOfTrack,'site':site,'fk_uid':fk_uid}
      )))
    }

    const handleSEdit=(e,record_id)=>{
      const id = record_id;
      /*setSearch(value.map((data) => (data.record_id === id ? : data)));*/
      setSearch([...search].map(({record_num,release_date,record_id,title,artist,numOfTrack,site,fk_uid}) =>
      (record_id === id ?
        {'record_id':record_id,'title':title,'release_date':release_date,'artist':artist,'record_num':record_num,'numOfTrack':numOfTrack,'site':e.target.value,'fk_uid':fk_uid} 
       :
        {'record_id':record_id,'title':title,'release_date':release_date,'artist':artist,'record_num':record_num,'numOfTrack':numOfTrack,'site':site,'fk_uid':fk_uid}
      )))
    }

    const handleDEdit=(e,record_id)=>{
      const id = record_id;
      /*setSearch(value.map((data) => (data.record_id === id ? : data)));*/
      setSearch([...search].map(({record_num,release_date,record_id,title,artist,numOfTrack,site,fk_uid}) =>
      (record_id === id ?
        {'record_id':record_id,'title':title,'release_date':e.target.value,'artist':artist,'record_num':record_num,'numOfTrack':numOfTrack,'site':site,'fk_uid':fk_uid} 
       :
        {'record_id':record_id,'title':title,'release_date':release_date,'artist':artist,'record_num':record_num,'numOfTrack':numOfTrack,'site':site,'fk_uid':fk_uid}
      )))
        
      
    }

    const handleREdit=(e,record_id)=>{
      const id = record_id;
      /*setSearch(value.map((data) => (data.record_id === id ? : data)));*/
      setSearch([...search].map(({record_num,release_date,record_id,title,artist,numOfTrack,site,fk_uid}) =>
      (record_id === id ?
        {'record_id':record_id,'title':title,'release_date':release_date,'artist':artist,'record_num':e.target.value,'numOfTrack':numOfTrack,'site':site,'fk_uid':fk_uid} 
       :
        {'record_id':record_id,'title':title,'release_date':release_date,'artist':artist,'record_num':record_num,'numOfTrack':numOfTrack,'site':site,'fk_uid':fk_uid}
      )))
        
      
    }

    const handleChange = (e) =>{
      const {name,value} = e.target;
      setFormValues({...formValues,[name]:value});
      console.log(formValues);
    }
  
    const handleSubmit= (e) =>{
      
      console.log('submit');
      if(formValues.record !== ''){
        
        const title = formValues.title;
        var release_date = formValues.release_date;
        const artist = formValues.artist;
        const record_num = formValues.record_num;
        const numOfTrack = formValues.numOfTrack;
        const site = formValues.site;
        if(release_date === ''){
          release_date = time;
        } 
        fetch(api+'/api/record/add',{
          method:'POST',
          headers:{'Content-Type': 'application/json'},
          body: JSON.stringify(
            {
              'title':`${title}`,
              'release_date':`${release_date}`,
              'artist':`${artist}`,
              'record_num':`${record_num}`,
              'numOfTrack':`${numOfTrack}`,
              'site':`${site}`,
            },
            
            )
        })
        .then((res) => res.json())
        .then((data) => data)
          setIns(ins+1);
      }

      
      setFormValues({record:'',release_date:time,remarks:''});
      
    };
  

        const handleTrackA=(e,record_id)=>{

        //const id = search[index].record_id;
        /*setSearch(value.map((data) => (data.record_id === id ? : data)));*/
        setTrackForm([...trackForm].map(({title,artist,fk_rid}) =>
        (
          record_id === fk_rid ?
          {'title':title,'artist':e.target.value,'fk_rid':fk_rid}
         :
          {'title':title,'artist':artist,'fk_rid':fk_rid} 
          
          
        )))
        
        };

        const handleTrackT=(e,record_id)=>{
          //const id = search[index].record_id;
          /*setSearch(value.map((data) => (data.record_id === id ? : data)));*/
          setTrackForm([...trackForm].map(({title,artist,fk_rid}) =>
          (record_id === fk_rid ?
            {'title':e.target.value,'artist':artist,'fk_rid':fk_rid} 
          :
          {'title':title,'artist':artist,'fk_rid':fk_rid} 
          
          
          )))
          
      };

      const handleTrackAdd=(e,index)=>{
      
            if(trackForm[index].title !== '' && trackForm[index].artist !== ''){
              fetch(api+'/api/track/add',{
                method:'post',
                headers: {
                  'Content-Type': 'application/json'
                },
                body:JSON.stringify(
                  {
                    'title':`${trackForm[index].title}`,
                    'artist':`${trackForm[index].artist}`,
                    'fk_rid':`${trackForm[index].fk_rid}`,
                  },
                )
              })
              .then((res) => res.json())
              .then((data) => data);

              setIns(ins+1);
            }

      }

      const handleTrackTEdit=(e,track_id)=>{
        
        const id = track_id
        /*setSearch(value.map((data) => (data.record_id === id ? : data)));*/
        setTrackEdi([...trackEdi].map(({title,artist,fk_rid,track_id,fk_uid}) =>
          (id === track_id ?
            {'track_id':track_id,'title':e.target.value,'artist':artist,'fk_rid':fk_rid,'fk_uid':fk_uid} 
          :
            {'track_id':track_id,'title':title,'artist':artist,'fk_rid':fk_rid,'fk_uid':fk_uid} 
          )
        )) 
      }

      const handleTrackAEdit=(e,track_id)=>{
        const id = track_id
        /*setSearch(value.map((data) => (data.record_id === id ? : data)));*/
        setTrackEdi([...trackEdi].map(({title,artist,fk_rid,track_id,fk_uid}) =>
          (id === track_id ?
            {'track_id':track_id,'title':title,'artist':e.target.value,'fk_rid':fk_rid,'fk_uid':fk_uid} 
          :
            {'track_id':track_id,'title':title,'artist':artist,'fk_rid':fk_rid,'fk_uid':fk_uid} 
          )
        )) 
      }
    
      const handleTEdi=(e,track_id)=>{
        const id = trackEdi.findIndex((element)=>element.track_id === track_id);

        if(id !== undefined && trackEdi[id].title !== '' && trackEdi[id].artist !== ''){
          fetch(api+'/api/track/edit',{
            method:'post',
            headers: {
              'Content-Type': 'application/json'
            },
            body:JSON.stringify(
              {
                'track_id':`${trackEdi[id].track_id}`,
                'title':`${trackEdi[id].title}`,
                'artist':`${trackEdi[id].artist}`,
                'fk_rid':`${trackEdi[id].fk_rid}`,
              },
            )
          })
          .then((res) => res.json())
          .then((data) => data);

          setIns(ins+1);
        }
      } 

      const handleTDel=(e,track_id)=>{
        const id = trackEdi.findIndex((element)=>element.track_id === track_id);
        if(id !== undefined){
          fetch(api+'/api/track/delete',{
            method:'post',
            headers: {
              'Content-Type': 'application/json'
            },
            body:JSON.stringify(
              {
                'track_id':`${trackEdi[id].track_id}`,
              },
            )
          })
          .then((res) => res.json())
          .then((data) => data);

          setIns(ins+1);
        }
      }

    useEffect(() => {
      
      fetch(api+'/api/record')
      .then((res) => res.json())
      .then((data) => {
        
        
        return (
          setValue(data[0]) ,
          setSearch(data[0]),
          setTrack(data[1]) ,
          setTrackEdi(data[1]),
          setTrackForm(data[2]),
          word.current.value=''
        )});
          
    }, [ins])

  return (
      <div className='top'>
        
        
        
        <h1 className='title'>RECORD</h1>
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
            <h2 >RECORDリスト</h2>
              <div className='centerContainer'>
                <div className='sortContainer'>

                  <div className='sort'>
                    <select name='date' ref={Dref} onChange={(e)=>handledate(e)}>
                      <option value='recent'>登録日</option>
                      <option value='update'>発売日</option>
                      <option value='num'>曲数</option>
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
                  <th><hr /></th>
                  <th >RECORD ID<hr /></th>
                  <th >タイトル<hr /></th>
                  <th >アーティスト<hr /></th>
                  <th>曲数<hr /></th>
                  <th>レコードナンバー<hr /></th>
                  <th>発売日<hr /></th>
                  <th>購入媒体・サイト<hr /></th>
                  <th><hr /></th>
                  <th><hr /></th>
                  
                </tr>
                </tbody>

                
                  {search.map(({record_num,release_date,record_id,title,artist,numOfTrack,site},index)=> {
                    
                    return (
                     
                    <tbody>
                    <tr key={record_id}>
                      
                      <td>
                        
                          <KeyboardArrowUpIcon onClick={()=>handleclick(record_id)} className={`${record_id === click ? 'reverse' : ''}`}/>
                          <hr />
                        
                      </td>
                      
                      <td>
                        {record_id}
                        <hr />
                      </td>
                      <td>
                      <input type='text' value={title} className='todoForm dataForm' onChange={(e)=>{handleTEdit(e,record_id)}}/>
                        <hr />
                    
                      </td>

                      <td>
                      <input type='text' value={artist} className='todoForm dataForm' onChange={(e)=>{handleAEdit(e,record_id)}}/>
                        <hr />
                    
                      </td>
                      <td>

                      <input type='number' value={numOfTrack} className='todoForm dataForm' onChange={(e)=>{handleNEdit(e,record_id)}} min='1'/>
                        <hr />
                    
                      </td>

                      <td>
                      <input type='text' value={record_num} className='todoForm dataForm' onChange={(e)=>{handleREdit(e,record_id)}}/>
                        <hr />
                    
                      </td>
                      
                      <td >
                      <input type='date' value={release_date} className='todoForm dataForm' onChange={(e)=>{handleDEdit(e,record_id)}}/>
                        <hr />
                      </td>

                      <td>
                      <input type='text' value={site} className='todoForm dataForm' onChange={(e)=>{handleSEdit(e,record_id)}}/>
                        <hr />
                      </td>
                      
                      <td ><button className='ed'><SaveAsIcon id='icon' onClick={(e)=>handleEdi(e,record_id)} /></button><hr /></td>
                      
                      <td ><button className='del'><Delete id='icon' onClick={(e)=>handleDel(e,record_id)}/></button><hr /></td>
                      
                    </tr>

                      <tr 
                          ref={contentEl} 
                          style={
                            click === record_id
                              ? {
                                  height:50,
                                
                                }
                              : { 
                                display:"none",
                                width:"100%" 
                                }
                          }>
                              <td></td>
                              <td>TRACK ID<hr /></td>
                              <td>TRACK タイトル<hr /></td>
                              <td>TRACK アーティスト<hr /></td>
                              <td><hr /></td>
                              <td><hr /></td>
                              <td><hr /></td>
                              <td><hr /></td>
                              <td><hr /></td>
                              <td><hr /></td>
                          </tr>

                    
                    
                      {trackEdi.map(({track_id,tTitle,fk_rid,artist})=>{
                      if(fk_rid === record_id ){
                        return(
                          <tr key={track_id} 
                          ref={contentEl} 
                          style={
                            click === fk_rid
                              ? {
                                  height:50,
                                
                                }
                              : { 
                                display:"none",
                                width:"100%" 
                                }
                          }>
                        
                          <td></td>
                       
                          <td className='track '>
                            {track_id}
                            <hr />
                          </td>

                          <td>
                            <input type='text' className='track todoForm dataForm' value={tTitle} onChange={(e)=>handleTrackTEdit(e,track_id)}/>
                            <hr />
                          </td>

                          <td>
                            <input type='text' className='track todoForm dataForm' value={artist} onChange={(e)=>handleTrackAEdit(e,track_id)}/>
                            <hr />
                          </td>

                          <td><hr /></td>
                          <td><hr /></td>
                          <td><hr /></td>
                          <td><hr /></td>

                          <td ><button><SaveAsIcon onClick={(e)=>handleTEdi(e,track_id)} /></button><hr /></td>
                
                          <td ><button><Delete onClick={(e)=>handleTDel(e,track_id)}/></button><hr /></td>
                            
                          
                        </tr>
                          
                              
                            
                    )}})}
                     
                     <tr>
                          <td></td>
                          
                          <td className='font'>TRACK add<hr /></td>
                          <td>
                            <input type='text' name='title' placeholder='TRACK title not null' value={trackForm[index].title} className='track todoForm dataForm' onChange={(e)=>handleTrackT(e,record_id)}/>
                            <hr />
                          </td>
                          <td>
                            <input type='text' name='artist' placeholder='TRACK artist not null' value={trackForm[index].artist} className='track todoForm dataForm' onChange={(e)=>handleTrackA(e,record_id)}/>
                            <hr />
                          </td>
                          <td><hr /></td>
                          <td><hr /></td>
                          <td><hr /></td>
                          <td><hr /></td>
                          <td><hr /></td>
                          <td>
                            <button><AddBoxIcon onClick={(e)=>handleTrackAdd(e,index)}/></button>
                            <hr />
                          </td>
                      </tr>
                     
                      </tbody>
                    
                    )})}

                   
                    <br/><br/>
                    
                    
                    <tr>
                      <td></td>
                      <td></td>
                      <td className='hfont'>RECORDの追加<hr /></td>
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
                      <td></td>
                      <td>
                        <input type='text' className='todoForm dataForm' placeholder='title not null' name='title' onChange={(e)=>handleChange(e) } value={formValues.title}/>
                        <hr />
                      </td>
                      <td>
                        <input type='text' className='todoForm dataForm' placeholder='artist not null' name='artist' onChange={(e)=>handleChange(e) } value={formValues.artist}/>
                        <hr />
                      </td>
                      <td>
                        <input type='number' className='todoForm dataForm' placeholder='numOfTrack' name='numOfTrack' onChange={(e)=>handleChange(e) } value={formValues.numOfTrack} min='1'/>
                        <hr />
                      </td>
                      <td>
                        <input type='text' className='todoForm dataForm' placeholder='record_num' name='record_num' onChange={(e)=>handleChange(e) } value={formValues.record_num}/>
                        <hr />
                      </td>
                      <td>
                        <input type='date' className='todoForm dataForm' name='release_date' onChange={(e)=>handleChange(e)} value={formValues.release_date} />
                        <hr />
                      </td>
                      <td>
                        <input type='text' className='todoForm dataForm' placeholder='site' name='site' onChange={(e)=>handleChange(e)} value={formValues.site}/>
                        <hr />
                      </td>
                      <td><hr /></td>
                      <td>
                        <button><AddBoxIcon  id='icon' className='addicon' onClick={(e)=>(handleSubmit(e))}/></button>
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

export default Record