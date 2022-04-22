import React, { Component } from 'react'
import io from 'socket.io-client'
import { Text, View, Button } from 'react-native';
import axios from 'axios'
import {API_URL} from '@env'


export default class RealtimeScreen extends Component {
    constructor(props){
        super(props)
        this.state = {
            data : []
        }

    }
    handleSubmitChat(){
        this.socket.emit('chat-message','Hi From app')
        // this.socket.emit('chat-message','chat')
    }
    componentDidMount(){
        this.socket = io('http://192.168.43.124:3000')
        this.socket.on('chat',(msg)=>{
            this.setState({
                data : [...this.state.data,msg]
            })
        })
        axios({
            method : 'GET',
            headers : {
              Authorization : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo1MywibmFtZSI6IkZsYXJpc3RhIiwiZW1haWwiOiJmbGFyaXN0YUBnbWFpbC5jb20iLCJpbWFnZSI6IjQyODk5NTY2MTg4NjM3NzRfYmF0aWstYmx1ZS1mbG9yYWwtYmFja2dyb3VuZF8yMy0yMTQ3NjEzNjEwLmpwZyIsImJpbyI6IkhpISEiLCJsb2MiOiJ7bG9uZzogMSxsYXQgOiAzfSIsImVtYWlsX3ZlcmlmaWVkX2F0IjpudWxsLCJyZW1lbWJlcl90b2tlbiI6bnVsbCwiY3JlYXRlZF9hdCI6IjIwMjAtMDctMjdUMTI6NTM6MDQuMDAwWiIsInVwZGF0ZWRfYXQiOiIyMDIwLTA3LTI3VDEyOjUzOjA0LjAwMFoifSwiaWF0IjoxNTk1OTI5Mjk5LCJleHAiOjE1OTYxODg0OTl9._vSmyLmZhLpLnIzDRYFEaFVUwYIOhtzDl_Z0bCG0PHc'  
            },
            url : 'http://192.168.43.124:3000/api/chat/list'
        }).then((res)=>{
            this.setState({
                data : res.data.data
            },()=>{
                console.log(this.state.data)
            })
        }).catch((err)=>{
            console.log(err)
        })
    }
    componentWillUnmount(){
        this.socket.disconnect()
        this.socket.removeAllListeners()
    }
    render() {
        return (
            <View>
                <Button title="chat"
                onPress={()=>{
                    this.handleSubmitChat()
                }}
                 ></Button>

                 {
                     this.state.data.map((row,index)=>{
                         return <View key={index}>
                             <Text>{row.messages}</Text>
                         </View>
                     })
                 }
            </View>
        )
    }
}
