import React, { Component } from './node_modules/react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { connect } from './node_modules/react-redux';
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
        //this.state = {}

        this.props.getContactList(this.props.uid);

        this.contatoClick = this.contatoClick.bind(this);
    }

    contatoClick(item){
        //alert("Clicou em "+item.name+" ("+item.key+") ");
        //(remetente, destinatário)
        this.props.createChat( this.props.uid, item.key);

        this.props.navigation.navigate('ConversasStack');
    }

    render(){
        return (
            <View style={styles.container}>
                <Text>Contatos</Text>
            
                
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
        contacts:state.chat.contacts
        
    };
};

//Constante de conexão (Preload)->Tela que vai abrir
const ContatoListConnect = connect(mapStateToProps, { getContactList, createChat } )(ContatoList);
export default ContatoListConnect;