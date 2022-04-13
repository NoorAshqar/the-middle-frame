import { createStore, applyMiddleware  } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import rootReducer from './rootReducer';

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: [],
    blacklist: [],
    debug: true
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(thunk)) //,middleware

const persistor = persistStore(store);

export { store, persistor }

