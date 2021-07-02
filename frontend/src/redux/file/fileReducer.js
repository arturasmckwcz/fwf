import { FILE_SET, FILE_REF_SET } from './fileActions'

const initialState = { list: [], ref: {} }

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FILE_SET:
      return { ...state, list: action.payload }
    case FILE_REF_SET:
      return { ...state, ref: action.payload }
    default:
      return state
  }
}
export default reducer
