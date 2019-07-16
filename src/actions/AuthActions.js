import firebase from '../FirebaseConnection';

export const SignOut = () => {
    firebase.auth().signOut();

    return {
        type:'changeStatus',
        payload:{
            status:2
        }
    };
};

export const checkLogin = () => {

    return (dispatch) =>{

        firebase.auth().onAuthStateChanged((user)=>{
            if(user){
                //Usuário está Logado
                dispatch({
                    type:'changeUid',
                    payload:{
                        uid:user.uid
                    }
                });
            }else{
                //Usuário não esta logado
                dispatch({
                    type:'changeStatus',
                    payload:{
                        status:2
                    }
                });
            }
        })

       /* excluido 
        let user = firebase.auth().currentUser;

        if(user){
            //Usuário está Logado
            dispatch({
                type:'changeStatus',
                payload:{
                    status:1
                }
            });
        }else{
            //Usuário não esta logado
            dispatch({
                type:'changeStatus',
                payload:{
                    status:2
                }
            });
        } */
    }
};

export const signUpAction = (name, email, password) => {
    return (dispatch) => {
        //Criando usuário
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((user)=>{

                //Pega uid
                let uid = firebase.auth().currentUser.uid;

                //Salva nome no db
                firebase.database().ref('users').child(uid).set({
                    name:name
                });

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
                    case 'auth/email-already-in-use':
                        alert("Email já utilizado!");
                        break;

                    case 'auth/invalid-email':
                        alert("Email inválido!");
                        break;

                    case 'auth/operation-not-allowed':
                        alert("Tente novamente mais tarde!");
                        break;

                    case 'auth/weak-password':
                        alert("Digite uma senha melhor!");
                        break;
                
                    default:
                        break;
                }
            })
    }
}

export const signInAction = (email, password, callBack) => {
    return (dispatch) => {
        //Criando usuário
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((user)=>{

                //Pega uid
                let uid = firebase.auth().currentUser.uid;

                callBack();

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

                callBack();
            })
    }
}

export const changeName = (name) => {
    return {
        type:'changeName',
        payload:{
            name:name
        }
    };
};

export const changeEmail = (email) => {
    return {
        type:'changeEmail',
        payload:{
            email:email
        }
    };
};

export const changePassword = (password) => {
    return {
        type:'changePassword',
        payload:{
            password:password
        }
    };
};