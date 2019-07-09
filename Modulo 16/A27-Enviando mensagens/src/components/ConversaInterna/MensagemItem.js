import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class MensagemItem extends Component {

    constructor(props){
        super(props);

        let bgColor = '#EEEEEE';
        let align = 'flex-start';
        let txtAlign = 'left';

        if(this.props.data.uid == this.props.me){
            bgColor = '#9999FF';
            align = 'flex-end';
            txtAlign = 'right';

        }

        this.state = {
            bgColor:bgColor,
            align:align,
            txtAlign:txtAlign
        };

    }

    render(){
        return (
            <View style={[MensagemItemStyles.area, {alignSelf:this.state.align, backgroundColor:this.state.bgColor}]}>
                <Text style={{textAlign:this.state.txtAlign}}>{this.props.data.m}</Text>
                <Text style={MensagemItemStyles.dateTxt}>{this.props.data.date}</Text>
            </View>
        );
    }
}

const MensagemItemStyles = StyleSheet.create({
    area:{
        //margin:10,
        marginLeft:10,
        marginRight:10,
        marginTop:5,
        marginBottom:5,
        backgroundColor:'#999999',
        padding:10,
        //Virou dinâmico
        //alignSelf:'baseline',
        borderRadius:5,
        maxWidth:'80%'
    },
    dateTxt:{
        fontSize:11,
        textAlign:'right'
    }
});