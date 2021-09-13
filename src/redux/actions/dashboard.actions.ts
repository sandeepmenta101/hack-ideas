import { IndexedDB } from '../../helpers/IndexedDB';
import { FETCH_EVENTS, FETCH_EVENTS_FAIL, FETCH_EVENTS_SUCCESS, SORT_BY_TAG, VOTED, VOTED_FAIL, VOTED_SUCCESS } from '../types/dashboard.types';

const indexedDB = new IndexedDB('hackIdeas', 'users', 1);

export const fetchEvents = () => {
    return (dispatch: any) => {
        dispatch({ type: FETCH_EVENTS });
        indexedDB.read('events').then((res) => {
            dispatch({ type: FETCH_EVENTS_SUCCESS, events: res });
        }).catch((err) => {
            dispatch({ type: FETCH_EVENTS_FAIL });
        })
    }
}

export const sortByTag = (data: string) => {
    return (dispatch: any) => {
        dispatch({ type: SORT_BY_TAG, sortBy: data })
    }
}

export const voteEvent = (voted: boolean, eventId: number) => {
    return (dispatch: any) => {
        dispatch({ type: VOTED });
        indexedDB.updateVoteEvent(eventId, voted).then((res: any) => {
            console.log(res);
            dispatch({ type: VOTED_SUCCESS, events: res });
        }).catch((err) => dispatch({ type: VOTED_FAIL }))
    }
}