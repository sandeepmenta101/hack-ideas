
import { FETCH_EVENTS, FETCH_EVENTS_FAIL, FETCH_EVENTS_SUCCESS } from '../types/dashboard.types';

const initialState = {
    isLoading: false,
    events: [],
    apiStatus: '',
    apiResponse: ''
}

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case FETCH_EVENTS: {
            return { ...state, isLoading: true }
        }
        case FETCH_EVENTS_FAIL:
            return {
                ...state,
                isLoading: false,
                apiStatus: 'Fail',
                apiResponse: action.type ?? 'Failed to login'
            }
        case FETCH_EVENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                apiStatus: 'Success',
                apiResponse: action.type ?? 'Successfully logged in',
                events: action.events
            }
        default:
            return state;
    }
}
export default reducer;