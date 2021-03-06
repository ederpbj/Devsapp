const initialState ={
    chats:[],
    contacts:[],
    activeChat:''
};

const ChatReducer = (state = initialState, action) => {
    
    if(action.type == 'setContactList'){
        //alert('Retorno: '+action.payload.status);
        return {...state, contacts:action.payload.users};
    }
    
    if(action.type == 'setActiveChat'){
        return {...state, activeChat:action.payload.chatid};
    }
    
    return state;
    
    
};

export default ChatReducer;