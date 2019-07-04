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
        //this.state = {}

        //Teste
        this.state = {
            data: [
              { id: "00", name: "Relâmpago McQueen" },
              { id: "01", name: "Agente Tom Mate" },
              { id: "02", name: "Doc Hudson" },
              { id: "03", name: "Cruz Ramirez" }
            ]
          };

        this.props.getContactList();
    }
/* 
    <FlatList 
        data={this.props.contacts}
        renderItem={({item}) => 
            <View>
                <Text>-> {item.name}</Text>
            </View>
        }
        
        keyExtractor={(item, index)=>item.id}
    /> 


    //Outro modo de FlatList
    <FlatList 
        data={this.state.data}
        renderItem={() => {
            return <Text>xxxxxxx</Text>
        }}
        keyExtractor={(item, index)=>item.id}
    />
*/

    render(){
        return (
            <View style={styles.container}>
                <Text>Contatos</Text>
            
                
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