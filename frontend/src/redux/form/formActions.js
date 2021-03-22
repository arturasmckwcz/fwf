export const FORM_SHOW = 'FORM_SHOW'
export const FORM_HIDE = 'FORM_HIDE'
export const FORM_HIDE_ALL = 'FORM_HIDE_ALL'
export const FORM_ACTIVE = 'FORM_ACTIVE'

export const formShow = form => ({ type: FORM_SHOW, payload: form })
export const formHide = form => ({ type: FORM_HIDE, payload: form })
export const formHideAll = () => ({ type: FORM_HIDE_ALL })
export const formActive = form => ({ type: FORM_ACTIVE, payload: form })
