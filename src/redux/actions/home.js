import axios from 'axios'
import {API_URL} from '@env'

export const getHome = data =>{
    return {
        type : "MSG_GET",
        payload : 
        axios({
            method : 'GET',
            url : `${API_URL}api/chat`,
            headers: {
                Authorization : data.token
            }
        })
    }
}

export const getFriend = data=>{
    return {
        type : "GET_FRIEND",
        payload : 
        axios({
            method : 'GET',
            url : `${API_URL}api/friend`,
            headers: {
                Authorization : data.token
            }
        })
    }
}

export const accFriend = data=>{
    return {
        type : "ACC",
        payload : 
        axios({
            method : 'PUT',
            url : `${API_URL}api/friend/${data.id}`,
            headers : {
                Authorization : data.token
            }
        })
    }
}

export const decline = data=>{
    return {
        type : "DECLINE",
        payload : 
        axios({
            method : 'DELETE',
            url : `${API_URL}api/friend/${data.id}`,
            headers : {
                Authorization : data.token
            }
        })
    }
}
