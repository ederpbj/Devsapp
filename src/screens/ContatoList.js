import React, { Component } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { getContactList } from '../actions/ChatActions';

export class ContatoList extends Component {

    static navigationOptions = {
        title:'',
        tabBarLabel:'Contatos',
        header:null
    }

    constructor(props){
        super(props);
        this.state = {}

        this.props.getContactList();
    }

    render(){
        return (
            <View style={styles.container}>
            <Text>Teste</Text>
         
            
            <FlatList 
                    data={this.props.contacts}
                    renderItem={({item}) => 
                                <View>
                                    <Text>-> {item.name}</Text>
                                </View>
                    }
                    
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
const ContatoListConnect = connect(mapStateToProps, { getContactList } )(ContatoList);
export default ContatoListConnect;