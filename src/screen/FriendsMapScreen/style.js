import {StyleSheet} from 'react-native'

const style = StyleSheet.create({
    maps : {
        // height : 400,
        left : 0,
        right : 0,
        bottom : 0,
        top : 0,
        position : 'absolute'
    },
    content : {
        left : 0,
        right : 0,
        bottom : 0,
        top : 0,
        position : 'absolute'
    },
    card : {
        padding : 16,
        marginTop : 20,
        marginRight : 20,
        left : 16,
        marginBottom : 10,
        right : 16,
        bottom : 0,
        height : 100,
        backgroundColor : 'white',
        display : 'flex',
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        borderRadius : 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 2,
    },
    list : {
        position : 'absolute',
        bottom : 10,
    },
    profileHead : {
        display :'flex',
        flexDirection : 'row'
    },
    profile : {
        height : 70,
        width : 70,
        borderRadius : 10
    },
    detail : {
        margin : 10,
        display : 'flex',
        flexDirection : 'column'
    },
    name : {
        fontFamily : 'Poppins-Medium'
    },
    time : {
        fontFamily : 'Poppins-Regular',
        fontSize : 12,
        color : '#8E8E8E'
    },
    backBtn : {
        height : 90,
        width  : 90,
        backgroundColor : 'white',
        position : 'absolute',
        zIndex : 2,
        borderRadius : 40,
        top : -20,
        left : -20,
        display : 'flex',
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems : 'center'
    },
    marker : {
        height : 70,
        width : 70,
        borderRadius : 35,
        borderColor : 'white',
        borderWidth : 4,
    },
    markerOuter : {
        justifyContent : 'center',
        alignItems : 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    dot : {
        height : 10,
        width : 10,
        borderRadius : 5,
        backgroundColor : '#567AF4',
    }
})

module.exports = style