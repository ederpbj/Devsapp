import firebase from '../FirebaseConnection';

//Pegar lista de usuparios do firebase
export const getContactList = ( userUid) => {
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

        //Entra no db, seleciona usuário 1, e seta a informação
        firebase.database().ref('users').child(userUid1).child('chats')
            .child(chatId).set({
                id:chatId
            });
        
        firebase.database().ref('users').child(userUid2).child('chats')
            .child(chatId).set({
                id:chatId
            });

        dispatch({
            type:'setActiveChat',
            payload:{
                chatid:chatId
            }
        });
    }
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