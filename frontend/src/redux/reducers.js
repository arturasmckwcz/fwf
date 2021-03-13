import { combineReducers } from 'redux'

import { menuReducer } from './menu/menuReducer'

export default combineReducers({
  menu: menuReducer,
})
