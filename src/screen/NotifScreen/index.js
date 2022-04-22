import React, { Component } from 'react'
import { Text, View, TouchableOpacity, ScrollView, Image } from 'react-native'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import styles from './style'
import BackButton from '../../components/backComponets'
import NotifCard from '../../components/NotifCard'
class NotifScreen extends Component {
    render() {
        return (
            <>
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.title}>Notifications</Text>
                    <TouchableOpacity
                    onPress={()=>{
                        this.props.navigation.navigate('notif')
                    }}>
                    </TouchableOpacity>
                </View>
                        <ScrollView style={styles.mainContent}>
                           {
                               this.props.home.friend.filter((row,index)=>{
                                   return row.acc_at == null
                               }).map((row,index)=>{
                                   return <NotifCard data={row} key={index}/>
                               })
                           }
                        </ScrollView>
            </View>
            <BackButton backTo={'Friend'}/>
            </>
        )
    }
}
const mapStateToProps = state=>({
    user : state.auth,
    home : state.home
})

export default connect(mapStateToProps)(NotifScreen)
