import { LOGIN_EMPLOYEE, LOGIN_EMPLOYEE_FAIL, LOGIN_EMPLOYEE_SUCCESS } from '../types/login.types';

const initialState = { isAuthenticated: false, darkTheme: false, employeeId: '', loading: false, apiStatus: '', apiResponse: '' }
const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case LOGIN_EMPLOYEE: {
            return { ...state, loading: true }
        }
        case LOGIN_EMPLOYEE_FAIL:
            return {
                ...state,
                loading: false,
                apiStatus: 'Fail',
                apiResponse: action.payload ?? 'Failed to login'
            }
        case LOGIN_EMPLOYEE_SUCCESS:
            return {
                ...state,
                loading: false,
                apiStatus: 'Success',
                apiResponse: action.payload ?? 'Successfully logged in',
                employeeId: action.payload.employeeId
            }
        default:
            return state;
    }
}
export default reducer;