import { FORM_SHOW, FORM_HIDE, FORM_HIDE_ALL, FORM_ACTIVE } from './formActions'

const initialState = { active: null, show: [] }

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FORM_SHOW:
      return { ...state, show: [...state.show, action.payload] }
    case FORM_HIDE:
      return {
        ...state,
        show: state.show.filter(form => form !== action.payload),
      }
    case FORM_HIDE_ALL:
      return { ...state, show: [] }
    case FORM_ACTIVE:
      return { ...state, active: action.payload }
    default:
      return state
  }
}

export default reducer
