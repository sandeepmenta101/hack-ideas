import { IndexedDB } from "../../helpers/IndexedDB";
import { REGISTER_EMPLOYEE, REGISTER_EMPLOYEE_FAIL, REGISTER_EMPLOYEE_SUCCESS } from '../types/register.types';
import { RegisterInterface } from "../../interfaces/Register.interface";

const indexedDB = new IndexedDB('hackIdeas', 'users', 1);

export const registerEmployee =  (data: RegisterInterface) => {
    return (dispatch: any) => {
        dispatch({ type: REGISTER_EMPLOYEE });
        indexedDB.save('employees', data).then((res) => {
            dispatch({ type: REGISTER_EMPLOYEE_SUCCESS, employeeId: data.employeeId });
        }).catch(err => {
            dispatch({ type: REGISTER_EMPLOYEE_FAIL });
        })
    }
};