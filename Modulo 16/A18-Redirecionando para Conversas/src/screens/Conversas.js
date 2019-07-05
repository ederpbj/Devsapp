import React, { Component } from './node_modules/react';
import { createBottomTabNavigator, createAppContainer  } from 'react-navigation';

import ConversasStack from './ConversasStack';
import ContatoList from './ContatoList';
import Config from './Config';

const Navegador = createBottomTabNavigator({
  ConversasStack:ConversasStack,
  ContatoList:ContatoList,
  Config:Config
},{
	tabBarPosition:'bottom',
	animationEnabled:true,
	swipeEnabled:false
});


const container = createAppContainer(Navegador);
export default container; 