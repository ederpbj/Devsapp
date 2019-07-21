import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableHighlight, 
    BackHandler, 
    FlatList, 
    Image,
    KeyboardAvoidingView,
    Platform,
    TextInput
    //Teste
    /* AppRegistry,
    PixelRatio,
    TouchableOpacity */
    
} from 'react-native';
import { connect } from 'react-redux';
import { setActiveChat, sendMessage, monitorChat, monitorChatOff } from '../actions/ChatActions';
import MensagemItem from '../components/ConversaInterna/MensagemItem'
import ImagePicker from 'react-native-image-picker';



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

            inputText:'',
            imageTmp:null,
            //Teste
            avatarSource: null,
            imgSource: ''


        }

        this.voltar = this.voltar.bind(this);
        this.sendMsg = this.sendMsg.bind(this);
        //this.chooseImage = this.chooseImage.bind(this);

        //Tete
        //this.carregarFoto = this.carregarFoto.bind(this);
        this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
        
    }

   

    //Teste
    selectPhotoTapped(){
        
        /* const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup:true,
            },
        } */

        ImagePicker.showImagePicker(options, response => {
            alert('Response = ', response)

            if(response.didCancel){
                alert('Usuário cancelou photo picker')
            } else if (response.error){
                alert('ImagePicker Error: ', response.error);
            } else if(response.customButton){
                alert('Usuário apertou botão custom', response.customButton)
            }else{
                const source = { uri: response.uri }

                this.setState({
                    avatarSource: source,
                })
            }
        })
    }


    /* carregarFoto(){

		//Teste
		var options = {
			title: 'Selecione uma foto',
			customButtons: [
			  { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
			],
			storageOptions: {
			  skipBackup: true,
			  path: 'images',
			},
		  };
		//<

		//Pega imagem da galeria
		ImagePicker.showImagePicker(options, (r) => {
			if(r.uri){
				
				let state = this.state;
				state.formAvatar = {uri:r.uri};
				this.setState(state);
			}
		}); 
	} */
    

    //Setar os parametros no navigation, 
    componentDidMount(){
        this.props.navigation.setParams({voltarFunction:this.voltar});
        
        //Executa função voltar ao clicar no botão padrão de voltar
        BackHandler.addEventListener('hardwareBackPress', this.voltar);

        //Quando a conversa é iniciada cria monitor no action
        //Monitora o chat especifico, (criar no action)
        this.props.monitorChat(this.props.activeChat);
    }

    //Componente vai ser desmontado, quando for para outra tela
    componentWillMount(){
        BackHandler.removeEventListener('hardwareBackPress', this.voltar);

    }
    
    //Função do proprio componente, limpa setActiveChat
    voltar(){
        //Parar de monitorar o chat, (criar no action), REMANEJADO do componentWillMount
        this.props.monitorChatOff(this.props.activeChat);

        //alert("Voltar!");
        this.props.setActiveChat('');
        this.props.navigation.goBack();

        //Para não fechar app quando clicar em voltar 
        return true
    }

    chooseImage(){
        const options = {
            title: 'Select Image',
            storageOptions: {
              skipBackup: true,
              path: 'images'
            }
          };

        //alert("Adicionar imagem!")
        ImagePicker.showImagePicker(options, (r)=>{
            if(r.uri){
                let img = {uri:r.uri};
                let state = this.state;
                state.imageTmp = img;
                this.setState(state);
            }
        });
    }

    sendMsg(){
        //alert(this.state.inputText);

        let txt = this.state.inputText;

        let state =  this.state;
        state.inputText = '';
        this.setState(state);

        //alert(txt);

        //Criar essa função no ChatActions
        this.props.sendMessage('text', txt, this.props.uid, this.props.activeChat);
    }

    

    //Verifica uid
    // <TextInput style={styles.sendInput} value={this.props.uid} />

    //Prop temporário do stata, para teste
    //data={this.state.tmpMsg}
    render(){
        //Teste
        //const dateToFormat = '1976-04-19T12:59-0500';
        //const date = new Date();
        
        let AreaBehavior = Platform.select({ios:'padding', android:null});
        let AreaOffSet = Platform.select({ios:64, android:null});

        return (
            <KeyboardAvoidingView style={styles.container} behavior={AreaBehavior} keyboardVerticalOffset={AreaOffSet}>

                <FlatList 
                    ref={(ref)=>{ this.chatArea = ref }}
                    onContentSizeChange={()=> { this.chatArea.scrollToEnd({animated:true}) }}
                    onLayout={()=>{this.chatArea.scrollToEnd({animated:true}) }}
                    style={styles.chatArea}
                    data={this.props.activeChatMessages}
                    renderItem={({item})=><MensagemItem data={item} me={this.props.uid} /> }

                    keyExtractor={(item, index)=>item.id}
                />

                <View style={styles.imageTmp}>
                    <Image source={this.state.imageTmp} style={style.imageTmp.Image} />
                </View>

                <View style={styles.sendArea}>
                    <TouchableHighlight style={styles.imageButton} onPress={this.chooseImage}>
                        <Image style={styles.imageBtnImage} source={require('../assets/images/picture.png')} />
                    </TouchableHighlight>

                    <TextInput style={styles.sendInput} value={this.state.inputText}  onChangeText={(inputText)=>this.setState({inputText})} />

                    <TouchableHighlight style={styles.sendButton} onPress={this.sendMsg}>
                        <Image
                            style={styles.sendImage}
                            source={require('../assets/images/send-button.png')}
                        />
                    </TouchableHighlight>
                </View>
                
            </KeyboardAvoidingView>
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
    imageButton:{
        width:50,
        height:50,
        justifyContent:'center',
        alignItems:'center'
    },
    imageBtnImage:{
        width:50,
        height:50
    },
    imageTmp:{
        height:100,
        backgroundColor:'#DDDDDD'
    },
    image:{
        width:100,
        height:100
    }, 
    sendImage:{
        width:40,
        height:40
    }
});

const mapStateToProps = (state) => {
    return {
        //Cria props que vem do reducer
        status:state.auth.status,
        uid:state.auth.uid,
        activeChat:state.chat.activeChat,
        activeChatMessages:state.chat.activeChatMessages,
    };
};

//Constante de conexão (Preload)->Tela que vai abrir
const ConversaInternaConnect = connect(mapStateToProps, { setActiveChat, sendMessage, monitorChat, monitorChatOff } )(ConversaInterna);
export default ConversaInternaConnect;