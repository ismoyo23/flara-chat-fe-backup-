import {StyleSheet} from 'react-native';
import { color } from 'react-native-reanimated';


const styles = StyleSheet.create({
    content : {
        padding : 16,
        backgroundColor : '#fff'
    },
    header : {
        display : 'flex',
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center'
    },
    title : {
        fontFamily : 'Poppins-Bold',
        fontSize : 25,
        color : '#333B52'
    },
    searchIcon : {
        padding : 5
    },
    mainContent : {
        display : 'flex',
        flexDirection : 'column',
        paddingTop : 10
    },
    chatBody : {
        marginTop : 25,
        display : 'flex',
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center'
    },
        profile : {
            height : 75,
            width : 75,
            borderRadius : 40
        },
        chatWrap : {
            minWidth : 170,
            maxWidth : 170,
            display : 'flex',
            flexDirection : 'column',
            justifyContent : 'space-around',
            alignItems : 'flex-start',
            paddingLeft : 0
        },
        sender : {
            fontFamily : 'Poppins-Medium',
            fontSize : 16,
            color : '#333B52'
        },
        chat : {
            maxWidth : 170,
            fontFamily : 'Poppins-Regular',
            fontSize : 12,
            color : '#BFC2C9'
        },
        time : {
            display : 'flex',
            minWidth : 50,
            minHeight : 50,
            flexDirection : 'column',
            justifyContent : 'space-between',
            alignItems : 'center'
        },
        hours : {
            top : 0,
            position : 'absolute',
            fontFamily : 'Poppins-Regular',
            fontSize : 10,
            color : '#BFC2C9',
            textAlign : 'center'
        },
        unread : {
            top : 20,
            marginTop : 10,
            position : 'absolute',
            height : 25,
            width : 25,
            borderRadius : 5,
            backgroundColor : '#567AF4',
            display : 'flex',
            flexDirection :'column',
            justifyContent : 'center',
            alignItems : 'center'
        }
})

module.exports = styles