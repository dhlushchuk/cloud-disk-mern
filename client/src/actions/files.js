import axios from "axios"
import { addUploadFile, changeUploadFile, showUploader } from "./upload"
import { SET_FILES, SET_CURRENT_DIR, ADD_FILE, SET_POPUP_DISPLAY, PUSH_TO_STACK, DELETE_FILE, SET_VIEW } from '../utils/types'
import { hideLoader, showLoader } from "./app"
import { API_URL } from '../config'

export const setFiles = files => (
    {
        type: SET_FILES,
        payload: files
    }
)

export const setCurrentDir = dir => (
    {
        type: SET_CURRENT_DIR,
        payload: dir
    }
)

export const addFile = file => (
    {
        type: ADD_FILE,
        payload: file
    }
)

export const setPopupDisplay = display => (
    {
        type: SET_POPUP_DISPLAY,
        payload: display
    }
)

export const pushToStack = dir => (
    {
        type: PUSH_TO_STACK,
        payload: dir
    }
)

export const deleteFileAction = dirId => (
    {
        type: DELETE_FILE,
        payload: dirId
    }
)

export const changeView = payload => (
    {
        type: SET_VIEW,
        payload
    }
)

export const getFiles = (dirId, sort) => {
    return async dispatch => {
        try {
            dispatch(showLoader())
            const token = localStorage.getItem('token')
            if(!token) return localStorage.removeItem('token')
            let url = `${API_URL}api/files`
            if(dirId) url = `${API_URL}api/files?parent=${dirId}`
            if(sort) url = `${API_URL}api/files?sort=${sort}`
            if(dirId && sort) url = `${API_URL}api/files?parent=${dirId}&sort=${sort}`
            const { data } = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            dispatch(setFiles(data))
        } catch (error) {
            alert(error.response.data.message)
        } finally {
            dispatch(hideLoader())
        }
    }
}

export const searchFiles = search => {
    return async dispatch => {
        try {
            dispatch(showLoader())
            const token = localStorage.getItem('token')
            if(!token) return localStorage.removeItem('token')
            const { data } = await axios.get(`${API_URL}api/files/search?search=${search}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            dispatch(setFiles(data))
        } catch (error) {
            alert(error)
        } finally {
            dispatch(hideLoader())
        }
    }
}

export const uploadFile = (file, dirId) => {
    return async dispatch => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return localStorage.removeItem('token')
            const formData = new FormData()
            formData.append('file', file)
            if(dirId) formData.append('parent', dirId)
            const uploadFile = {name: file.name, progress: 0, id: Date.now()}
            dispatch(showUploader())
            dispatch(addUploadFile(uploadFile))
            const { data } = await axios.post(`${API_URL}api/files/upload/`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                onUploadProgress: progressEvent => {
                    const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                    if (totalLength) {
                        uploadFile.progress = Math.round((progressEvent.loaded * 100) / totalLength)
                        dispatch(changeUploadFile(uploadFile))
                    }
                }
            })
            dispatch(addFile(data))
        } catch (error) {
            alert(error.response.data.message)
        }
    }
}

export const downloadFile = async file => {
    try {
        const token = localStorage.getItem('token')
        if(!token) return localStorage.removeItem('token')
        const response = await fetch(`${API_URL}api/files/download?id=${file._id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if(response.status === 200) {
            const blob = await response.blob()
            const downloadURL = window.URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = downloadURL
            link.download = file.name
            document.body.appendChild(link)
            link.click()
            link.remove()
        }
    } catch (error) {
        alert(error)
    }
}

export const deleteFile = file => {
    return async dispatch => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return localStorage.removeItem('token')
            const response = await axios.delete(`${API_URL}api/files?id=${file._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            dispatch(deleteFileAction(file._id))
            alert(response.data.message)
        } catch (error) {
            alert(error.response.data.message)
        }
    }
}

export const createDir = (dirId, name) => {
    return async dispatch => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return localStorage.removeItem('token')
            const { data } = await axios.post(`${API_URL}api/files`, {
                name, 
                parent: dirId,
                type: 'dir'
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            dispatch(addFile(data))
        } catch (error) {
            alert(error.response.data.message)
        }
    }
}