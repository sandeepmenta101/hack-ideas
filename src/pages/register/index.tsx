import React, { SyntheticEvent, useState, useEffect } from "react";
import { Form, Button, Container, Row, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import styles from "../../styles/login.module.scss";
import { registerEmployee } from '../../redux/actions/register.actions';
import { RootState } from '../../store';
export default function Register() {
  const [formData, setFormData] = useState({
    employeeId: "",
    employeeName: "",
  });
  const dispatch = useDispatch();
  const [disableSubmit, setDisableSubmit] = useState(true);
  const { apiStatus, apiResponse } = useSelector((state: RootState)=> state.register);
  const [toggleAlert, setToggleAlert] = useState(false);

  useEffect(() => {
	  if(apiStatus === 'Fail'){
		setToggleAlert(true);
	  }else if(apiStatus === 'Success'){
		setToggleAlert(true);
	  }else if(apiStatus.length === 0){
      setToggleAlert(false);
    }
  }, [apiStatus]);

  useEffect(() => {
	  const formValues = Object.values(formData);
	if(formValues.every((value) => value.length > 0)){
		setDisableSubmit(false);
	}else{
		setDisableSubmit(true);
	}
  }, [formData]);

  const registerToApp = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(registerEmployee(formData));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  return (
    <Container>
		{toggleAlert && <Alert show={toggleAlert} variant={apiStatus === 'Fail' ? 'danger' : 'success'} className="mt-2" dismissible onClose={() => setToggleAlert(false)}><p>{apiResponse}</p></Alert>}  
      <Row className={`justify-content-center align-items-center ${styles.form}`}>
        <Form className="col-6 border">
          <h1 className={styles.textCenter}>Register</h1>
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
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className={styles.floatLeft}>Employee Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              onChange={handleInputChange}
              value={formData.employeeName}
              name="employeeName"
              required
            />
          </Form.Group>
          <Button
            variant="success"
            type="submit"
            onClick={registerToApp}
            className="col-12"
            disabled={disableSubmit}
          >
            Register
          </Button>
          <div className="row col-12 mt-1 text-center"><Link to="/login">Login</Link></div>
        </Form>
      </Row>
    </Container>
  );
}
