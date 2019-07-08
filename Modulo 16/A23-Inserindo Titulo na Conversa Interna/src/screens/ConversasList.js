import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { getChatList, setActiveChat } from '../actions/ChatActions';
import ConversasItem from '../components/ConversasList/ConversasItem';


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

        this.conversaClick = this.conversaClick.bind(this);

    }

    //Atualiza componente
    componentDidUpdate(){
        if(this.props.activeChat != ''){
            //Manda title para conversa interna, para cabeçalho
            this.props.navigation.navigate('ConversaInterna', {title:this.props.activeChatTitle});
        }
    }

    //Do FlatList
    //renderItem={({item}) => <ContatoItem data={item} onPress={this.contatoClick} /> }

    //Testando FlatList
    /* 
    renderItem={({item}) => {
        return(<Text>xxxxx</Text>)
    } }
     */
    
     //Ativar o chat
    conversaClick(data){
        //alert("Clicou em "+data.key);
        this.props.setActiveChat(data.key);
    }

     render(){
        return (
            <View style={styles.container}>
                <FlatList 
                    data={this.props.chats}
                    renderItem={({item}) => <ConversasItem data={item} onPress={this.conversaClick}/> }

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
        activeChatTitle:state.chat.activeChatTitle,
        chats:state.chat.chats
    };
};

//Constante de conexão (Preload)->Tela que vai abrir
const ConversasListConnect = connect(mapStateToProps, { getChatList, setActiveChat } )(ConversasList);
export default ConversasListConnect;