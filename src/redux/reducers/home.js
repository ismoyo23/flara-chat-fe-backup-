const initialState = {
    isLoading : false,
    isError : false,
    errorMsg : '' ,
    successMsg : '',
    HomeMsg : [],
    friend : []
}

const home = (state = initialState,action) =>{
    switch (action.type) {
        case "MSG_GET_PENDING": 
        return {
            ...state,
            isLoading : true
        }
        case "MSG_GET_REJECTED": 
        console.log(action.payload)
        return {
            ...state,
            isLoading : false
        }
        case "MSG_GET_FULFILLED": 
        return {
            ...state,
            HomeMsg : action.payload.data.data
        }
        case "GET_FRIEND_PENDING" : 
        return {
            ...state,
            isLoading : true
        }
        case "GET_FRIEND_REJECTED" : 
        return {
            ...state,
            isLoading : false
        }
        case "GET_FRIEND_FULFILLED" : 
        return {
            ...state,
            isLoading : false,
            friend : action.payload.data.data

        }
        case "ACC" : 
        return {
            ...state,
        }
        case "DECLINE" : 
        return {
            ...state,
        }
        default:
            return state
    }

}

export default home