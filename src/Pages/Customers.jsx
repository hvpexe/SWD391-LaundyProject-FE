import React, { useEffect, useState } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit, Toolbar, Sort, Filter } from '@syncfusion/ej2-react-grids';
import { Form, InputGroup, Row, Col, Button} from 'react-bootstrap';
import {customersGrid} from '../Data/dummy';
import {Header} from '../Components';
import axios from 'axios';
import AddCustomerModal from '../Components/AddCustomerModal';

const Customers = () => {
  const [customersData, setCustomersData] = useState([]);

  let email = ''
  let fullName = ''

  useEffect(() => {
    console.log('first time');
    const token = localStorage.getItem('token'); // Retrieve the JWT token from local storage
    const header = { headers: { Authorization: `Bearer ${token}` } }; // Create the authorization header
  
    axios.get('http://flaundry.somee.com/api/v1/Customer/GetAll/0/10', header)
      .then(response => setCustomersData(response.data.items));
  }, []);

    const handleSearch = async () => {
      
    const token = localStorage.getItem('token'); // Retrieve the JWT token from local storage
    const header = { headers: { Authorization: `Bearer ${token}` } }; // Create the authorization header
  
    let sortedData = (await axios.get('http://flaundry.somee.com/api/v1/Customer/GetAll/0/10', header)).data.items;

    sortedData = sortedData.filter(item => item.email.includes(email) && item.fullName.includes(fullName));
    setCustomersData(sortedData)
    }


    const handleActionComplete = (args) => {
      if (args.requestType === 'save' && args.action === 'add') {
        console.log(args.data[0])
      } else if (args.requestType === 'delete') {
        const customerIds = args.data.map(idx => idx.customerId); // Assuming there is an 'Id' property in your data
        
        //handleDelete(email);
        const token = localStorage.getItem('token'); // Retrieve the JWT token from local storage
        const header = { headers: { Authorization: `Bearer ${token}` } }; // Create the authorization header
        
        customerIds.forEach((idx) =>
        axios.delete('http://flaundry.somee.com/api/v1/Customer/Delete/' + idx, header)
      ) }
    };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">



      <Header category="Page" title="Customers" />
    <Row>
      <Col> 
      <InputGroup size="sm"  className="mb-3">
        <InputGroup.Text id="basic-addon1">Email</InputGroup.Text>
        <Form.Control
          onChange={event => email = event.target.value}
          placeholder="Email"
          aria-label="Email"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
      </Col>

      <Col> 
      <InputGroup size="sm"  className="mb-3">
        <InputGroup.Text id="basic-addon1">Full Name</InputGroup.Text>
        <Form.Control
        onChange={event => fullName = event.target.value}
          placeholder="Full Name"
          aria-label="Full Name"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
      </Col>
      <Col>
      <Button size='sm' onClick={handleSearch}  variant= 'dark'> Search </Button>
      </Col>
      </Row>
      <br />
      <GridComponent
        dataSource={customersData}
        allowPaging
        allowSorting
        toolbar={[ 'Delete']}
        editSettings={{allowAdding: true, allowDeleting: true, allowEditing: true}}
        width= 'auto'
        actionComplete={handleActionComplete}
      >
        <ColumnsDirective>
          {customersGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Page,Toolbar, Selection, Edit, Sort, Filter]} />
      </GridComponent>
      <br/>
      <AddCustomerModal/>
    </div>
  )
}

export default Customers