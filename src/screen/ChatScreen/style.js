import {StyleSheet,Dimensions} from 'react-native';

const width = Dimensions.get('screen').width
const style = StyleSheet.create({
    content : {
        // padding : 16,
        position : 'absolute',
        zIndex : 1,
        left : 0,
        right : 0,
        top : 0,
        bottom : 0,
    },
    header : {
        padding : 16,
        paddingRight : 0,
        display : 'flex',
        flexDirection : 'row',
        justifyContent : "space-between",
        margin : 10,
        alignItems : 'center'
    },
    chatWrapper : {
        // display : 'flex',
        paddingBottom : 100,
        padding : 16,
        backgroundColor : 'white',
        borderTopLeftRadius : 50,
        borderTopRightRadius : 50,
        position : 'absolute',
        left : 0,
        right : 0,
        bottom : 0,
        top : 80,
        flex :1,
    },
    chatBodySelf : {
        display : 'flex',
        justifyContent : 'flex-end',
        flexDirection : 'column',
        alignItems : 'flex-end'
    },
    chatBubbleSelf : {
        marginTop : 10,
        minWidth : width/2,
        maxWidth : width/2,
        padding : 10,
        minHeight : 50,
        borderRadius : 20,
        borderBottomRightRadius : 0,
        display : 'flex',
        flexDirection : 'column',
        alignItems : 'flex-start',
        justifyContent : 'center',
        backgroundColor : '#5677E0',
    },
    chatBubbleSend : {
        marginTop : 10,
        padding : 10,
        backgroundColor : '#F7F7FE',
        minWidth : width/2,
        maxWidth : width/2,
        minHeight : 50,
        borderRadius : 20,
        borderBottomLeftRadius : 0,
        display : 'flex',
        flexDirection : 'column',
        alignItems : 'flex-start',
        justifyContent : 'center',
    }, 
    chatScreen : {
        position : 'absolute',
        left : 20,
        right : 0,
        bottom : 0,
    }
    ,inputMessage : {
        display : 'flex',
        flexDirection : 'row',
        justifyContent : "space-around",
        alignItems : 'center',
        position : 'absolute',
        backgroundColor : '#F7F8FD',
        left : 0,
        right : 0,
        bottom : 0,
        margin : 16,
        borderRadius : 10
    },
    messageInput : {
        marginLeft : -35,
        backgroundColor : '#F7F8FD'
    },
    icon : {
        color : '#BFC2C9'
    },
        send : {
            display : 'flex',
            flexDirection : 'column',
            justifyContent : 'center',
            alignItems : 'center',
            height : 40,
            width : 45,
            borderRadius : 10,
            backgroundColor : '#5677E0'
        },
        messageMe : {
            color : 'white',
            fontFamily : 'Poppins-Regular',
            margin : 10,
            fontSize : 12
        },
        messageSend : {
            color : '#333B52',
            fontFamily : 'Poppins-Regular',
            margin : 10,
            fontSize : 12
        },
        time : {
            fontFamily : 'Poppins-Regular',
            fontSize : 12,
            color : '#BFC2C9',
            margin : 5,
        },
    profile : {
        height : 40,
        width : 40,
        borderWidth : 3,
        borderColor : 'white',
        borderRadius : 25,
    }
})

module.exports = style