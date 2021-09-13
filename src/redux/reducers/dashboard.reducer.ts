
import { EventInterface } from '../../interfaces/Event.interface';
import { FETCH_EVENTS, FETCH_EVENTS_FAIL, FETCH_EVENTS_SUCCESS, SORT_BY_TAG, VOTED, VOTED_FAIL, VOTED_SUCCESS } from '../types/dashboard.types';

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
            let sortedEvents: EventInterface[] = [];
            if(action.sortBy === 'startDate'){
                sortedEvents = eventsData.sort((a: EventInterface, b: EventInterface) => {
                    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
                })
            }else if(action.sortBy === 'endDate'){
                sortedEvents = eventsData.sort((a: EventInterface, b: EventInterface) => {
                    return new Date(b.endDate).getTime() - new Date(a.endDate).getTime();
                })
            }else if(action.sortBy === 'votes'){
                sortedEvents = eventsData.sort((a: EventInterface, b: EventInterface) => {
                    return b.votes - a.votes;
                });
            }
            return {
                ...state,
                isLoading: false,
                apiStatus: '',
                apiResponse: '',
                events: sortedEvents
            }
        case VOTED:
            return {
                ...state,
                isLoading: false,
                apiResponse: '',
                apiStatus: ''
            }
        case VOTED_FAIL:
            return {
                ...state,
                isLoading: false,
                apiResponse: 'Failed to vote',
                apiStatus: 'Fail Vote',
            }
        case VOTED_SUCCESS:
            return {
                ...state,
                isLoading: false,
                apiResponse: 'Successfully voted',
                apiStatus: 'Success voted',
                events: action.events
            }
        default:
            return state;
    }
}
export default reducer;