import { ADD_EVENT, ADD_EVENT_FAIL, ADD_EVENT_SUCCESS  } from "../types/addevents.types";
import { EventInterface } from "../../interfaces/Event.interface";
import { IndexedDB } from "../../helpers/IndexedDB";

const db = new IndexedDB('hackIdeas', 'users', 1);

export const addEvent = (data: EventInterface) => {
    return (dispatch: any) => {
        dispatch({ type: ADD_EVENT });
        db.save('events', data).then((res) => {
            dispatch({ type: ADD_EVENT_SUCCESS, events: res });
        }).catch((err) => {
            dispatch({ type: ADD_EVENT_FAIL });
        })
    }
}