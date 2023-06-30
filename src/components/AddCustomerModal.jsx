import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

function AddCustomerModal() {
  const [show, setShow] = useState(false);
  let email = '';
  let firstName = '';
  let lastName = '';
  let phoneNumber = '';
  let address = '';

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = async () => {
    
    const data = {
        email,
        fullName : firstName + ' ' +  lastName,
        
        phoneNumber,
        address,
      };
    
        const token = localStorage.getItem('token'); // Get the JWT from localStorage
        const response = await axios.post('http://flaundry.somee.com/api/v1/Customer/Add', data, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the JWT in the request headers
          },
        });

    
        

    handleClose();
  };


  return (
    <>
      <Button variant="outline-primary" onClick={handleShow}>
        Add
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Add Customer </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) => (email = e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
              
                onChange={(e) => (firstName = e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
               
                onChange={(e) => (lastName = e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter phone number"
 
                onChange={(e) => (phoneNumber = e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter address"
           
                onChange={(e) => (address = e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="outline-primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddCustomerModal;