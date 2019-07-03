import React, { Component } from 'react';
import { createBottomTabNavigator, createAppContainer  } from 'react-navigation';

/* 
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import Reducers from './src/Reducers';
*/

import ConversasList from './ConversasList';
import ContatoList from './ContatoList';
import Config from './Config';

const Navegador = createBottomTabNavigator({
  ConversasList:ConversasList,
  ContatoList:ContatoList,
  Config:Config
},{
	tabBarPosition:'bottom',
	animationEnabled:true,
	swipeEnabled:false
});


const container = createAppContainer(Navegador);
export default container; 