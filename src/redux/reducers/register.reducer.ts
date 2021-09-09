import { REGISTER_EMPLOYEE, REGISTER_EMPLOYEE_FAIL, REGISTER_EMPLOYEE_SUCCESS } from '../types/register.types';


const initialState = {
    isAuthenticated: false,
    darkTheme: false,
    employeeId: '',
    loading: false,
    apiStatus: '',
    apiResponse: ''
}

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case REGISTER_EMPLOYEE: {
            return {
                ...state,
                loading: true
            }
        }
        case REGISTER_EMPLOYEE_FAIL:
            return {
                ...state,
                loading: false,
                apiStatus: 'Fail',
                apiResponse: action.payload ?? 'Failed to REGISTER'
            }
        case REGISTER_EMPLOYEE_SUCCESS:
            return {
                ...state,
                loading: false,
                apiStatus: 'Success',
                apiResponse: action.payload ?? 'Successfully logged in',
                employeeId: action.payload.employeeId
            }
        default:
            return state;
    }
}

export default reducer;