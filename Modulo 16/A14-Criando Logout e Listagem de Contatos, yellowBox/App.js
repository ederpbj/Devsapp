import React, { Component } from 'react';
import { createStackNavigator, createAppContainer  } from 'react-navigation';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import Reducers from './src/Reducers';

import Preload from './src/Preload';
import Home from './src/Home';
import Conversas from './src/Conversas';
import SignUp from './src/SignUp';
import SignIn from './src/SignIn';

//Desabilita avisos amarelos
console.disableYellowBox = true;

let store = createStore(Reducers, applyMiddleware(ReduxThunk));

const Navegador = createStackNavigator({
  Preload:Preload,
  Home:Home,
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