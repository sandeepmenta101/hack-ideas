import React, { SyntheticEvent, useState, useEffect } from "react";
import { Form, Button, Container, Row, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router";

import styles from "../../styles/login.module.scss";
import { RootState } from '../../store';
import { loginEmployee } from '../../redux/actions/login.actions';
import useLocalStorage from "../../customHooks/useLocalStorage";
export default function Login() {
  const [formData, setFormData] = useState({
    employeeId: "",
  });
  const [toggleAlert, setToggleAlert] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(true);
  const { apiResponse, apiStatus, employeeName, isAuthenticated } = useSelector((state: RootState) => state.login);
  const dispatch = useDispatch();
  const history = useHistory();
  const [employee, setEmployee] = useLocalStorage('employee');

  useEffect(() => {
    if(apiStatus === 'Fail'){
      setToggleAlert(true);
    }else if(apiStatus === 'Success'){
      setToggleAlert(true);
      history.push('/dashboard');
      setEmployee({ isAuthenticated, employeeName });
    }else if(apiStatus.length === 0){
      setToggleAlert(false);
    }
  }, [apiStatus]);

  const loginToApp = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginEmployee(formData));
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
    if(value.length > 0){
      setDisableSubmit(false);
    }else{
      setDisableSubmit(true);
    }
  };

  return (
    <Container>
      {toggleAlert && <Alert show={toggleAlert} variant={apiStatus === 'Fail' ? 'danger' : 'success'} className="mt-3" dismissible onClose={() => setToggleAlert(false)}><p>{apiResponse}</p></Alert>}
      <Row className={`justify-content-center align-items-center ${styles.form}`}>
        <Form className="col-6 border">
          <h1>Login</h1>
          <Form.Group className="mb-3" controlId="formBasicEmail">                 
            <Form.Label className={styles.floatLeft}>Employee ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Employee ID"
              onChange={handleInputChange}
              value={formData.employeeId}
              name="employeeId"
              required
            />
          </Form.Group>
          <Button
            variant="success"
            type="submit"
            onClick={loginToApp}
            className="col-12"
            disabled={disableSubmit}
          >
            Login
          </Button>
          <div className="col-12 mt-2 text-center">
            <Link to="/register">Register</Link>
          </div>
        </Form>
      </Row>
    </Container>
  );
}

