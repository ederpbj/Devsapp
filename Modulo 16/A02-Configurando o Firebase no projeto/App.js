import React, {Component} from './node_modules/react';
import { StyleSheet, Text, View} from 'react-native';
import firebase from './src/FirebaseConnection'

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        
        <Text style={styles.welcome}>Boas vindas Devsapp!</Text>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
  
});
