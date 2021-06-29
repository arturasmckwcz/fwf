import {
  UPLOAD,
  DOWNLOAD,
  LIST,
  SET_NEXT,
  GOTO_NEXT,
  SET_BACK,
} from './pageTypes'

export const setUploadPage = () => ({ type: UPLOAD })
export const setDownloadPage = () => ({ type: DOWNLOAD })
export const setListPage = () => ({ type: LIST })
export const setBackPage = () => ({ type: SET_BACK })
export const setPageFromNext = () => ({ type: GOTO_NEXT })
export const setNextPage = page => ({ type: SET_NEXT, payload: page })
