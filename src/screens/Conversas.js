import React, { Component } from 'react';
import { createBottomTabNavigator, createAppContainer  } from 'react-navigation';

import ConversasStack from './ConversasStack';
import ContatoList from './ContatoList';
import Config from './Config';


const Navegador = createBottomTabNavigator({
  //ConversasStack:ConversasStack,
  ConversasStack:{
    screen: ConversasStack,
    navigationOptions: () => ({
      title: 'Conversas',
      header:null,
      headerMode: 'none'
      
    })
  },
  ContatoList:ContatoList,
  Config:Config

},{
 
    animationEnabled:false,
    swipeEnabled:false,
    tabBarOptions: {
      activeTintColor: '#e91e63',
      labelStyle: {
        fontSize: 22,
      },
      style: {
        //backgroundColor: 'blue',
      },
    }
    
});


const container = createAppContainer(Navegador);
export default container; 



/* muda propriedades do tab
navigationOptions: () => ({
  title: 'Maluco',
  header:null,
  //Opções do tab
  tabBarOptions: {
    activeTintColor: '#e91e63',
    labelStyle: {
      fontSize: 22,
    },
    style: {
      //backgroundColor: 'blue',
    },
  }
  
}),

 */

