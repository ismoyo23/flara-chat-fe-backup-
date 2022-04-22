import React, { Component } from 'react'
import { Image, Alert, TouchableOpacity, View, ActivityIndicator, ScrollView } from 'react-native';
import { Text,Input,GalioProvider, Button } from 'galio-framework'
// import { View,Icon } from 'native-base';
import LoginStyle from './style'
import image from '../../images/chatLogin.png'
import {login} from '../../redux/actions/auth'
import { connect } from 'react-redux';
import { API_URL } from '@env'

class LoginScreen extends Component {
    constructor(props){
        super(props)
        this.state = {
            focus : false,
            username : '',
            password  : '',
            isLoading : false,
            validate : false,
            isShow : false
        }
    }
    
    onRegister = ()=>{
        this.props.navigation.navigate('Register')
    }
    validate = (text) => {
        console.log(text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
          this.setState({ 
              username : text,
              validate : false ,
            })
        }
        else {
          this.setState({ 
              username : text,
              validate : true
         })
        }
      }
      handleLogin = ()=>{
        if (this.state.validate === true) {
            var data = {
                username : this.state.username,
                password : this.state.password
            }
            this.setState({
                isLoading : true
            })
            this.props.login(data).then((res)=>{
                console.log(res)
                this.setState({
                    isLoading : false
                })
                this.props.navigation.navigate('dashboard')
            }).catch((err)=>{
                console.log(err)
                this.setState({
                    isLoading : false
                })
                    Alert.alert(
                        'Oopss!!',
                        err.response.data.msg,
                        [
                            { text: 'OK', onPress: () => console.log('OK Pressed') }
                        ],
                        { cancelable: false }
                    )
            })
        }
        else{
            Alert.alert(
                'Oopss!!',
                'Email Invalid',
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') }
                ],
                { cancelable: false }
            )
        }
    }
    render() {
        const customTheme = {
            SIZES: { BASE: 18, },
            // this will overwrite the Galio SIZES BASE value 16
            COLORS: { PRIMARY: '#3B5998', } 
          };
        return (
            <>
            <GalioProvider theme={customTheme}>
            <ScrollView style={LoginStyle.content}>
                <View style={LoginStyle.header}>
                    <View style={LoginStyle.bgImage} >
                    <Image source={image} style={LoginStyle.imgBg}></Image>
                    </View>
        <Text h6 style={LoginStyle.wl}>Welcome Back !!</Text>
                    <Text muted>
                        Lets Chat with your friend and connected
                    </Text>
                </View>
                <View style={LoginStyle.form}>
                    <View style={LoginStyle.formInput}>
                        <Input placeholder="Email" rounded borderless={true} style={LoginStyle.input,LoginStyle.boxShadow} placeholderTextColor={'#D4D7DE'} color={'black'} onChangeText={text=>this.validate(text)}/>
                    </View>
                    <View style={LoginStyle.formInput}>
                        <Input placeholder="Password" rounded borderless={true} password style={LoginStyle.input,LoginStyle.boxShadow} placeholderTextColor={'#D4D7DE'} onChangeText={text=>this.setState({password : text})}/>
                    </View>
                    <View style={LoginStyle.formInput}>
                        <Text style={LoginStyle.textForgot}>Forgot Password?</Text>
                        {/* <Awsome name="book" size={24} /> */}
                    </View>
                    <View  style={LoginStyle.formInput,LoginStyle.submitWrapper} >
                        <TouchableOpacity
                        
                        >
                        <Button color={'#567AF4'} shadowless round onPress={this.handleLogin}>
                            {
                                this.state.isLoading ? (
                                    <ActivityIndicator color={'white'}/>
                                ) : (<Text style={{color: 'white'}}>Log-In</Text>)
                            }
                        </Button>
                        </TouchableOpacity>
                    </View>
                    <View style={LoginStyle.registerTxt}>
                        <Text muted>Don't Have account?  </Text><Text onPress={this.onRegister}>Register</Text>
                    </View>
                </View>
            </ScrollView>
            </GalioProvider>
            </>
        )
    }
}
const mapStateToProps = state=>({
    user : state.auth
})
const mapDispatchToProps = {login}

export default connect(mapStateToProps,mapDispatchToProps)(LoginScreen)
