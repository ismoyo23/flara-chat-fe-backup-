import React, { Component } from 'react'
import { Text, View,Image , TouchableOpacity, Alert } from 'react-native'
import styles from './style'
import { connect } from 'react-redux'
import felin from '../../images/felin.jpg'
import LinearGradient from 'react-native-linear-gradient'
import { API_URL } from '@env'
import { accFriend, getFriend, decline} from '../../redux/actions/home'
class NotifCard extends Component {
    constructor(props){
        super(props)
    }
    handleAccCard = (_id)=>{
        var data = {
            id : _id,
            token : this.props.user.auth.token
        }
        this.props.accFriend(data).then((res)=>{
            this.props.getFriend(data)
        }).catch((err)=>{
            console.log(err)
        })
    }
    handleDeclineCard = (_id)=>{
        Alert.alert(
            'Are you sure ?',
            '',
            [
                { text: 'Cancel', onPress: () => console.log('OK Pressed') },
                { text: 'OK', onPress: () => this.handleDelete(_id)},
            ],
            { cancelable: false }
        )
    }
    handleDelete = (_id)=>{
        var data = {
            id : _id,
            token : this.props.user.auth.token
        }
        this.props.decline(data).then((res)=>{
            this.props.getFriend(data)
        }).catch((err)=>{
            console.log(err)
        })
    }

    render() {
        const data = this.props.data
        return (
            this.props.user.auth.id == data.id_friends ? (
                <View style={styles.notifCard}>
                    <Image source={{uri : `${API_URL}uploads/${data.image}`}} style={styles.profile}/>
                    <View style={styles.notifBody}>
                        <Text style={styles.sender}>
                            {data.name}
                        </Text>
                        <Text style={styles.msg}>
                            Send You a request
                        </Text>
                        <View style={styles.action}>
                        <LinearGradient
                                colors={['#19E6E3', '#C08CFC']}
                                start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
                                style={styles.gradient}
                                >
                            <TouchableOpacity
                                onPress={()=>{this.handleAccCard(data.id)}}
                                style={styles.actionBtn}>
                                <Text style={styles.buttonText}>
                                    Accept
                                </Text>
                            </TouchableOpacity>
                        </LinearGradient>
                        <LinearGradient
                                colors={['#F4A4A6', '#F4A4A6']}
                                start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
                                style={styles.gradient}
                                >
                            <TouchableOpacity
                                onPress={()=>{this.handleDeclineCard(data.id)}}
                                style={styles.actionBtn}>
                                <Text style={styles.buttonText}>
                                    Decline
                                </Text>
                            </TouchableOpacity>
                        </LinearGradient>
                        </View>
                    </View>
                </View>
            ) : (
                <View style={styles.notifCard}>
                <Image source={{uri : `${API_URL}uploads/${data.friendImage}`}} style={styles.profile}/>
                <View style={styles.notifBody}>
                    <Text style={styles.sender}>
                        {data.friendName}
                    </Text>
                    <Text style={styles.msg}>
                        Wait for acc
                    </Text>
                    <View style={styles.action}>
                    </View>
                </View>
            </View>
            )
        )
    }
}
const mapStateToProps = state=>({
    user : state.auth
})
const mapDispatchToProps = {accFriend,getFriend,decline}
export default connect(mapStateToProps,mapDispatchToProps)(NotifCard)