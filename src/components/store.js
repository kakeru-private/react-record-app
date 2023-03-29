import {createStore} from 'redux';

const initState = {
    uid:undefined,
    username:undefined
                
};

const reducer = (state = initState,action) =>{
    switch(action.type){
        case 'signin':
            state.uid = action.payload.uid
            state.username = action.payload.username
        case 'signout':
            state.uid=undefined
            state.username=undefined
            
        default:
            state;
    }
    
};

const store = createStore(reducer);

export default store;