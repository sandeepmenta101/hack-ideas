import { LoginInterface } from "../../interfaces/Login.interface";
import { IndexedDB } from '../../helpers/IndexedDB';
import { LOGIN_EMPLOYEE, LOGIN_EMPLOYEE_FAIL, LOGIN_EMPLOYEE_SUCCESS } from '../types/login.types';

const indexedDB = new IndexedDB('hackIdeas', 'users', 1);

export const loginEmployee = (data: LoginInterface) => {
    return (dispatch: any) => {
        dispatch({ type: LOGIN_EMPLOYEE });
        indexedDB.isEmployeeExist('employees', data).then((res) => {
            dispatch({ type: LOGIN_EMPLOYEE_SUCCESS, employee: res });
        }).catch((err) => {
            dispatch({ type: LOGIN_EMPLOYEE_FAIL });
        })
    }
}