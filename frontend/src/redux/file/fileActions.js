export const FILE_SET = 'FILE_SET'
export const FILE_REF_SET = 'FILE_REF_SET'

export const setFiles = list => ({ type: FILE_SET, payload: list })
export const setFileRef = ref => ({ type: FILE_REF_SET, payload: ref })
