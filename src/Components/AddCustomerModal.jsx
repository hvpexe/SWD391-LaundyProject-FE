import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import request from "../Utils/request";
function AddCustomerModal(props) {
  const [show, setShow] = useState(false);
  let email = "";
  let firstName = "";
  let lastName = "";
  let phoneNumber = "";
  let address = "";

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = async () => {
    const data = {
      email,
      fullName: firstName + " " + lastName,

      phoneNumber,
      address,
    };
    await request.post("v1/Customer/Add", data);

    request
      .get("v1/Customer/GetAll/0/100")
      .then((response) => {
        console.log(props);
        console.log(response.data.items);
        props.setCustomersData(response.data.items);
        });
      
    handleClose();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
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
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddCustomerModal;
