import React, { Component } from './node_modules/react';
import { createStackNavigator, createAppContainer  } from 'react-navigation';

import ConversasList from './ConversasList';
import ConversaInterna from './ConversaInterna';


const Navegador = createStackNavigator({
  ConversasList:ConversasList,
  ConversaInterna:ConversaInterna
});


const container = createAppContainer(Navegador);
export default container; 