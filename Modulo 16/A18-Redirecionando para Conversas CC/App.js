import React, { Component } from './node_modules/react';
import { createStackNavigator, createAppContainer  } from 'react-navigation';
import { Provider } from './node_modules/react-redux';
import { createStore, applyMiddleware } from './node_modules/redux';
import ReduxThunk from './node_modules/redux-thunk';

import Reducers from './src/Reducers';

import Preload from './src/screens/Preload';
import Home from './src/screens/Home';
import Conversas from './src/screens/Conversas';
import SignUp from './src/screens/SignUp';
import SignIn from './src/screens/SignIn';

//Desabilita avisos amarelos
console.disableYellowBox = true;

let store = createStore(Reducers, applyMiddleware(ReduxThunk));

const Navegador = createStackNavigator({
  Preload:Preload,
  Home:Home,
  /* ConversasStack:{
	  ConversasStack,
		navigationOptions:{
		tabBarLabel:'Conversas'
  }}, */
  Conversas:Conversas,
  SignUp:SignUp,
  SignIn:SignIn
});


export default class App extends Component {
	render(){
		return(
			<Provider store={store}>
				<Container />
			</Provider>
		)
	}
}

const Container = createAppContainer(Navegador);
//export default container; 