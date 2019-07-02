import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { connect } from 'react-redux';
import { checkLogin } from './actions/AuthActions';

export class SignUp extends Component {

    static navigationOptions = {
        title:'Cadastrar'
    }

    constructor(props){
        super(props);
        this.state = {}

    }


    render(){
        return (
            <View style={styles.container}>
                <Text>...</Text>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        margin:10,
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
});

const mapStateToProps = (state) => {
    return {
        status:state.auth.status
    };
};

//Constante de conexão (Preload)->Tela que vai abrir
const SignUpConnect = connect(mapStateToProps, { checkLogin })(SignUp);
export default SignUpConnect;
