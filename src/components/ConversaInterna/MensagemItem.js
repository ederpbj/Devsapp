import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class MensagemItem extends Component {

    constructor(props){
        super(props);

    }

    render(){
        return (
            <View style={MensagemItemStyles.area}>
                <Text>{this.props.data.m}</Text>
            </View>
        );
    }
}

const MensagemItemStyles = StyleSheet.create({
    area:{
        margin:10,
        backgroundColor:'#999999',
        padding:10,
        alignSelf:'baseline',
        borderRadius:10,
        maxWidth:'80%'
    }
});