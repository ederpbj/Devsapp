import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Image, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { setActiveChat } from '../actions/ChatActions';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
//import Icon from 'react-native-vector-icons/FontAwesome';


export class ConversaInterna extends Component {

    //função com acesso ao navigation
    static navigationOptions = ({navigation}) => ({
        title:navigation.state.params.title,

        //Não funcionou
        //<Image source={require('react-navigation/src/views/assets/back-icon.png')} />

        //Funciona mas não vejo imagem
        //<Image source={'../assets/images/icon-backP.png'} style={{width:25, height:25, marginLeft:20}} />

        //Criando componente voltar
        headerLeft:(
            <TouchableHighlight onPress={()=>{
                //alert("Clicou aqui!");
                //Chama função do proprio componente
                navigation.state.params.voltarFunction()
            }} underlayColor={false}>
                <Icon name="arrowleft" size={30} color="#900" />
            </TouchableHighlight>
        )
    })

    constructor(props){
        super(props);
        this.state = {}

        this.voltar = this.voltar.bind(this);
    }

    //Setar os parametros no navigation, 
    componentDidMount(){
        this.props.navigation.setParams({voltarFunction:this.voltar});
        
        //Executa função voltar ao clicar no botão padrão de voltar
        BackHandler.addEventListener('hardwareBackPress', this.voltar);
    }

    //Componente vai ser desmontado, quando for para outra tela
    componentWillMount(){
        BackHandler.removeEventListener('hardwareBackPress', this.voltar);
    }

    //Função do proprio componente, limpa setActiveChat
    voltar(){
        //alert("Voltar!");
        this.props.setActiveChat('');
        this.props.navigation.goBack();

        //Para não fechar app quando clicar em voltar
        return true
    }

    render(){
        return (
            <View style={styles.container}>
                <Text>PÁGINA DE CONVERSA INTERNA</Text>
                
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
const ConversaInternaConnect = connect(mapStateToProps, { setActiveChat } )(ConversaInterna);
export default ConversaInternaConnect;