import { USER_SET, USER_LOGIN_ERROR } from './userActions'

const initialState = { user: null, error: '' }

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_SET:
      return { ...state, user: action.payload, error: '' }
    case USER_LOGIN_ERROR:
      return { ...state, user: null, error: action.payload }
    default:
      return state
  }
}
export default reducer
