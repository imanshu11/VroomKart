import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { bikesReducer } from './reducers/bikesReducers';



const composeEnhancers = composeWithDevTools({});

const rootReducer = combineReducers({
    bikesReducer
})

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk)
    
  )
);

export default store