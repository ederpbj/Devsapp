import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

export class ConversasList extends Component {

    static navigationOptions = {
        title:'',
        tabBarLabel:'Conversas',
        header:null
    }

    constructor(props){
        super(props);
        this.state = {}

    }

    render(){
        return (
            <View style={styles.container}>
                <Text>PÁGINA DE CONVERSAS {this.props.status} - {this.props.uid}</Text>
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
        uid:state.auth.uid
    };
};

//Constante de conexão (Preload)->Tela que vai abrir
const ConversasListConnect = connect(mapStateToProps )(ConversasList);
export default ConversasListConnect;