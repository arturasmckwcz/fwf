import { MENU_SELECT } from './menuActions'

const initialState = { selected: null }

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case MENU_SELECT:
      return { ...state, selected: action.payload }
    default:
      return state
  }
}
export default reducer
