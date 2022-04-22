import React, { Component } from 'react'
import { Text, View, RefreshControl,ScrollView, Image,TouchableOpacity,Modal,ActivityIndicator,Alert } from 'react-native'
import styles from './style'
import {Input,Button} from 'galio-framework'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import { getFriend } from '../../redux/actions/home'
import {API_URL} from '@env'
import Axios from 'axios'
import ListFriend from '../../components/ListFriend'
import BtnOverlay from '../../components/BtnOverlay'
class FriendList extends Component {
    constructor(props){
        super(props)
        this.state ={
            modalVisible : false,
            text : '',
            isLoading : false,
            refresh : false
        }
    }
    componentDidMount(){
        this.handleGetFriend()
    }
    
    handleGetFriend = ()=>{
        this.setState({
            refresh : true
        })
        var data = {
            token : this.props.user.auth.token
        }
        this.props.getFriend(data).then((res)=>{
            console.log(res)
            this.setState({
                refresh : false
            })
        }).catch((err)=>{
            console.log(err)
        })
    }
    handleAddFriend= ()=>{
        this.setState({
            isLoading : true
        })
        Axios({
            method : 'POST',
            headers : {
              Authorization : this.props.user.auth.token 
            },
            url : `${API_URL}api/friend`,
            data : {
                email : this.state.text
            }
        }).then((res)=>{
            this.handleGetFriend()
            console.log(res.data.msg)
            Alert.alert(
                'Success',
                this.state.text+ ' ' + res.data.msg,
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') }
                ],
                { cancelable: false }
            )
            this.setState({
                isLoading : false,
                modalVisible : false
            })
        }).catch((err)=>{
            Alert.alert(
                'Ooops!!',
                'email '+this.state.text+' is incorrect',
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') }
                ],
                { cancelable: false }
            )
            this.setState({
                isLoading : false,
                modalVisible : false
            })
        })
    }
    render() {
        const notif = this.props.home.friend.filter((row,index)=>{
            return row.acc_at == null
        }).length
        const count = this.props.home.friend.filter((row,index)=>{
            return row.acc_at !== null
        }).length
        const friend = count <= 0 ? false : true
        return (
            <>
                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Friends</Text>
                        <TouchableOpacity
                        onPress={()=>{
                            this.props.navigation.navigate('notif')
                        }}>
                            <IonIcon name="notifications" size={20} style={styles.searchIcon}/>
                            {
                                notif >=1?(
                                    <View style={styles.badge}>
                                    </View>
                                ) : (
                                    <></>
                                )
                            }
                        </TouchableOpacity>
                    </View>
                        <ScrollView style={styles.mainContent}
                        refreshControl={
                            <RefreshControl refreshing={this.state.refresh} onRefresh={this.handleGetFriend} />
                          }>
                            {
                                this.props.home.friend.filter((row,index)=>{
                                    return row.acc_at !== null
                                }).map((row,index)=>{
                                    return <ListFriend key={index} data={row}/>
                                })
                            }
                        </ScrollView>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={this.state.modalVisible}
                            onRequestClose={() => {
                                this.setState({
                                    modalVisible : false
                                })
                            }} >
                            <View style={styles.modalContent}>
                                <View style={styles.modal}>
                                <Input placeholder="Enter Email id" rounded borderless={true} placeholderTextColor={'#D4D7DE'} color={'black'} onChangeText={text=>this.setState({text : text})}/>
                                    <Button color={'#567AF4'} shadowless round onPress={this.handleAddFriend}>
                                        {
                                            this.state.isLoading ? (
                                                <ActivityIndicator color={'white'}/>
                                            ) : (<Text style={{color: 'white'}}>Add</Text>)
                                        }
                                    </Button>
                                </View>
                            </View>
                        </Modal>
                </View>
                    <BtnOverlay icon="add-outline" style={{bottom : 10,right : 10}} onPress={()=>{
                        this.setState({
                            modalVisible : true
                            })}}/>
                            {
                                friend ? (
                                    <BtnOverlay icon="map-outline" style={{bottom : 80,right : 10}} onPress={()=>{this.props.navigation.navigate('maplist',{user : this.props.user.auth})}}/>
                                ) : (<></>)
                            }
            </>
        )
    }
}
const mapStateToProps = state=>({
    user : state.auth,
    home : state.home
})
const mapDispatchToProps = {getFriend}
export default connect(mapStateToProps,mapDispatchToProps)(FriendList)