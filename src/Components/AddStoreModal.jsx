import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import request from "../Utils/request";

function AddStoreModal(props) {
  const [show, setShow] = useState(false);
  let storeName = "";
  let storeAddress = "";

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = async () => {
    const data = {
      storeName,
      storeAddress,
    };
    await request.post("v1/Store/Add", data);
    request.get("v1/Store/GetAll/0/100")
    .then((response) => {
      console.log(response.data.items);
      props.setShopsData(response.data.items);
    })

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
              <Form.Label>Store Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter store name"
                onChange={(e) => (storeName = e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formFirstName">
              <Form.Label> Store Address </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter store address"
                onChange={(e) => (storeAddress = e.target.value)}
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

export default AddStoreModal;
