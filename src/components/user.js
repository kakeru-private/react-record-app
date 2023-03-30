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
            state.users.uid=action.payload.uid
            state.users.username=action.payload.username
            
        },
        signout:(state)=>{
            state.users.uid=undefined
            state.users.username=undefined    
        }
    }
});

export const {signin,signout} = user.actions

export default user.reducer;