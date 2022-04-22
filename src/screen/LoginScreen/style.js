import {StyleSheet,Dimensions} from 'react-native'


const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

const LoginStyle = StyleSheet.create({
    content : {
        backgroundColor : 'white',
        padding : 10,
        flex : 1,
        position : 'relative'
    },
    imgBg : {
        width : 200,
        height : 200,
        resizeMode: 'cover',
    },
    bgImage : {
        paddingBottom : 40
    },
        header : {
            display : "flex",
            flexDirection : "column",
            justifyContent : "center",
            alignItems : 'center',
            paddingBottom : 30
        },
            wl : {
                paddingBottom : 3,
                fontFamily : 'Poppins-Medium'
            },
        form : {
            padding : 5,
            // backgroundColor : '#F9F9F9'
        },
        input: {
            // borderRadius : 40,
            // borderWidth : 1,
            // borderColor : 'white',
            // marginTop: 30,
            // color: 'white',
            color : 'black',
            backgroundColor :"white"
          },
          formInput : {
              padding : 5
          },
            textForgot : {
                paddingBottom : 10,
                textAlign : 'right',
                fontSize : 12,
                marginRight : 10
            }
            ,submitWrapper : {
                display : 'flex',
                flexDirection : 'column',
                justifyContent : 'center',
                alignItems : "center"
            }
            ,
    boxShadow : 
    {
        shadowColor: "#F9F9F9",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.32,
        shadowRadius: 10.00,
        
        elevation: 2,
    },
    registerTxt : {
        display : 'flex',
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'center',
        paddingTop : deviceHeight/10
    }
})

module.exports = LoginStyle