import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableHighlight, 
    BackHandler, 
    FlatList, 
    Image,
    TextInput 
} from 'react-native';
import { connect } from 'react-redux';
import { setActiveChat } from '../actions/ChatActions';

export class ConversaInterna extends Component {

    //função com acesso ao navigation
    static navigationOptions = ({navigation}) => ({
        title:navigation.state.params.title,
        tabBarVisible: ({ state }) => ({
            visible: false
          }),
        //Não funcionou
        //<Image source={require('react-navigation/src/views/assets/back-icon.png')} />

        //Funciona mas não vejo imagem
        //<Image source={'../assets/images/icon-backP.png'} style={{width:25, height:25, marginLeft:20}} />

        //Não funciona: 
        //import Icon from 'react-native-vector-icons/FontAwesome';
        //<Icon name="arrowleft" size={30} color="#900" />

        //Criando componente voltar
        headerLeft:(
            <TouchableHighlight onPress={()=>{
                //alert("Clicou aqui!");
                //Chama função do proprio componente
                navigation.state.params.voltarFunction()
            }} underlayColor={false}>
            <Image source={require('../assets/images/icon-back.png')} style={{width:25, height:25, marginLeft:20}} />
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
                <FlatList 
                    style={styles.chatArea}
                    data={[]}
                    renderItem={()=><Text>xxx</Text>}

                    keyExtractor={(item, index)=>item.id}
                />

                <View style={styles.sendArea}>
                    <TextInput style={styles.sendInput} />

                    <TouchableHighlight style={styles.sendButton}>
                        <Image
                            style={styles.sendImage}
                            source={require('../assets/images/send.png')}
                        />
                    </TouchableHighlight>
                </View>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
       flex:1
    },
    chatArea:{
        flex:1,
        backgroundColor:'#FF0000'
    },
    sendArea:{
        height:50,
        backgroundColor:'#EEEEEE',
        flexDirection:'row'
    },
    sendInput:{
        height:50,
        flex:1
    },
    sendButton:{
        width:50,
        height:50,
        justifyContent:'center',
        alignItems:'center'
    },
    sendImage:{
        width:40,
        height:40
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