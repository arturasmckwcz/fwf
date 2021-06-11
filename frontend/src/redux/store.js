import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './reducers'

const composeEnhancers = composeWithDevTools({ trace: true })

const store =
  process.env.REACT_APP_RUN_ENVIROMENT === 'development'
    ? createStore(reducer, composeEnhancers(applyMiddleware(thunk)))
    : createStore(reducer, applyMiddleware(thunk))
export default store
