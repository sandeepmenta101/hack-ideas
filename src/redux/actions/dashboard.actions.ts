import { IndexedDB } from '../../helpers/IndexedDB';
import { FETCH_EVENTS, FETCH_EVENTS_FAIL, FETCH_EVENTS_SUCCESS } from '../types/dashboard.types';

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