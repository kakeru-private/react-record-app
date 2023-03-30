import {createSlice} from '@reduxjs/toolkit';

export const user = createSlice({
    name:'user',
    initialState:{
        uid:null,
        username:null           
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
                uid:null,
                username:null
            })
        }
    }
});

export const {signin,signout} = user.actions

export default user.reducer;