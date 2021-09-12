import { ADD_EVENT, ADD_EVENT_FAIL, ADD_EVENT_SUCCESS } from "../types/addevents.types";

const initialState = {
    isLoading: false,
    apiStatus: '',
    apiResponse: '',
    event: {}
}

const reducer = (state=initialState, action: any) => {
    switch(action.type){
        case ADD_EVENT:
            return {
                ...state,
                isLoading: true,
            }
        case ADD_EVENT_FAIL:
            return {
                ...state,
                isLoading: false,
                apiResponse: 'Failed to create event',
                apiStatus: 'Fail'
            }
        case ADD_EVENT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                apiResponse: 'Successfully created event',
                apiStatus: 'Success'
            }
        default: 
            return state;
    }
}

export default reducer;