import axios from 'axios'
import { API_URL } from '../config'
import { SET_USER, USER_LOGOUT } from '../utils/types'

export const registration = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}api/user/registration`, {
            email,
            password
        })
        alert(response.data.message)
    } catch (e) {
        alert(e.response.data.message)
    }
}

export const login = (email, password) => {
    return async dispatch => {
        try {
            const response = await axios.post(`${API_URL}api/user/login`, {
                email,
                password
            })
            dispatch(setUser(response.data))
            localStorage.setItem('token', response.data.token)
        } catch (e) {
            alert(e.response.data.message)
        }
    }
}

export const auth = () => {
    return async dispatch => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return localStorage.removeItem('token')
            const response = await axios.get(`${API_URL}api/user/auth`, {headers: {Authorization: `Bearer ${token}`}})
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
        } catch (e) {
            localStorage.removeItem('token')
        }
    }
}

export const setUser = user => (
    {
        type: SET_USER,
        payload: user
    }
)

export const userLogout = () => (
    {
        type: USER_LOGOUT
    }
)

export const uploadAvatar = file => {
    return async dispatch => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return localStorage.removeItem('token')
            const formData = new FormData()
            formData.append('file', file)
            const response = await axios.post(`${API_URL}api/files/avatar`, formData, {headers: {Authorization: `Bearer ${token}`}})
            dispatch(setUser(response.data))
        } catch (e) {
            console.log(e)
        }
    }
}

export const deleteAvatar = () => {
    return async dispatch => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return localStorage.removeItem('token')
            const response = await axios.delete(`${API_URL}api/files/avatar`, {headers: {Authorization: `Bearer ${token}`}})
            dispatch(setUser(response.data))
        } catch (e) {
            console.log(e)
        }
    }
}