import { LOGIN_EMPLOYEE, LOGIN_EMPLOYEE_FAIL, LOGIN_EMPLOYEE_SUCCESS } from '../types/login.types';

const initialState = { isAuthenticated: false, employeeId: '', loading: false, apiStatus: '', apiResponse: '', employeeName: '' }
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
                apiResponse: 'Failed to login. Please register'
            }
        case LOGIN_EMPLOYEE_SUCCESS:
            return {
                ...state,
                loading: false,
                apiStatus: 'Success',
                apiResponse: action.type ?? 'Successfully logged in',
                employeeId: action.employee.employeeId,
                employeeName: action.employee.employeeName,
                isAuthenticated: true
            }
        default:
            return state;
    }
}
export default reducer;