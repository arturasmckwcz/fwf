import { combineReducers } from 'redux'

import listReducer from './list/listReducer'
import pageReducer from './page/pageReducer'

export default combineReducers({ list: listReducer, page: pageReducer })
