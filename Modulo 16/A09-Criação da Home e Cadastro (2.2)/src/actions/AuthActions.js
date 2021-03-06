import firebase from '../FirebaseConnection';

export const checkLogin = () => {

    return (dispatch) =>{
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
        }
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