import React, { Component } from 'react'
import { Text, View, FlatList, Image, TouchableOpacity,Alert,Dimensions } from 'react-native'
import MapView,{ Marker, AnimatedRegion } from 'react-native-maps';
import style from './style'
import IonIcon from  'react-native-vector-icons/Ionicons'
import {API_URL} from '@env'
import felin from '../../images/felin.jpg'
import { connect } from 'react-redux';
import Geolocation from '@react-native-community/geolocation';
import moment from 'moment'
import {updateUser} from '../../redux/actions/auth'
import { ScrollView } from 'react-native-gesture-handler';


class FriendsMapScreen extends Component {
    constructor(props){
        super(props)
        this.state = {
            loc : {},
            lat : 0,
            long : 0,
            mapRegion: { latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
        }
        const window = Dimensions.get('window');
        const { width, height } = window;
        const longitudeDelta = 0.0922 + (width / height)

    }
    handleMapRegionChange = mapRegion => {
        this.setState({ mapRegion });
    };
    componentDidMount(){
        this.handleGetLoc()
    }
    componentWillUnmount(){
        this.handleUpdateLoc()
    }
    handleGetLoc = ()=>{
        const loc = JSON.parse(this.props.route.params.user.loc)
        this.setState({
            lat : loc.lat,
            long : loc.long
        })
        Geolocation.getCurrentPosition((loc)=>{
            console.log(loc)
            this.setState({
                    lat : loc.coords.latitude,
                    long : loc.coords.longitude
            })
        },
        error => Alert.alert('Error', JSON.stringify(error)),
        {enableHighAccuracy: true, timeout: 50000, maximumAge: 1000},
        )
    }
    handleUpdateLoc = ()=>{
        
        var content = {
            loc : JSON.stringify({
                lat : this.state.lat,
                long : this.state.long,
            }),
            updated_at : moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
        }
        
        this.props.updateUser(content,this.props.user.auth.token).then((res)=>{
            console.log('Update loc done')
        }).catch((err)=>{
            console.log(err.response)
        })
    }
    handleMoveRegion = (data)=>{
        this.map.animateToRegion({
            latitude: data.lat,
            longitude: data.long,
            latitudeDelta: 0.0001,
            longitudeDelta: 0.0071}, 2000)
    }

    render() {
        const data = this.props.route.params.user
        const list = this.props.home.friend.filter((row,index)=>{
            return row.acc_at !== null
        })
        const marker = list.map((row,index)=>{
            return this.props.user.auth.id == row.id_friends ? {
                latitude: JSON.parse(row.loc).lat,
                longitude: JSON.parse(row.loc).long,
                latitudeDelta: 0.02,
                longitudeDelta: 0.02,
            } : {
                latitude: JSON.parse(row.friendLoc).lat,
                longitude: JSON.parse(row.friendLoc).long,
                latitudeDelta: 0.02,
                longitudeDelta: 0.02,
            }
        })
        const loc = data.id == this.props.user.auth.id ? JSON.parse(this.props.route.params.user.loc) : JSON.parse(this.props.route.params.user.loc)
        return (
            <View style={style.content}>
                <TouchableOpacity
                onPress={()=>{this.props.navigation.goBack()}} 
                style={style.backBtn}>
                    <IonIcon name="arrow-back" size={27}/>
                </TouchableOpacity>
                        <MapView
                            // showsUserLocation
                            ref={map => this.map = map} 
                            style={style.maps}
                            initialRegion={{
                            latitude: data.id == this.props.user.auth.id ? this.state.lat : loc.lat,
                            longitude: data.id == this.props.user.auth.id ? this.state.long : loc.long,
                            latitudeDelta: 0.0002,
                            longitudeDelta: 0.0091,
                            }}
                            onLayout={()=>{this.map.fitToCoordinates(marker,{
                                edgePadding: {
                                    top: 100,
                                    right: 100,
                                    bottom: 100,
                                    left: 100,
                                },
                                animated: true,
                            })}}
                            showsTraffic={true}
                    >
                            <Marker
                                draggable
                                coordinate={{latitude : data.id == this.props.user.auth.id ? this.state.lat : loc.lat, 
                                longitude: data.id == this.props.user.auth.id ? this.state.long : loc.long}}
                                title={data.name}
                                onDragEnd={(e) => console.log(e)}>
                                <View style={style.markerOuter}>
                                <Image
                                source={{uri : `${API_URL}uploads/${data.image}`}}
                                style={style.marker}
                                />
                                    <View style={style.dot}>
                                    </View>
                                </View>
                            </Marker>
                            {/* {
                                list.map((row,index)=>{
                                    return console.log(JSON.parse(row.friendLoc).lat)
                                })
                            } */}
                            {
                                list.map((row,index)=>{
                                    return this.props.user.auth.id == row.id_friends ? (
                                        <Marker
                                        key={index}
                                        identifier={`id${index}`}
                                            coordinate={{latitude : JSON.parse(row.loc).lat, 
                                            longitude: JSON.parse(row.loc).long}}
                                            title={row.name}
                                            >
                                            <View style={style.markerOuter}>
                                            <Image
                                            source={{uri : `${API_URL}uploads/${row.image}`}}
                                            style={style.marker}
                                            />
                                                <View style={style.dot}>
                                                </View>
                                            </View>
                                        </Marker>
                                    ) : (
                                        <Marker
                                        key={index}
                                        identifier={`id${index}`}
                                            coordinate={{latitude : JSON.parse(row.friendLoc).lat, 
                                            longitude: JSON.parse(row.friendLoc).long}}
                                            title={row.friendName}>
                                            <View style={style.markerOuter}>
                                            <Image
                                            source={{uri : `${API_URL}uploads/${row.friendImage}`}}
                                            style={style.marker}
                                            />
                                                <View style={style.dot}>
                                                </View>
                                            </View>
                                        </Marker>
                                    )
                                })
                            }
                        </MapView>
                <View style={style.list}>
                <FlatList
                    data={list}
                    horizontal
                    renderItem={({item : row})=>{
                        return (
                            this.props.user.auth.id == row.id_friends ? (
                                <TouchableOpacity 
                                    onPress={()=>{
                                        this.handleMoveRegion(
                                            {   lat : JSON.parse(row.loc).lat,
                                                long : JSON.parse(row.loc).long
                                            })
                                        }}
                                style={style.card}>
                                    <View style={style.profileHead}>
                                        <Image source={{uri : `${API_URL}uploads/${row.image}`}} style={style.profile}/>
                                        <View style={style.detail}>
                                        <Text style={style.name}> {row.name} </Text>
                                        <Text style={style.time}> {moment(row.updated_at).fromNow()} </Text>
                                        <Text style={style.time}> </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ): (
                                <TouchableOpacity 
                                    onPress={()=>{
                                        this.handleMoveRegion(
                                            {   lat : JSON.parse(row.friendLoc).lat,
                                                long : JSON.parse(row.friendLoc).long
                                            })
                                        }}
                                style={style.card}>
                                    <View style={style.profileHead}>
                                        <Image source={{uri : `${API_URL}uploads/${row.friendImage}`}} style={style.profile}/>
                                        <View style={style.detail}>
                                        <Text style={style.name}> {row.friendName} </Text>
                                        <Text style={style.time}> {moment(row.friendUpdated_at).fromNow()} </Text>
                                        <Text style={style.time}> </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                        )
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    extraData={this.state.selectedId}
                />
                </View>
            </View>
        )
    }
}
const mapStateToProps = state=>({
    user : state.auth,
    home : state.home
})
const mapDispatchToProps = {updateUser}
export default connect(mapStateToProps,mapDispatchToProps)(FriendsMapScreen)