import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './reducers/configureStore';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import React from 'react';
import App from './App';
//import { store, persistor } from './createStore'

ReactDOM.render(<Provider store={store}><PersistGate loading={null} persistor={persistor}><App /></PersistGate></Provider>, document.getElementById('root'));
