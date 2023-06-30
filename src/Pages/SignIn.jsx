import axios from 'axios';
import React, { useContext } from 'react';
import {Form, Button, Row, Col, Container} from 'react-bootstrap';
import { UserContext } from '../App';

export const SignIn = () => {
  let {setAdmin} = useContext(UserContext);

  let email = ''
  let password = ''

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform sign-in logic here, e.g., send form data to the server
    console.log('Email:', email);
    console.log('Password:', password);
    // Reset form fields
    axios.post('http://flaundry.somee.com/api/v1/Admin/Login', {email, password})
    .then(response =>
      {
        localStorage.setItem('token', response.data.jwt)
        setAdmin(response.data.userId)
      } )
      
    .catch(error => console.log(error))

  };

  return (
      <div className="Auth-form-container">
        <Form className="Auth-form" onSubmit={handleSubmit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <Form.Group className="mt-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
              onChange={event => email = event.target.value}
                type="email"
                placeholder="Enter email"
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                onChange={event => password = event.target.value}
              />
            </Form.Group>
            <div className="d-grid gap-2 mt-3">
              <Button variant="outline-primary" type="submit">
                Submit
              </Button>
            </div>
          </div>
        </Form>
      </div>
  );
};

export default SignIn;