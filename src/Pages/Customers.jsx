import React, { useEffect, useState } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Selection,
  Inject,
  Edit,
  Toolbar,
  Sort,
  Filter,
} from "@syncfusion/ej2-react-grids";
import request from "../Utils/request"
import { customersGrid } from "../Data/dummy";
import { Header } from "../Components";
import axios from "axios";
import AddCustomerModal from "../Components/AddCustomerModal";

const Customers = () => {
  const [customersData, setCustomersData] = useState([]);

  let searchValue = "";

  useEffect(() => {
    request.get('v1/Customer/GetAll/0/100')
    .then((response) => setCustomersData(response.data.items))
    .catch(error => console.log(error))
  }, []);

  const handleSearch = async () => {
    let sortedData = (
      await request.get('v1/Customer/GetAll/0/100')
    ).data.items;
    let searchValueLowerCase = searchValue.toLowerCase();

    sortedData = sortedData.filter((item) => {
      return (
        item.email.toLowerCase().includes(searchValueLowerCase) ||
        item.fullName.toLowerCase().includes(searchValueLowerCase)
      );
    });
    setCustomersData(sortedData);
  };

  const handleActionComplete = (args) => {
    if (args.requestType === "save" && args.action === "add") {
      console.log(args.data[0]);
    } else if (args.requestType === "delete") {
      const customerIds = args.data.map((idx) => idx.customerId); // Assuming there is an 'Id' property in your data
      customerIds.forEach((idx) =>
        request.delete('v1/Customer/Delete/' + idx)
      );
    }
  };

  return (
    <div className="mt-8 mx-4 px-10 pt-4 bg-white rounded-3xl">
      <Header category="Page" title="Customers" />
      <div className="flex justify-around">
        <span class="input-group">
          <input
            type="text"
            placeholder="Search by email or name"
            onChange={(event) => (searchValue = event.target.value)}
            class="input input-bordered bg-transparent border-2 border-accent w-1/2"
          />
          <button class="btn btn-square btn-accent" onClick={handleSearch}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </span>
        <span>
          <AddCustomerModal setCustomersData={setCustomersData}/>
        </span>
      </div>

      <div className="py-4">
        <GridComponent
          dataSource={customersData}
          allowPaging
          allowSorting
          toolbar={["Delete"]}
          editSettings={{
            allowAdding: true,
            allowDeleting: true,
            allowEditing: true,
          }}
          width="auto"
          actionComplete={handleActionComplete}
        >
          <ColumnsDirective>
            {customersGrid.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
          </ColumnsDirective>
          <Inject services={[Page, Toolbar, Selection, Edit, Sort, Filter]} />
        </GridComponent>
      </div>
    </div>
  );
};

export default Customers;
