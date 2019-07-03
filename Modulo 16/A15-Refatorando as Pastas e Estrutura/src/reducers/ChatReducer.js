const initialState ={
    chats:[],
    contacts:[]
};

const ChatReducer = (state = initialState, action) => {
    
    if(action.type == 'setContactList'){
        //alert('Retorno: '+action.payload.status);
        return {...state, users:action.payload.usres};
    }
    
    /* if(action.type == 'changeStatus'){
        //alert('Retorno: '+action.payload.status);
        return {...state, status:action.payload.status};
    } */

    return state;
    
};

export default ChatReducer;