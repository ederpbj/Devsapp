import React, { Component } from './node_modules/react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { connect } from './node_modules/react-redux';

export class ConversasList extends Component {

    static navigationOptions = {
        title:'Conversas',
        tabBarLabel:'Conversas'
    }

    constructor(props){
        super(props);
        this.state = {}

    }

    componentDidUpdate(){
        if(this.props.activeChat != ''){
            this.props.navigation.navigate('ConversaInterna');
        }
    }

    render(){
        return (
            <View style={styles.container}>
                <Text>PÁGINA DE CONVERSAS {this.props.status} - {this.props.uid}</Text>
                <Button title="Ir para Interna" onPress={()=>{
                    this.props.navigation.navigate('ConversaInterna');
                }} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        margin:10
    }
});

const mapStateToProps = (state) => {
    return {
        status:state.auth.status,
        uid:state.auth.uid,
        activeChat:state.chat.activeChat
    };
};

//Constante de conexão (Preload)->Tela que vai abrir
const ConversasListConnect = connect(mapStateToProps )(ConversasList);
export default ConversasListConnect;