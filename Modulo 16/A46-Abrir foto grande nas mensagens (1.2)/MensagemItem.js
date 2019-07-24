import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

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
            txtAlign:txtAlign,
            dateMsg:this.getFormattedDate(this.props.data.cdate)
            
        };


    }

/* 
    <Moment parse="YYYY-MM-DD HH:mm">
        {this.props.data.cdate}
    </Moment> 
*/

    getFormattedDate(originalDate){
        let cDate = new Date();

        //Transforma em array[0] = data, array[1] = hora
        let mDate = originalDate.split(' ');

        //Formato internacional
        let todayDate = cDate.getFullYear()+'-'+(cDate.getMonth()+1)+'-'+cDate.getDate();

        //Se for hoje pega hora sem os segundos: 15:02
        //Ficou errado 15:0
        //let newDate = mDate[1].substring(0, 5);

        let newDate = mDate[1].split(':');
        //Corrigindo erro 0:0
        newDate = ((newDate[0]<10 )?'0'+newDate[0]:newDate[0])+':'+((newDate[1]<10 )?'0'+newDate[1]:newDate[1]);

        //Se não for hoje
        if(todayDate != mDate[0]){
            //split na data
            let newDateDays = mDate[0].split('-');
            
            /* Antigo
            newDate = 
            newDateDays[2]+'/'
            +newDateDays[1]+'/'
            +newDateDays[0]+' '
            +newDate;
             */

            newDate = 
            ((newDateDays[2]<10 )?'0'+newDateDays[2]:newDateDays[2])+'/'
            +((newDateDays[1]<10 )?'0'+newDateDays[1]:newDateDays[1])+'/'
            +newDateDays[0]+' '
            +newDate;


        }

        return newDate;
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

render(){
   

        return (
            <View style={[MensagemItemStyles.area, {alignSelf:this.state.align, backgroundColor:this.state.bgColor}]}>
                {this.props.data.msgType == 'text' && 
                    <Text style={{textAlign:this.state.txtAlign}}>{this.props.data.m}</Text>
                }

                {this.props.data.msgType == 'image' && 
                    <Text>(IMAGEM)</Text>

                    
                    <Image style={MensagemItemStyles.image} source={{uri:this.props.data.imgSource}}/>
                }

                <Text style={MensagemItemStyles.dateTxt}>{this.state.dateMsg}</Text>

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
    },
    image:{
        width:200,
        height:200
    },
    imageFull:{
        width:'80%',
        height:'80%',
        justifyContent:'center',
        alignItems:'center',
        textAlign:'center'
    }
});