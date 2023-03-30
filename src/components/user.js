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
            state.uid=action.payload.uid
            state.username=action.payload.username
            
        },
        signout:(state)=>{
            state.uid=undefined
            state.username=undefined    
        }
    }
});

export const {signin,signout} = user.actions

export default user.reducer;