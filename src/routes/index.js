import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screen/HomeScreen';
import MapScreen from '../screen/MapScreen'
import RealTimeScreen from '../screen/RealTimeScreen'
import LoginScreen from '../screen/LoginScreen';
import RegisterScreen from '../screen/RegisterScreen';
import TabsBar from '../components/TabsComponents'
import ChatScreen from '../screen/ChatScreen';
import PageScreen from '../screen/PageScreen';
import { navigationRef } from './RootNav';
import { connect } from 'react-redux';
import EditeScreen from '../screen/EditeScreen';
import NotifScreen from '../screen/NotifScreen';
import FriendsMapScreen from '../screen/FriendsMapScreen';

const Stack = createStackNavigator();

class Route extends Component {
    render() {
        return (
            <NavigationContainer  ref={navigationRef}>
            <Stack.Navigator>
                {
                    this.props.user.isLogin ?(
                        <>
                        <Stack.Screen name="dashboard" component={TabsBar} options={{headerShown : false}} />
                        <Stack.Screen name="chat" component={ChatScreen} options={{headerShown : false}} />
                        <Stack.Screen name="detail" component={PageScreen} options={{headerShown : false}} />
                        <Stack.Screen name="maps" component={MapScreen} options={{headerShown : false}} />
                        <Stack.Screen name="edit" component={EditeScreen} options={{headerShown : false}} />
                        <Stack.Screen name="notif" component={NotifScreen} options={{headerShown : false}} />
                        <Stack.Screen name="maplist" component={FriendsMapScreen} options={{headerShown : false}} />
                        </>
                    ) : (
                        <>
                        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown : false}} />
                        <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown : false}} />
                        </>
                    )
                }
            </Stack.Navigator>
            </NavigationContainer>
        )
    }
}
const mapStateToProps = state=>({
    user : state.auth
})
export default connect(mapStateToProps)(Route)