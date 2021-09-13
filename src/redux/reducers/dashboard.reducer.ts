
import { EventInterface } from '../../interfaces/Event.interface';
import { FETCH_EVENTS, FETCH_EVENTS_FAIL, FETCH_EVENTS_SUCCESS, SORT_BY_TAG } from '../types/dashboard.types';

const initialState = {
    isLoading: false,
    events: [],
    apiStatus: '',
    apiResponse: ''
}

let eventsData: EventInterface[] = [];
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
            eventsData = action.events;
            return {
                ...state,
                isLoading: false,
                apiStatus: 'Success',
                apiResponse: action.type ?? 'Successfully logged in',
                events: action.events
            }
        case SORT_BY_TAG:
            const filteredEvents = eventsData.filter((event: EventInterface) => {
                if(event.tags.indexOf(action.sortBy) > -1){
                    return event;
                }
            })
            return {
                ...state,
                isLoading: false,
                apiStatus: '',
                apiResponse: '',
                events: filteredEvents
            }
        default:
            return state;
    }
}
export default reducer;