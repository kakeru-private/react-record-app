import {createSlice} from '@reduxjs/toolkit';

export const user = createSlice({
    name:'user',
    initialState:{
        uid:null,
        username:null           
    },
    reducers:{
        signin:(state,action) =>{
            
            const uid=action.payload.uid
            const username=action.payload.username
            
        },
        signout:(state)=>{
            const uid=null
            const username=null    
        }
    }
});

export const {signin,signout} = user.actions

export default user.reducer;