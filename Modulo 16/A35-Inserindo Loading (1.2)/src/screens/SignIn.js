import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Keyboard } from 'react-native';
import { connect } from 'react-redux';

import { checkLogin, changeEmail, changePassword, signInAction } from '../actions/AuthActions';
import LoadingItem from '../components/LoadingItem'

export class SignIn extends Component {

    static navigationOptions = {
        title:'Login'
    }

    constructor(props){
        super(props);
        this.state = {
            loading:false
        }

    }

    //se usuário logado, vai para página Conversas
    componentDidUpdate(){
        if(this.props.status == 1){
            Keyboard.dismiss();
            this.props.navigation.navigate('Conversas');
        }
    }

    render(){
        return (
            <View style={styles.container}>
                <Text>Usuário logado: {this.props.uid}</Text>
                <Text>Status de login: {this.props.status}</Text>

                <Text>Digite seu e-mail</Text>
                <TextInput style={styles.input} value={this.props.email} onChangeText={this.props.changeEmail} />
                
                <Text>Digite sua senha</Text>
                <TextInput style={styles.input} secureTextEntry={true} value={this.props.password} onChangeText={this.props.changePassword} />
                
                <Button title="Entrar" onPress={()=>{
                    this.setState({loading:true});
                    this.props.signInAction(this.props.email, this.props.password, () => {
                        this.setState({loading:false})
                    });
                }} />

                <LoadingItem visible={this.state.loading} />
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
        uid:state.auth.uid,
        email:state.auth.email,
        password:state.auth.password,
        status:state.auth.status
    };
};

//Constante de conexão (Preload)->Tela que vai abrir
const SignInConnect = connect(mapStateToProps, { checkLogin, changeEmail, changePassword, signInAction })(SignIn);
export default SignInConnect;
