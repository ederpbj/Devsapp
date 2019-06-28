import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { checkLogin } from './actions/AuthActions';

export class Preload extends Component {

    static navigationOptions = {
        title:'',
        header:null
    }

    constructor(props){
        super(props);
        this.state = {}

        this.props.checkLogin();

        this.directPages = this.directPages.bind(this);
    }

    directPages(){
        //Navegação comum
        //this.props.navigation.navigate('Home');

        switch (this.props.status) {
            case 1:

                //Zera a posição vai para Conversas
                this.props.navigation.dispatch(NavigationActions.reset({
                    index:0,
                    actions:[
                        NavigationActions.navigate({routeName:'Conversas'})
                    ]
                }));
                break;
           
            case 2:

                //Zera a posição vai para Home
                this.props.navigation.dispatch(NavigationActions.reset({
					index:0,
					actions:[
						NavigationActions.navigate({routeName:'Home'})
					]
				}));
                break;
        
            default:
                break;
        }

/* Forma de if

        //Logado
        if(this.props.status == 1){

            //Navegação comum
            //this.props.navigation.navigate('Home');

            //Zera a posição para Home
            this.props.navigation.dispatch(NavigationActions.reset({
                index:0,
                actions:[
                    NavigationActions.navigate({routeName:'Conversas'})
                ]
            }));
        }

        //Não logado
        if(this.props.status == 2){

            //Navegação comum
            //this.props.navigation.navigate('Home');

            //Zera a posição para Home
            this.props.navigation.dispatch(NavigationActions.reset({
                index:0,
                actions:[
                    NavigationActions.navigate({routeName:'Home'})
                ]
            }));
        } */

    }

    //Chama component depois que a tela atualiza
    //componentWillUpdate

    //Quando a app é re-gerado, abrir novamente app
    componentDidMount(){
        this.directPages();
    }

    //Chama component gera novamente o render, atualizar página
    componentDidUpdate(){
        this.directPages();
    }

    render(){
        return (
            <View style={styles.container}>
                <Text>Carregando ... {this.props.status}</Text>
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
        status:state.auth.status
    };
};

//Constante de conexão (Preload)->Tela que vai abrir
const PreloadConnect = connect(mapStateToProps, { checkLogin })(Preload);
export default PreloadConnect;