import { combineReducers } from 'redux'

import user from './user/userReducer'
import menu from './menu/menuReducer'
import form from './form/formReducer'
import list from './list/listReducer'
import person from './person/personReducer'
import doctor from './doctor/doctorReducer'
import clinic from './clinic/clinicReducer'

export default combineReducers({
  user,
  menu,
  form,
  list,
  person,
  doctor,
  clinic,
})
