import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { getChatList } from '../actions/ChatActions';

export class ConversasList extends Component {

    static navigationOptions = {
        title:'Conversas',
        tabBarLabel:'Conversas'
    }

    constructor(props){
        super(props);
        this.state = {}

        //Pega a lista de chat do usuário logado
        this.props.getChatList( this.props.uid );

    }

    componentDidUpdate(){
        if(this.props.activeChat != ''){
            this.props.navigation.navigate('ConversaInterna');
        }
    }

    //Do FlatList
    //renderItem={({item}) => <ContatoItem data={item} onPress={this.contatoClick} /> }

    render(){
        return (
            <View style={styles.container}>
                <FlatList 
                    data={this.props.chats}
                    renderItem={({item}) => {
                        return(<Text>xxxxx</Text>)
                    } }

                    keyExtractor={(item, index)=>item.id}
                />
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
        activeChat:state.chat.activeChat,
        chats:state.chat.chats
    };
};

//Constante de conexão (Preload)->Tela que vai abrir
const ConversasListConnect = connect(mapStateToProps, { getChatList } )(ConversasList);
export default ConversasListConnect;