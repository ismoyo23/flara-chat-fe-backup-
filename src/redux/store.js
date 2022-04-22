import {createStore,applyMiddleware} from 'redux';
// import logger from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import rootReducer from './reducers'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage';

const persistConfig = {
    key: 'root',
    storage : AsyncStorage,
    whitelist : ["auth"],
    // blacklist : ["book"],
  }
  
  const persistedReducer = persistReducer(persistConfig, rootReducer) // persist reducer
  
  export default () => {
    let storeCon = createStore(persistedReducer,applyMiddleware(promiseMiddleware))
    let persistor = persistStore(storeCon)
    return { storeCon, persistor }
  }
// export default createStore(
//     rootReducer,
//     applyMiddleware(promiseMiddleware,logger)
// );