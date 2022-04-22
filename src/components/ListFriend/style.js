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
            minWidth : 180,
            maxWidth : 180,
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
            maxWidth : 190,
            fontFamily : 'Poppins-Regular',
            fontSize : 12,
            color : '#BFC2C9'
        },
        time : {
            display : 'flex',
            flexDirection : 'column',
            justifyContent : 'space-between',
            alignItems : 'center'
        },
        hours : {
            fontFamily : 'Poppins-Regular',
            fontSize : 10,
            color : '#BFC2C9'
        },
        unread : {
            marginTop : 10,
            height : 25,
            width : 25,
            borderRadius : 5,
            backgroundColor : '#567AF4',
            display : 'flex',
            flexDirection :'column',
            justifyContent : 'center',
            alignItems : 'center'
        },
        modalContent : {
            display : 'flex',
            position : 'absolute',
            backgroundColor : 'rgba(52, 52, 52, 0.1)',
            left : 0,
            right : 0,
            bottom : 0,
            top : 0,
        },
        modal : {
            position : 'absolute',
            left : 0,
            right : 0,
            bottom : 0,
            height : 150,
            backgroundColor : 'white',
            padding : 16
        }
})

module.exports = styles