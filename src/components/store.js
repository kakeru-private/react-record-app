import {createSlice} from '@reduxjs/toolkit';

const store = createSlice({
    name:'user',
    initialState:{
        uid:undefined,
        username:undefined           
    },
    reducers:{
        signin(state,action) {
            state.uid = action.payload.uid,
            state.username = action.payload.username
        },
        signout(state){
            state.uid=undefined,
            state.username=undefined
        }
    }
});

export const {signin,signout} = store.actions

export default store.reducer;