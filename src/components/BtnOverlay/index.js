import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import styles from './style'
import IonIcon from 'react-native-vector-icons/Ionicons'

export default class BtnOverlay extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <TouchableOpacity
            onPress={this.props.onPress}
                style={{
                    bottom : this.props.style.bottom,
                    right : this.props.style.right,
                    position : 'absolute',
                    height : 60,
                    width : 60,
                    borderRadius : 30,
                    backgroundColor : '#567AF4',
                    display : 'flex',
                    flexDirection : 'row',
                    alignItems : 'center',
                    justifyContent : 'center'}}>
                        <IonIcon name={this.props.icon} size={25} style={{color: 'white'}}/>
            </TouchableOpacity>
        )
    }
}
