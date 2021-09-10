import React, { SyntheticEvent, useState } from "react";
import { Form, Button, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "../../styles/login.module.scss";
export default function Register() {
  const [formData, setFormData] = useState({
    employeeId: "",
    disableSubmit: true,
    employeeName: "",
  });
  const registerToApp = (e: SyntheticEvent) => {
    e.preventDefault();
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      return {
        ...prevState,
        [name]: value,
        disableSubmit: value.length > 0 ? false : true,
      };
    });
  };

  return (
    <Container>
                  
      <Row
        className={`justify-content-center align-items-center ${styles.form}`}
      >
                        
        <Form className="col-6 border">
                              <h1>Register</h1>                    
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
            className="col-md-6"
            disabled={formData.disableSubmit}
          >
                                    Register                    
          </Button>
                              
          <div className="row col-12 mt-1">
                                    <Link to="/login">Login</Link>
                                
          </div>
                          
        </Form>
                    
      </Row>
              
    </Container>
  );
}
