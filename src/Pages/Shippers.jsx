import React from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Search,
  Inject,
  Toolbar,
} from "@syncfusion/ej2-react-grids";
import { useEffect, useState } from "react";
import {shippersGrid} from  "../Data/dummy";
import request from "../Utils/request";
import { employeesData, employeesGrid } from "../Data/dummy";
import { Header } from "../Components";
import AddShipperModal from "../Components/AddShipperModal";

const Shippers = () => {
  const [shippersData, setShippersData] = useState([]);
  let searchValue = "";
  const handleSearch = async () => {}
  
  useEffect(() => {
    request
      .post("v1/Driver/GetListWithFilter/0/100")
      .then((response) => setShippersData(response.data.items))
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="mt-8 mx-4 px-10 pt-4 bg-white rounded-3xl">
      <Header category="Page" title="Shippers" />
      <div className="flex justify-around">
        <span class="input-group">
          <input
            type="text"
            placeholder="Search by name"
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
          <AddShipperModal setShippersData={setShippersData} />
        </span>
      </div>
      <div className="py-4">
        <GridComponent
          dataSource={shippersData}
          allowPaging
          allowSorting
          toolbar={["Delete"]}
          editSettings={{
            allowAdding: true,
            allowDeleting: true,
            allowEditing: true,
          }}
          width="auto"
        >
          <ColumnsDirective>
            {shippersGrid.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
          </ColumnsDirective>
          <Inject services={[Page, Search, Toolbar]} />
        </GridComponent>
      </div>
    </div>
  );
};
export default Shippers;
