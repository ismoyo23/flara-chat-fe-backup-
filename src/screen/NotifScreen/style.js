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
        fontSize : 23,
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
    notifCard : {
        padding : 16,
        borderColor : '#F8F9F9',
        borderWidth : 3,
        borderRadius : 5,
        marginTop : 25,
        display : 'flex',
        flexDirection : 'row',
        alignItems : 'flex-start'
    },
        profile : {
            height : 55,
            width : 55,
            borderRadius : 40
        },
        notifBody : {
            marginLeft : 20,
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
        msg : {
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
        },
        btnAdd : {
            position : 'absolute',
            bottom : 10,
            right : 10,
            height : 60,
            width : 60,
            borderRadius : 30,
            backgroundColor : '#567AF4',
            display : 'flex',
            flexDirection : 'row',
            alignItems : 'center',
            justifyContent : 'center'
        },
            badge : {
                height : 11,
                width : 11,
                borderRadius : 10,
                backgroundColor: 'red',
                position : 'absolute',
                right : 5,
                top : 5,
                borderColor : 'white',
                borderWidth : 2
            },
            action : {
                display : 'flex',
                flexDirection : 'row',
                justifyContent : 'space-between',
                alignItems : 'center'
            },
                actionBtn : {
                    minWidth : 100,
                    padding : 5,
                    display : 'flex',
                    flexDirection : 'column',
                    justifyContent : 'center',
                    alignItems : 'center',
                    backgroundColor : 'white',
                    borderRadius : 30,
                    margin : 1
                },
            gradient : {
                margin : 5,
                borderRadius : 30,
                marginTop : 20,
                minWidth: 100, 
                alignItems: 'center', 
                justifyContent: 'center',
            },
            buttonText: {
                textAlign: 'center',
                fontFamily : 'Poppins-Regular',
                fontSize : 12
            }
})

module.exports = styles