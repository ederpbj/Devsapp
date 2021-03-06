import firebase from '../FirebaseConnection';
//Pega lista de conversas do usuário logado
export const getChatList = ( userUid, callBack) => {
    return(dispatch) => {
        //uma unica vez, ideal, para este app
        //firebase.database().ref('users').orderByChild('name').once('value').then((snapshot) =>{
        
        firebase.database().ref('users').child(userUid).child('chats').on('value', (snapshot)=>{
            //limpa lista
            let chats = [];

            //pega as chaves dos chats
            snapshot.forEach((childItem)=>{
                chats.push({
                    key:childItem.key,
                    title:childItem.val().title
                });
            });

            //Setar o callback
            callBack();

            dispatch({
                type:'setChatList',
                payload:{
                    chats:chats
                }
            });

        });
        
    };
};

//Ativar um chat
export const setActiveChat = (chatId) => {
    return {
        type: 'setActiveChat',
        payload:{
            chatid:chatId
        }
    };
};

//Pegar lista de usuários do firebase
export const getContactList = ( userUid, callBack ) => {
    return(dispatch) => {
        //firebase.database().ref('users').on('value', ()=>{ //em tempo real
        
        //uma unica vez, ideal, para este app
        firebase.database().ref('users').orderByChild('name').once('value').then((snapshot) =>{
            
            //Limpa a lista
            let users = [];
            
            //Pega as informações no db
            snapshot.forEach((childItem) =>{

                //menos o usuário logado
                if(childItem.key != userUid){
                    users.push({
                        key:childItem.key,
                        name:childItem.val().name
                    });
                }
            });

            callBack();
            
            dispatch({
                type:'setContactList',
                payload:{
                    users:users
                }
            });
        });
    };
};

export const createChat = (userUid1, userUid2) =>{
    return (dispatch) => {

        //Criando proprio CHAT
        let newChat = firebase.database().ref('chats').push();
        newChat.child('members').child(userUid1).set({
            id:userUid1
        });
        
        newChat.child('members').child(userUid2).set({
            id:userUid2
        });

        //Associando aos envolvidos
        let chatId = newChat.key;

        //Pegar nome do usuário 2, para exibir na tela
        firebase.database().ref('users').child(userUid2).once('value').then((snapshot)=>{

            //Entra no db, seleciona usuário 1, e seta a informação
            firebase.database().ref('users').child(userUid1).child('chats')
                .child(chatId).set({
                    id:chatId,
                    title:snapshot.val().name
                });

        });
        
        //Pegar nome do usuário 1, para exibir na tela
        firebase.database().ref('users').child(userUid1).once('value').then((snapshot)=>{
        
            //Entra no db, seleciona usuário 2,
            firebase.database().ref('users').child(userUid2).child('chats')
                .child(chatId).set({
                    id:chatId,
                    title:snapshot.val().name
                });

        });

        dispatch({
            type:'setActiveChat',
            payload:{
                chatid:chatId
            }
        });
    }
};

export const sendImage = (blob, progressCallback, successCallback) => {
    return (dispatch) => {
        //Cria um key imaginário
        let tmpKey = firebase.database().ref('chats').push().key;

        //alert("Key gerado "+tmpKey);

        //Usa key imaginário para salvar no firebase, no nó image
        let fbimage = firebase.storage().ref().child('images').child(tmpKey);

        //alert("Começando upload...");
        
        fbimage.put(blob, {contentType:'image/jpeg'})
        //Olheiro
            .on('state_changed', 

            progressCallback,

            (error)=>{
                alert(error.code);
            },
            ()=>{
                successCallback( tmpKey );
            })
        
        //Se der tudo certo
            /* Não precisa 
            .then(()=>{
                alert("Upload finalizado!");       
                callback(tmpKey);

            })
            .catch((error)=>{
                alert(error.code);
            });
             */
    }
}

//Envia as mensagens para db
export const sendMessage = (msgType, msgContent, author, activeChat) => {
    return (dispatch) => {
        
        //Salvar informações no Banco de dados
        let currentDate = '';
        let cDate = new Date();

        //YYYY-MM-DD HH:ii:SS
        currentDate = cDate.getFullYear()+'-'+(cDate.getMonth()+1)+'-'+cDate.getDate();
        currentDate +=' ';
        currentDate += cDate.getHours()+':'+cDate.getMinutes()+':'+cDate.getSeconds();

        let msgId = firebase.database().ref('chats').child(activeChat).child('messages').push();
        
        switch (msgType) {
            case 'text':
                msgId.set({
                    msgType:'text',
                    cdate:currentDate,
                    m:msgContent,
                    uid:author
                });
                break;

            case 'image':
                msgId.set({
                    msgType:'image',
                    cdate:currentDate,
                    imgSource:msgContent,
                    uid:author
                });
                break;
        
            default:
                break;
        }


    };
};

//Monitor após início da conversa
//Manda para reduces para: activeChatMessages:[]
export const monitorChat = (activeChat) => {
    return (dispatch) => {

        //Olheiro para mensagens do firebase
        firebase.database().ref('chats').child(activeChat).child('messages').orderByChild('cdate').on('value', (snapshot)=>{
            let arrayMsg = [];

            //Pega e preparar mensagens do firebase
            snapshot.forEach((childItem)=>{
                switch (childItem.val().msgType) {
                    case 'text':
                        arrayMsg.push({
                            key:childItem.key,
                            cdate:childItem.val().cdate,
                            //msgType:childItem.val().msgType, //ou
                            msgType:'text',
                            m:childItem.val().m,
                            uid:childItem.val().uid
                        });
                        break;
        
                    case 'image':
                        arrayMsg.push({
                            key:childItem.key,
                            cdate:childItem.val().cdate,
                            msgType:'image',
                            imgSource:childItem.val().imgSource,
                            uid:childItem.val().uid
                        });
                        break;
                
                    default:
                        break;
                }


                
            });

            //Manda para chatReducer
            dispatch({
                type:'setActiveChatMessage',
                payload:{
                    'msgs':arrayMsg
                }
            });
        });
    };
};

export const monitorChatOff = (activeChat) => {
    return (dispatch) => {
        
        //Desativar o olheiro
        firebase.database().ref('chats').child(activeChat).child('messages').off();
    };
};

/* 
export const signInAction = (email, password) => {
    return (dispatch) => {
        //Criando usuário
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((user)=>{

                //Pega uid
                let uid = firebase.auth().currentUser.uid;

                //Salvar dispatch no reducer
                dispatch({
                    type:'changeUid',
                    payload:{
                        uid:uid
                    }
                });
            })
            .catch((error)=>{
                switch (error.code) {
                    case 'auth/invalid-email':
                        alert("Email inválido!");
                        break;

                    case 'auth/user-disabled':
                        alert("Seu usuário está desativado!");
                        break;

                    case 'auth/user-not-found':
                        alert("Não existe este usuário!");
                        break;

                    case 'auth/wrong-password':
                        alert("E-mail e/ou senha inválidos!");
                        break;
                
                    default:
                        break;
                }
            })
    }
}
 */

/* 
export const changePassword = (password) => {
    return {
        type:'changePassword',
        payload:{
            password:password
        }
    };
};
 */