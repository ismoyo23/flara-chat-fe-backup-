import React, { Component } from 'react'
import { Text, View,Image,ScrollView,TouchableOpacity,Alert,ActivityIndicator } from 'react-native'
import style from './style'
import ImagePicker from 'react-native-image-picker';
import IonIcon from 'react-native-vector-icons/Ionicons'
import BackButton from '../../components/backComponets'
import {logout,updateUser} from '../../redux/actions/auth'
import { connect } from 'react-redux'
import {API_URL} from '@env'
import {Input} from 'galio-framework'

class EditeScreen extends Component {
    constructor(props){
        super(props)
        this.state= {
            LogoutLoading : false,
            isLoading : false,
            name : 'Flarista',
            bio : '',
            srcImg : {},
            uri : null,
            fileName : '',
            type : null

        }
    }
    handleLogout = ()=>{
        this.props.logout()
        this.setState({
            LogoutLoading : true
        })
    }
    handleSubmit = ()=>{
        this.setState({
            isLoading : true
        })
        var formData = new FormData();
        formData.append('bio',this.state.bio)
        formData.append('name',this.state.name)
        if(this.state.uri){
            formData.append('image',{
                uri: this.state.srcImg.uri,
                type: this.state.type,
                name: this.state.fileName,
            })
        }

        var data = {
            token : this.props.user.auth.token,
        }
        this.props.updateUser(formData,data.token).then((res)=>{
            // console.log(res)
            Alert.alert(
                'Success!!',
                'Your Profile has been change',
                [
                    { text: 'OK', onPress: () => this.props.navigation.goBack() }
                ],
                { cancelable: false }
            )
            this.setState({
                isLoading : false
            })
        }).catch((err)=>{
            console.log(err.response)
        })
    }
    choosePicture = () => {
        var options = {
            title: 'Choose Image',
            storageOptions: {
              skipBackup: true,
              path: 'images'
            }
        };
        ImagePicker.showImagePicker(options, (response) => {
            // console.log('Response = ', response);
            if (response.didCancel) {
              console.log('User cancelled image picker');
            }
            else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            }
            else {
                if(response.fileSize >= 2097152){
                    Alert.alert(
                        'Oopss!!',
                        'Image Is To large no more then 2 mb',
                        [
                            { text: 'OK', onPress: () => console.log('OK Pressed') }
                        ],
                        { cancelable: false }
                    )
                }
                else{
                    this.setState({
                      srcImg: { uri: response.uri },
                      uri: response.uri,
                      fileName: response.fileName,
                      type : response.type
                    })
                }
            }
        });
    }
    componentDidMount(){
        this.setState({
            bio : this.props.user.auth.bio,
            name : this.props.user.auth.name
        })
    }
    render() {
        const data = this.props.user.auth
        return (
            <View style={style.container}>
                <ScrollView>
                <View style={style.header}>
                    {
                        this.state.uri ? 
                        (<Image source={{uri : this.state.uri}} style={style.profile}/>) 
                        : 
                        (<Image source={{uri : `${API_URL}uploads/${this.props.user.auth.image}`}} style={style.profile}/>)
                    }
                    <View style={style.action}>
                        <TouchableOpacity 
                        onPress={this.choosePicture}
                        style={style.icon}>
                            <IonIcon name="image-outline" size={25} style={{color: 'white'}}/>
                        </TouchableOpacity>
                        <Input placeholder="name" value={this.state.name} rounded borderless={true} placeholderTextColor={'#D4D7DE'} color={'black'} onChangeText={text=>this.setState({name : text})}/>
                        <TouchableOpacity 
                        onPress={this.handleSubmit} 
                        style={style.icon}>
                            {
                                this.state.isLoading ? (
                                    <ActivityIndicator color={'white'}/>
                                ) : (
                                <IonIcon name="bookmark-outline" size={25} style={{color: 'white'}}/>
                                )
                            }
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={style.content}>
                    <Text style={style.title} onPress={()=>{console.log(this.props.user)}}>
                        Bio
                    </Text>
                    <View>
                    <Input placeholder="Write whats your think" value={this.state.bio} rounded borderless={true} placeholderTextColor={'#D4D7DE'} color={'black'} onChangeText={text=>this.setState({bio : text})}/>
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
const mapDispatchToProps = {logout,updateUser}
export default connect(mapStateToProps,mapDispatchToProps)(EditeScreen)
