import React, { Component } from 'react';
import { View, Modal, StyleSheet, ActivityIndicator, Navigator } from 'react-native';

export default class LoadingItem extends Component {
    constructor(props) {
        super(props);
        this.state = {};

    }

    render(){
        return(
            <Modal animationType="none" transparent visible={this.props.visible}>
                <View style={styles.loading}>
                    <ActivityIndicator size={'large'} />
                </View>
            </Modal>

            <Navigator 
                initialRoute={{title: 'Fala que te escuto', index: 0 }}
                renderScene={(route, navigator) => 
                    <Text>Hello {route.title}!</Text>
                }
                style={{padding:100}}
            />
        );
    }
}

const styles = StyleSheet.create({
    loading:{
        position:"absolute",
        top:0,
        bottom:0,
        left:0,
        right:0,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#000000',
        opacity:0.5
    }
})