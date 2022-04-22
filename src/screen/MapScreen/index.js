import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity,Alert,Dimensions } from 'react-native'
import MapView,{ Marker, AnimatedRegion } from 'react-native-maps';
import style from './style'
import felin from '../../images/felin.jpg'
import IonIcon from  'react-native-vector-icons/Ionicons'
import {API_URL} from '@env'
import { connect } from 'react-redux';
import Geolocation from '@react-native-community/geolocation';
import Axios from 'axios';
import moment from 'moment'
import {updateUser} from '../../redux/actions/auth'


class MapScreen extends Component {
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
            },()=>{
                if(this.props.route.params.user.id == this.props.user.auth.id){
                    this.map.animateToRegion({
                        latitude: this.state.lat,
                        longitude: this.state.long,
                        latitudeDelta: 0.0002,
                        longitudeDelta: 0.0091}, 2000)

                }
            })
            // this.map.animateToRegion({
            //     latitude: coords.latitude,
            //     longitude: coords.longitude,
            //     latitudeDelta: 0.005,
            //     longitudeDelta: 0.005
            //   })
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
    render() {
        const data = this.props.route.params.user
        const loc = data.id == this.props.user.auth.id ? JSON.parse(this.props.route.params.user.loc) : JSON.parse(this.props.route.params.user.loc)
        return (
            <View style={style.content}>
                <TouchableOpacity
                onPress={()=>{this.props.navigation.goBack()}} 
                style={style.backBtn}>
                    <IonIcon name="arrow-back" size={27}/>
                </TouchableOpacity>
                {/* {
                    this.state.lat == 0 ? (<Text>Loading</Text>):( */}
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
                        showsTraffic={true}
                        // onMapReady={}
                    >
                            <Marker
                                onPress={()=>{console.log(data.updated_at)}}
                                draggable
                                coordinate={{latitude : data.id == this.props.user.auth.id ? this.state.lat : loc.lat, 
                                longitude: data.id == this.props.user.auth.id ? this.state.long : loc.long}}
                                title={data.name}
                                onDragEnd={(e) => console.log(e)}
                            >
                                <View style={style.markerOuter}>
                                <Image
                                source={{uri : `${API_URL}uploads/${data.image}`}}
                                style={style.marker}
                                />
                                <View style={style.dot}>
                                    </View>
                                </View>
                            </Marker>
                    </MapView>
                    {/* )
                }  */}
                <View style={style.card}>
                    <View style={style.profileHead}>
                        <Image source={{uri: `${API_URL}uploads/${data.image}`}} style={style.profile}/>
                        <View style={style.detail}>
                        <Text style={style.name}> {data.name} </Text>
                        <Text style={style.time}> {moment(data.updated_at).fromNow()} </Text>
                        <Text style={style.time}> </Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}
const mapStateToProps = state=>({
    user : state.auth
})
const mapDispatchToProps = {updateUser}
export default connect(mapStateToProps,mapDispatchToProps)(MapScreen)