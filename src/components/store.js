import {createSlice} from '@reduxjs/toolkit';

export const store = createSlice({
    name:'user',
    initState:{
        uid:undefined,
        username:undefined           
    },
    reducers:{
        signin:(state) =>{
            state.uid = action.payload.uid,
            state.username = action.payload.username
        },
        signout:(state) =>{
            state.uid=undefined,
            state.username=undefined
        }
    }
});

export default store.reducer;