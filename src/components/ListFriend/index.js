import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, Alert } from 'react-native'
import styles from './style'
import {API_URL} from '@env'
import IonIcon from 'react-native-vector-icons/Ionicons'
import * as RootNavigation from '../../routes/RootNav';
import { connect } from 'react-redux'
import {decline,getFriend} from '../../redux/actions/home'

class ListFriend extends Component {
    constructor(props){
        super(props)
        this.state = {
            deleteModal : false
        }
    }
    handleConfirm = ()=>{
        const _id = this.props.data.id
        Alert.alert(
            'Are you sure?',
            '',
            [
                { text: 'No', onPress: () => console.log('No') },
                { text: 'Yes', onPress: () => this.handleDelete(_id)},
            ],
            { cancelable: false }
        )
    }
    handleDeleteContact =()=>{
        Alert.alert(
            'What do you want??',
            '',
            [
                { text: 'Details', onPress: () => RootNavigation.navigate('detail',{data : this.props.data}) },
                { text: 'Unfriend', onPress: () => this.handleConfirm()},
            ],
            { cancelable: true }
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
            <>{
            this.props.user.auth.id == data.id_friends ? (
                <TouchableOpacity
                onLongPress={this.handleDeleteContact}
                onPress={()=>{ RootNavigation.navigate('detail',{data : data})}}
                style={styles.chatBody}>
                    <Image source={{uri: `${API_URL}uploads/${data.image}`}} style={styles.profile}/>
                        <View style={styles.chatWrap}>
                            <Text style={styles.sender}>
                                            {data.name}
                            </Text>
                            <Text style={styles.chat}>See Detail </Text>
                        </View>
                        <View style={styles.time}>
                            <View style={styles.unread}>
                                <IonIcon name="location" size={20} style={{color: 'white'}}/>
                            </View>
                        </View>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                onLongPress={this.handleDeleteContact}
                onPress={()=>{ RootNavigation.navigate('detail',{data : data})}}
                style={styles.chatBody}>
                    <Image source={{uri: `${API_URL}uploads/${data.friendImage}`}} style={styles.profile}/>
                        <View style={styles.chatWrap}>
                            <Text style={styles.sender}>
                                            {data.friendName}
                            </Text>
                            <Text style={styles.chat}>See Detail</Text>
                        </View>
                        <View style={styles.time}>
                            <View style={styles.unread}>
                                <IonIcon name="location" size={20} style={{color: 'white'}}/>
                            </View>
                        </View>
                </TouchableOpacity>
            )
            }
            </>
        )
    }
}
const mapStateToProps = state=>({
    user : state.auth
})
const mapDispatchToProps = {decline,getFriend}
export default connect(mapStateToProps,mapDispatchToProps)(ListFriend)