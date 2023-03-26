
import { createStore } from 'redux';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { persistStore, persistReducer } from 'redux-persist'

import rootReducer from './rootReducer';
const persistConfig = {
    key: 'root',
    storage,
  }
  
  const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer);
let persistor = persistStore(store)


export {store, persistor};