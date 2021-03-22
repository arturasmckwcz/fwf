import { LIST_SHOW, LIST_HIDE } from './listActions'

const initialState = { list: null }

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LIST_SHOW:
      return { ...state, list: action.payload }
    case LIST_HIDE:
      return { ...state, list: null }
    default:
      return state
  }
}

export default reducer
