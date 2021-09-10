import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import loginReducer from './redux/reducers/login.reducer';
import registerReducer from './redux/reducers/register.reducer';

const rootReducer = combineReducers({
    login: loginReducer,
    register: registerReducer
})

const configureStore = createStore(rootReducer, applyMiddleware(thunk));

export default configureStore;

export type RootState = ReturnType<typeof rootReducer>;