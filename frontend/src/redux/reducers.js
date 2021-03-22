import { combineReducers } from 'redux'

import menu from './menu/menuReducer'
import form from './form/formReducer'
import list from './list/listReducer'
import person from './person/personReducer'

export default combineReducers({
  menu,
  form,
  list,
  person,
})
