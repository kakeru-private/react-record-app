import {createSlice} from '@reduxjs/toolkit';

export const user = createSlice({
    name:'user',
    initialState:{
        uid:undefined,
        username:undefined           
    },
    reducers:{
        signin:(state,action) =>{
            console.log(action.payload.uid)
            const uid=action.payload.uid
            const username=action.payload.username
            
        },
        signout:(state)=>{
            const uid=undefined
            const username=undefined    
        }
    }
});

export const {signin,signout} = user.actions

export default user.reducer;