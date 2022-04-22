import React, { Component } from 'react'
import { Text, View,Image,ScrollView,TouchableOpacity } from 'react-native'
import style from './style'
import IonIcon from 'react-native-vector-icons/Ionicons'
import BackButton from '../../components/backComponets'
import {logout} from '../../redux/actions/auth'
import { connect } from 'react-redux'
import {API_URL} from '@env'

class ProfileScreen extends Component {
    constructor(props){
        super(props)
        this.state= {
            LogoutLoading : false
        }
    }
    handleLogout = ()=>{
        this.props.logout()
        this.setState({
            LogoutLoading : true
        })
    }
    render() {
        const data = this.props.user.auth
        return (
            <View style={style.container}>
                <TouchableOpacity 
                onPress={this.handleLogout}
                style={style.logoutBtn}>
                    <IonIcon name="log-out-outline" size={25}/>
                </TouchableOpacity>
                <ScrollView>
                <View style={style.header}>
                    <Image source={{uri : `${API_URL}uploads/${this.props.user.auth.image}`}} style={style.profile}/>
                    <View style={style.action}>
                        <TouchableOpacity 
                        onPress={()=>{this.props.navigation.navigate('edit')}}
                        style={style.icon}>
                            <IonIcon name="create-outline" size={25} style={{color: 'white'}}/>
                        </TouchableOpacity>
                        <Text>
                            {
                                this.props.user.auth.name
                            }
                        </Text>
                        <TouchableOpacity 
                        onPress={()=>{this.props.navigation.navigate('maps',{user : data})}} 
                        style={style.icon}>
                            <IonIcon name="navigate" size={25} style={{color: 'white'}}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={style.content}>
                    <Text style={style.title} onPress={()=>{console.log(this.props.user)}}>
                        Bio
                    </Text>
                    <View>
                        <Text style={style.bio}>
                            {
                                this.props.user.auth.bio
                            }
                        </Text>
                    </View>
                </View>
                </ScrollView>
                {/* <Image source={{uri : `${API_URL}uploads/${this.props.user.auth.image}`}} style={style.profile}/>
                <Text>
                    {
                        this.props.user.auth.image
                    }
                </Text> */}
            </View>
        )
    }
}
const mapStateToProps = state=>({
    user : state.auth
})
const mapDispatchToProps = {logout}
export default connect(mapStateToProps,mapDispatchToProps)(ProfileScreen)
