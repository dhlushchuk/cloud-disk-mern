import { SHOW_UPLOADER, HIDE_UPLOADER, ADD_UPLOAD_FILE, REMOVE_UPLOAD_FILE, CHANGE_UPLOAD_FILE } from '../utils/types'

export const showUploader = () => ({
    type: SHOW_UPLOADER
})

export const hideUploader = () => ({
    type: HIDE_UPLOADER
})

export const addUploadFile = file => ({
    type: ADD_UPLOAD_FILE,
    payload: file
})

export const removeUploadFile = fileId => ({
    type: REMOVE_UPLOAD_FILE,
    payload: fileId
})

export const changeUploadFile = payload => ({
    type: CHANGE_UPLOAD_FILE,
    payload
})