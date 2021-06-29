import { INFO_SET } from './infoActions'

import { messageColors } from '../../constants'

const initialState = { color: messageColors.MESSAGE_NORMAL, message: '' }

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INFO_SET:
      return { ...state, ...action.payload }
    default:
      return state
  }
}

export default reducer
