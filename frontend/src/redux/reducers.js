import { combineReducers } from 'redux'

import user from './user/userReducer'
import menu from './menu/menuReducer'
import info from './info/infoReducer'
import list from './list/listReducer'
import person from './person/personReducer'
import doctor from './doctor/doctorReducer'
import clinic from './clinic/clinicReducer'

export default combineReducers({
  user,
  menu,
  info,
  list,
  person,
  doctor,
  clinic,
})
