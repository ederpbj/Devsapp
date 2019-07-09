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
import MensagemItem from '../components/ConversaInterna/MensagemItem'

export class ConversaInterna extends Component {

    //função com acesso ao navigation
    static navigationOptions = ({navigation}) => ({
        title:navigation.state.params.title,
        tabBarVisible: ({ state }) => ({
            visible: false
          }),

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
        this.state = {
            tmpMsg:[
                {key:1, m:'Oi, tudo bem?'},
                {key:2, m:'Tudo, e você'},
                {key:3, m:'Ok, legal'},
                {key:3, m:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'}
            ]
        }

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
                    data={this.state.tmpMsg}
                    renderItem={({item})=><MensagemItem data={item}/> }

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
        backgroundColor:'#CCCCCC'
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