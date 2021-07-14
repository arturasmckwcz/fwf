import { combineReducers } from 'redux'

import user from './user/userReducer'
import menu from './menu/menuReducer'
import info from './info/infoReducer'
import list from './list/listReducer'
import person from './person/personReducer'
import doctor from './doctor/doctorReducer'
import clinic from './clinic/clinicReducer'
import product from './product/productReducer'
import lysate from './lysate/lysateReducer'
import file from './file/fileReducer'
import patient from './patient/patientReducer'

export default combineReducers({
  user,
  menu,
  info,
  list,
  person,
  doctor,
  clinic,
  product,
  lysate,
  file,
  patient,
})
