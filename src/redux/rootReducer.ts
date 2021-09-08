import { combineReducers } from 'redux';

import loginReducer from './reducers/login.reducer';
const rootReducer = combineReducers({
    login: loginReducer,
})

export default rootReducer;