import {
  UPLOAD,
  DOWNLOAD,
  LIST,
  SET_NEXT,
  SET_BACK,
  GOTO_NEXT,
} from './pageTypes'

const initialState = { page: LIST, next: UPLOAD }

const pageReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD:
      return { ...state, page: UPLOAD }
    case DOWNLOAD:
      return { ...state, page: DOWNLOAD }
    case LIST:
      return { ...state, page: LIST }
    case SET_NEXT:
      return { ...state, next: action.payload }
    case SET_BACK:
      return { ...state, next: state.page }
    case GOTO_NEXT:
      return { ...state, page: state.next }
    default:
      return state
  }
}
export default pageReducer
