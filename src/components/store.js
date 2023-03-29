import {createSlice} from '@reduxjs/toolkit';

export const store = createSlice({
    name:'user',
    initialState:{
        uid:undefined,
        username:undefined           
    },
    reducers:{
        signin(state,action) {
            state.push({
                uid:action.payload.uid,
                username:action.payload.username
            })
        },
        signout(state){
            state.push({
                uid:undefined,
                username:undefined
            })
        }
    }
});

export const {signin,signout} = store.actions

export default store.reducer;