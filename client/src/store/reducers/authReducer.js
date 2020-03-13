import {AUTHENTICATION_SET_IS_AUTHENTICATED} from '../../shared/constants'

const initialState = {
    isAuthenticated: false,
    user: {}
}
export default (state = initialState, action ) => {
    switch(action.type) {
        case AUTHENTICATION_SET_IS_AUTHENTICATED:
            return {
                ...state,
                isAuthenticated: action.payload
            }
        default: return state;
    }
}