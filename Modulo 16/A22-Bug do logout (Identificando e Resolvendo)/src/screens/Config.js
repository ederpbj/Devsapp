import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { StackActions, NavigationActions }  from 'react-navigation';
import { connect } from 'react-redux';
import { SignOut } from '../actions/AuthActions';

export class Config extends Component {

    static navigationOptions = {
        title:'',
        tabBarLabel:'Config',
        header:null
    }

    constructor(props){
        super(props);
        this.state = {}

        this.sair = this.sair.bind(this);
    }

    sair(){
        this.props.SignOut();

        //Variável global para usar navigate
        window.globalNavigator.navigate('Home');
        
        /*Pode excluir 
        this.props.navigation.dispatch(StackActions.reset({
            index:0,
            actions:[
                NavigationActions.navigate({routeName:'Home'})
            ]
        }));
         */
    }

    render(){
        return (
            <View style={styles.container}>
                <Text>PÁGINA DE Config </Text>

                <Button title="Sair" onPress={this.sair} />
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
const ConfigConnect = connect(mapStateToProps, { SignOut } )(Config);
export default ConfigConnect;