import React, { Component } from 'react'
import { Text, View,TouchableOpacity,Image,FlatList } from 'react-native'
import {Input} from 'galio-framework'
import style from './style';
import io from 'socket.io-client'
import IonIcon from 'react-native-vector-icons/Ionicons'
import axios from 'axios'
import {API_URL} from '@env'
import { connect } from 'react-redux';
import { getHome } from '../../redux/actions/home'
import moment from 'moment'

class ChatScreen extends Component {
    constructor(props){
        super(props)
        this.state = {
            data : [
                {
                    id : 2,
                    messages : 'start the chat',
                    user_id : 4,
                    send_to : 2,
                },
                {
                    id : 3,
                    message : 'hello',
                    user_id : 2,
                    send_to : 4,
                },
              ],
            txt : '',
            selectedId : null
        }
    }
    handleSubmit = ()=>{
        if (this.state.txt == '' ) {
            
        }
        else{
        axios({
            method : 'POST',
            headers : {
                Authorization :  this.props.user.auth.token
            },
            url : `${API_URL}api/chat`,
            data : {
                messages : this.state.txt,
                sendTo : this.props.route.params.id
            }
        }).then((res)=>{
            this.setState({
                txt : ''
            })
        })
    }
    }
    componentDidMount(){
        this.socket = io(`${API_URL}`)
        this.socket.on('chat',(msg)=>{
            if( this.props.user.auth.id == msg.id_users && this.props.route.params.id == msg.id_sendTo ||
                this.props.user.auth.id == msg.id_sendTo && this.props.route.params.id == msg.id_users  ){
                    this.setState({
                        data : [msg,...this.state.data]
                    },()=>{
                        this.handleReadAll()
                    })
            }
        })
        axios({
            method : 'GET',
            headers : {
              Authorization : this.props.user.auth.token 
            },
            url : `${API_URL}api/chat/${this.props.route.params.id}`,
        }).then((res)=>{
            console.log(res)
            if(res.data.data.length > 0){
                this.setState({
                    data : res.data.data.reverse()
                },()=>{
                    console.log(this.state.data)
                })
            }
        }).catch((err)=>{
            console.log(err.response)
        })
        this.handleReadAll()
    }
    handleReadAll = ()=>{
        axios({
            method : 'PUT',
            headers : {
                Authorization : this.props.user.auth.token
            },
            url : `${API_URL}api/chat/${this.props.route.params.id}`,
        }).then((res)=>{

        }).catch((err)=>{
            console.log(err)
        })
    }
    componentWillUnmount(){
        this.socket.disconnect()
        this.socket.removeAllListeners()
        this.handleGetChatList()
    }
    handleGetChatList = ()=>{
        var data = {
            token : this.props.user.auth.token
        }
        this.props.getHome(data).then((res)=>{
            console.log(res)
        }).catch((err)=>{
            console.log(err)
        })
    }
    render() {
        return (
            <View style={style.content}>
                <View style={style.header}>
                    <IonIcon name="arrow-back-outline" size={24}/>
                    <Text style={style.username}> {this.props.route.params.name} </Text>
                    <TouchableOpacity
                    // onPress={()=>{
                    //     this.props.navigation.navigate('detail')
                    // }}
                    >
                    <Image source={{uri : `${API_URL}uploads/${this.props.route.params.image}`}} style={style.profile}/>
                    </TouchableOpacity>
                </View>
                <View style={style.chatWrapper}>
                  <FlatList
                    style={{borderRadius : 30}}
                    inverted={true}
                    data={this.state.data}
                    renderItem={({item : row})=>{
                        return (
                            row.id_users == this.props.user.auth.id ?
                            <View style={style.chatBodySelf}>
                            <View style={style.chatBubbleSelf}>
                                <Text style={style.messageMe}>
                                    {row.messages}
                                </Text>
                            </View>
                            <Text style={style.time}>
                            {moment(row.created_at).fromNow()}
                            </Text>
                            </View> 
                            : 
                            <View style={style.chatBody}>
                            <View style={style.chatBubbleSend}>
                                <Text style={style.messageSend}>
                                    {row.messages}
                                </Text>
                            </View>
                            <Text style={style.time}>
                            {moment(row.created_at).fromNow()}
                            </Text>
                        </View>
                        )
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    extraData={this.state.selectedId}
                />
                </View>
                <View style={style.inputMessage}>
                    <IonIcon name="happy-outline" size={30} style={style.icon} />
                    <Input placeholder="Write Your Message" rounded borderless={true} style={style.messageInput} placeholderTextColor={'#D4D7DE'} onChangeText={text=>this.setState({txt : text})} value={this.state.txt}/>
                    <TouchableOpacity
                    onPress={this.handleSubmit}
                    style={style.send}>
                        <IonIcon name="send" size={24} style={{color: 'white'}}/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const mapStateToProps = state=>({
    user :state.auth
})
const mapDispatchToProps = {getHome}
export default connect(mapStateToProps,mapDispatchToProps)(ChatScreen)
