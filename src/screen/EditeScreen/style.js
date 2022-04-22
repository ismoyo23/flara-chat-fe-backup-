import {StyleSheet,Dimensions} from 'react-native'


const width  =  Dimensions.get('screen').width
const height = Dimensions.get('screen').height

const style = StyleSheet.create({
    content : {
        paddingTop : 60,
        padding : 16,
    },
    profile : {
        width : width,
        zIndex : 20,
        height : height/2.4
    },
    header : {
        display : 'flex',
        flexDirection : 'column',
        // width : width,
        // height : height/2.4
    },
    action : {
        display : 'flex',
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        position : 'absolute',
        height : 70,
        backgroundColor : 'white',
        left : 30,
        right : 30,
        borderRadius : 40,
        bottom : -30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        padding : 20
    },
    icon : {
        height : 50,
        width : 50,
        display : 'flex',
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : '#5677E0',
        borderRadius : 25,
    },
    title : {
        fontSize : 20,
        fontFamily : 'Poppins-Bold'
    }
    ,bio : {
        fontSize : 14,
        fontFamily : 'Poppins-Regular'
    },
    container : {
        position : 'absolute',
        left : 0,
        right : 0,
        top : 0,
        bottom : 0
    },
    logoutBtn : {
        position : 'absolute',
        zIndex : 20,
        right : -10,
        bottom : 0,
        backgroundColor : 'white',
        height : 80,
        width : 80,
        display : 'flex',
        flexDirection : 'column',
        alignItems : 'center',
        justifyContent : 'center',
        borderRadius : 40
    }
})

module.exports = style