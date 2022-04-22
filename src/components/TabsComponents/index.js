import React from 'react'
import { View, Text } from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screen/HomeScreen'
import MapScreen from '../../screen/MapScreen'
import RealtimeScreen from '../../screen/RealTimeScreen'
import Ionicons from 'react-native-vector-icons/AntDesign'
import Ion from 'react-native-vector-icons/Ionicons'
import AwsemIcon from 'react-native-vector-icons/FontAwesome'
import ProfileScreen from '../../screen/ProfileScreen';
import FriendList from '../../screen/FriendList';


const Tab = createBottomTabNavigator()


export default function TabsBar() {
    return (
        <Tab.Navigator tabBarOptions={{
            showLabel : false,
            activeTintColor: 'black', // active icon color
            inactiveTintColor: '#E0E0E0',  // inactive icon color
            style: {
                backgroundColor: '#FFF',
                borderTopLeftRadius : 30,
                borderTopRightRadius : 30,
                height : 68,
                shadowOpacity : 0
            }}}>
        <Tab.Screen name="Home" component={HomeScreen} options={{
            tabBarIcon : ({color,size})=>(
            <Ion name="chatbox-outline" color={color} size={size}/>
        )}}
        />
        <Tab.Screen name="Friend" component={FriendList} options={{
            tabBarIcon : ({color,size})=>(
            <Ion name="person-outline" color={color} size={size}/>
        )}}
        />
        <Tab.Screen name="Profile" component={ProfileScreen} options={{
            tabBarIcon : ({color,size})=>(
            <Ion name="settings-sharp" color={color} size={size}/>
        )}}
        />
      </Tab.Navigator>
    )
}