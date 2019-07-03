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