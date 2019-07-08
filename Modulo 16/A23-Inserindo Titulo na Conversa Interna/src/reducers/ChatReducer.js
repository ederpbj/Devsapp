const initialState ={
    chats:[],
    contacts:[],
    activeChat:'',
    activeChatTitle:''

};

const ChatReducer = (state = initialState, action) => {
    
    if(action.type == 'setChatList'){
        //alert('Retorno: '+action.payload.status);
        return {...state, chats:action.payload.chats};
    }
    
    if(action.type == 'setContactList'){
        //alert('Retorno: '+action.payload.status);
        return {...state, contacts:action.payload.users};
    }
    
    if(action.type == 'setActiveChat'){
        //Gera titulo para conversa interna, a partir do id contato
        let chatTitle = '';

        for(var i in state.chats){
            if(state.chats[i].key == action.payload.chatid){
                chatTitle = state.chats[i].title;
            }        }

        return {...state, activeChat:action.payload.chatid, activeChatTitle:chatTitle};
    }
    
    return state;
    
    
};

export default ChatReducer;