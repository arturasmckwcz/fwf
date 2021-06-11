import { USER_SET } from './userActions'

const initialState = { user: null }

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_SET:
      return { ...state, user: action.payload }
    default:
      return state
  }
}
export default reducer
