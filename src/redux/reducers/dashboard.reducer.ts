
import { FETCH_EVENTS, FETCH_EVENTS_FAIL, FETCH_EVENTS_SUCCESS } from '../actions/dashboard.actions';

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
                apiResponse: action.payload ?? 'Failed to login'
            }
        case FETCH_EVENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                apiStatus: 'Success',
                apiResponse: action.payload ?? 'Successfully logged in',
                events: action.payload
            }
        default:
            return state;
    }
}
export default reducer;