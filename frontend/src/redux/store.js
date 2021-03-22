import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './reducers'

const composeEnhancers = composeWithDevTools({ trace: true })

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))
export default store
