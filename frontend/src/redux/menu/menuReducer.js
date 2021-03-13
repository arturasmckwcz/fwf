import { NEW_PATIENT, NEW_SOURCE, NEW_PRESCRIPTION } from './menuActions'

const initialState = { selected: null }

export const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEW_PATIENT:
      return { ...state, selected: NEW_PATIENT }
    case NEW_PRESCRIPTION:
      return { ...state, selected: NEW_PRESCRIPTION }
    case NEW_SOURCE:
      return { ...state, selected: NEW_SOURCE }
    default:
      return state
  }
}
