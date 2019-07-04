import firebase from '../FirebaseConnection';

//Pegar lista de usuparios do firebase
export const getContactList = () => {
    return(dispatch) => {
        //firebase.database().ref('users').on('value', ()=>{ //em tempo real
        
        //uma unica vez, ideal, para este app
        firebase.database().ref('users').once('value').then((snapshot) =>{
            
            //Limpa a lista
            let users = [];
            
            //Pega as informações no db
            snapshot.forEach((childItem) =>{
                users.push({
                    key:childItem.key,
                    name:childItem.val().name
                });
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