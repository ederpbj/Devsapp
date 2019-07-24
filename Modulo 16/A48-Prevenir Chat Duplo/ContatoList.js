import React, { Component } from 'react';
import { View, FlatList, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { getContactList, createChat } from '../actions/ChatActions';
import ContatoItem from '../components/ContatoList/ContatoItem'

export class ContatoList extends Component {

    static navigationOptions = {
        title:'',
        tabBarLabel:'Contatos',
        header:null
    }

    constructor(props){
        super(props);
        this.state = {
            loading:true
        }

        this.props.getContactList(this.props.uid, () =>{
            this.setState({loading:false});
        } );

        this.contatoClick = this.contatoClick.bind(this);
    }

    contatoClick(item){
        //alert("Clicou em "+item.name+" ("+item.key+") ");
        let found = false;

        //alert("QTD: "+this.props.chats.length);

        for(var i in this.props.chats){
            //alert("OTHER: "+this.props.chats[i].other);
            //alert("KEY: "+item.key);

            //Se o id igual do outro
            if(this.props.chats[i].other == item.key){
                found = true;
            }
        }

        //alert("ACHOU: "+found);
        
        if(found == false){
            //alert("Não ACHOU o chat!");
            //(remetente, destinatário)
            //Cria um chat inicial, chama action
            this.props.createChat( this.props.uid, item.key);
            this.props.navigation.navigate('ConversasStack');
        }else{
            alert("Já existe um CHAT com este usuário...");
            //Teste, não funciona, ir direto para conversa interna
            //this.props.navigation.navigate('ConversaInterna');
            //this.props.navigation.navigate('ConversaInterna', {title:this.props.activeChatTitle});
        }

    }

    render(){
        return (
            <View style={styles.container}>
                <Text>Contatos</Text>
            
                {this.state.loading && <ActivityIndicator size="large" />}

                <FlatList 
                    data={this.props.contacts}
                    renderItem={({item}) => <ContatoItem data={item} onPress={this.contatoClick} /> }

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
        uid:state.auth.uid,
        contacts:state.chat.contacts,
        chats:state.chat.chats
        
    };
};

//Constante de conexão (Preload)->Tela que vai abrir
const ContatoListConnect = connect(mapStateToProps, { getContactList, createChat } )(ContatoList);
export default ContatoListConnect;