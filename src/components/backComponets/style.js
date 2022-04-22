import {StyleSheet} from 'react-native'


const style = StyleSheet.create({
    backButton : {
        position : 'absolute',
        height : 90,
        width : 90,
        paddingBottom : 10,
        bottom : -20,
        left : -20,
        color : 'white',
        backgroundColor : '#567AF4',
        display : 'flex',
        flexDirection : 'row',
        alignItems: "center",
        justifyContent : "center",
        shadowColor: "#F9F9F9",
        borderRadius : 45,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.32,
        shadowRadius: 10.00,
        
        elevation: 2,
        zIndex : 30
    },
    touch : {
        display : 'flex',
        flexDirection : 'row',
    },
})

module.exports = style