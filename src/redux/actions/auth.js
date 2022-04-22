import axios from 'axios'
import { API_URL } from '@env'
export const login = data => {
    return {
        type : 'LOGIN',
        payload :
        axios({
            method: 'POST',
            url : `${API_URL}api/users/login`,
            data : {
                email : data.username,
                password : data.password
            }
        })
    }
}

export const logout = () => {
    return {
        type : "LOGOUT"
    }
}

export const register = data =>{
    return {
        type : 'REGISTER',
        payload : 
        axios({
            method: 'POST',
            url : `${API_URL}api/users/registers`,
            data : {
                name : data.name,
                email : data.email,
                password : data.password,
            }
        })
    }
}

export const updateUser = (data,token) =>{
    return {
        type : 'UPDATE',
        payload : 
        axios({
            method: 'PUT',
            url : `${API_URL}api/users`,
            data : data,
            headers : {
                Authorization : token
            }
        })
    }
}