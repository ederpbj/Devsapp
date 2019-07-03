const initialState ={
    name:'',
    email:'ederpbj@gmail.com',
    password:'',
    uid:'',
    status:0
};

const AuthReducer = (state = initialState, action) => {

    if(action.type == 'changeStatus'){
        //alert('Retorno: '+action.payload.status);
        return {...state, status:action.payload.status};
    }
    
    if(action.type == 'changeEmail'){
        //alert('Retorno: '+action.payload.status);
        return {...state, email:action.payload.email};
    }
    
    if(action.type == 'changePassword'){
        return {...state, password:action.payload.password};
    }
    
    if(action.type == 'changeName'){
        return {...state, name:action.payload.name};
    }
    
    if(action.type == 'changeUid'){
        return {...state, status:1, uid:action.payload.uid};
    }

    return state;
    
};

export default AuthReducer;