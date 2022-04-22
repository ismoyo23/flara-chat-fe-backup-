import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import style from './style'
import IonIcon from 'react-native-vector-icons/Ionicons'
import felin from '../../images/felin.jpg'
import BackButton from '../../components/backComponets'
import {API_URL} from '@env'
import { connect } from 'react-redux'


class PageScreen extends Component {
    constructor(props){
        super()
    }
    componentDidMount(){
        console.log(this.props.route.params)
    }
    render() {
        const data = this.props.route.params.data
        const user = {
            name    : data.friendName,
            image   : data.friendImage,
            loc     : data.friendLoc,
            bio     : data.friendBio,
            created_at : data.friendCreated_at,
            updated_at : data.friendUpdated_at
        }
        return (
            this.props.user.auth.id == data.id_friends ? (
                <View style={style.container}>
                <View style={style.header}>
                    <Image source={{uri : `${API_URL}uploads/${data.image}`}} style={style.profile}/>
                    <View style={style.action}>
                        <TouchableOpacity
                        onPress={()=>{this.props.navigation.navigate('maps',{user : data})}} 
                        style={style.icon}>
                            <IonIcon name="location" size={25} style={{color: 'white'}}/>
                        </TouchableOpacity>
                        <Text>
                            {data.name}
                        </Text>
                        <TouchableOpacity 
                        style={style.icon}
                        onPress={()=>{this.props.navigation.navigate('chat',
                                    {
                                        id : data.id_users,
                                        name : data.name
                                    })}}
                        >
                            <IonIcon name="navigate" size={25} style={{color: 'white'}}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={style.content}>
                    <Text style={style.title}>
                        Bio
                    </Text>
                    <View>
                        <Text style={style.bio}>
                            {data.bio}
                        </Text>
                    </View>
                </View>
                <BackButton backTo='Friend'/>
            </View>
            ) : (
                <View style={style.container}>
                <View style={style.header}>
                    <Image source={{uri : `${API_URL}uploads/${data.friendImage}`}} style={style.profile}/>
                    <View style={style.action}>
                        <TouchableOpacity
                        onPress={()=>{this.props.navigation.navigate('maps',{user : user})}} 
                        style={style.icon}>
                            <IonIcon name="location" size={25} style={{color: 'white'}}/>
                        </TouchableOpacity>
                        <Text>
                            {data.friendName}
                        </Text>
                        <TouchableOpacity 
                        style={style.icon}
                        onPress={()=>{this.props.navigation.navigate('chat',
                                    {
                                        id : data.id_friends,
                                        name : data.friendName
                                    })}}
                        >
                            <IonIcon name="navigate" size={25} style={{color: 'white'}}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={style.content}>
                    <Text style={style.title}>
                        Bio
                    </Text>
                    <View>
                        <Text style={style.bio}>
                            {data.friendBio}
                        </Text>
                    </View>
                </View>
                <BackButton backTo='Friend'/>
            </View>
            )
        )
    }
}
const mapStateToProps = state=>({
    user : state.auth
})
export default connect(mapStateToProps)(PageScreen)