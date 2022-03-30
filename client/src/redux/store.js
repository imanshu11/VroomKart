import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { alertsReducer } from './reducers/alertsReducer';
import { bikesReducer } from './reducers/bikesReducer';
import { bookingsReducer } from './reducers/bookingsReducer';


const composeEnhancers = composeWithDevTools({});

const rootReducer = combineReducers({
    bikesReducer,
    alertsReducer,
    bookingsReducer,
})

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk)
    
  )
);

export default store