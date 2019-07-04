const initialState ={
    chats:[],
    contacts:[]
};

const ChatReducer = (state = initialState, action) => {
    
    if(action.type == 'setContactList'){
        //alert('Retorno: '+action.payload.status);
        return {...state, contacts:action.payload.users};
    }
    
    return state;
    
    /* if(action.type == 'changeStatus'){
        //alert('Retorno: '+action.payload.status);
        return {...state, status:action.payload.status};
    } */

    
};

export default ChatReducer;