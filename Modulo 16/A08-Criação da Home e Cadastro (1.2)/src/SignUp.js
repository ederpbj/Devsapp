import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { connect } from 'react-redux';
import { checkLogin, changeEmail, changePassword, changeName } from './actions/AuthActions';

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
                <Text>Digite seu nome</Text>
                <TextInput style={styles.input} value={this.props.name} onChangeText={this.props.changeName} />
                
                <Text>Digite seu e-mail</Text>
                <TextInput style={styles.input} value={this.props.email} onChangeText={this.props.changeEmail} />
                
                <Text>Digite sua senha</Text>
                <TextInput style={styles.input} secureTextEntry={true} value={this.props.password} onChangeText={this.props.changePassword} />
                
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
    },
    input:{
        //width:200, 
        width:'80%', 
        fontSize:23,
        height:50,
        backgroundColor:'#DDDDDD'
    }
});

const mapStateToProps = (state) => {
    return {
        name:state.auth.name,
        email:state.auth.email,
        password:state.auth.password
    };
};

//Constante de conexão (Preload)->Tela que vai abrir
const SignUpConnect = connect(mapStateToProps, { checkLogin, changeEmail, changePassword, changeName })(SignUp);
export default SignUpConnect;
