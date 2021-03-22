export const LIST_SHOW = 'LIST_SHOW'
export const LIST_HIDE = 'LIST_HIDE'

export const listShow = list => ({ type: LIST_SHOW, payload: list })
export const listHide = () => ({ type: LIST_HIDE })
