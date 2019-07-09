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
import { setActiveChat, sendMessage } from '../actions/ChatActions';
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
                {key:1, date:'2019-07-08 18:00', uid:123, m:'Oi, tudo bem?'},
                {key:2, date:'2019-07-08 18:01', uid:'qiq9sill2oRpdqMEDTo2drEXZyl2', m:'Tudo, e você'},
                {key:3, date:'2019-07-08 18:02', uid:123, m:'Ok, legal'},
                {key:4, date:'2019-07-08 18:03', uid:'qiq9sill2oRpdqMEDTo2drEXZyl2', m:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'},
                {key:5, date:'2019-07-08 18:04', uid:'qiq9sill2oRpdqMEDTo2drEXZyl2', m:'Então xau!'}
            ]
        }

        this.voltar = this.voltar.bind(this);
        this.sendMsg = this.sendMsg.bind(this);
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

    sendMsg(){
        //alert(this.state.inputText);

        let txt = this.state.inputText;

        let state =  this.state;
        state.inputText = '';
        this.setState(state);

        //alert(txt);

        //Criar essa função no ChatActions
        this.props.sendMessage(txt, this.props.uid, this.props.activeChat);
    }

    //Verifica uid
    // <TextInput style={styles.sendInput} value={this.props.uid} />
    render(){
        return (
            <View style={styles.container}>
                <FlatList 
                    style={styles.chatArea}
                    data={this.state.tmpMsg}
                    renderItem={({item})=><MensagemItem data={item} me={this.props.uid} /> }

                    keyExtractor={(item, index)=>item.id}
                />

                <View style={styles.sendArea}>
                    <TextInput style={styles.sendInput} value={this.state.inputText}  onChangeText={(inputText)=>this.setState({inputText})} />

                    <TouchableHighlight style={styles.sendButton} onPress={this.sendMsg}>
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
        //Vem do reducer
        status:state.auth.status,
        uid:state.auth.uid,
        activeChat:state.chat.activeChat
    };
};

//Constante de conexão (Preload)->Tela que vai abrir
const ConversaInternaConnect = connect(mapStateToProps, { setActiveChat, sendMessage } )(ConversaInterna);
export default ConversaInternaConnect;