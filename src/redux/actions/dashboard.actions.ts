import { IndexedDB } from '../../helpers/IndexedDB';
import { FETCH_EVENTS, FETCH_EVENTS_FAIL, FETCH_EVENTS_SUCCESS, SORT_BY_TAG } from '../types/dashboard.types';

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