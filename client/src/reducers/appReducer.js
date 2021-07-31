import { SHOW_LOADER, HIDE_LOADER } from '../utils/types'

const defaultState = {
    loader: false
}

export default function appReducer(state = defaultState, action) {
    switch (action.type) {
        case SHOW_LOADER:
            return {
                ...state,
                loader: true
            }
        case HIDE_LOADER:
        return {
            ...state,
            loader: false
        }
        default:
            return state
    }
}