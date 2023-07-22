import React from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Resize,
  Sort,
  ContextMenu,
  Filter,
  Page,
  ExcelExport,
  PdfExport,
  Edit,
  Inject,
} from "@syncfusion/ej2-react-grids";
import { useEffect, useState } from "react";
import axios from "axios";
import { ordersData, contextMenuItems, storesGrid } from "../Data/dummy";
import { Header } from "../Components";
import AddStoreModal from "../Components/AddStoreModal";

const Stores = () => {
  const [shopsData, setShopsData] = useState([]);

  let searchValue = "";

  const handleActionComplete = (args) => {
    if (args.requestType === "save" && args.action === "add") {
      console.log(args.data[0]);
    } else if (args.requestType === "delete") {
      const customerIds = args.data.map((idx) => idx.storeId); // Assuming there is an 'Id' property in your data

      const token = localStorage.getItem("token"); // Retrieve the JWT token from local storage
      const header = { headers: { Authorization: `Bearer ${token}` } }; // Create the authorization header

      customerIds.forEach((idx) =>
        axios.delete(
          "http://flaundry.somee.com/api/v1/Store/DeleteById/" + idx,
          header
        )
      );
    }
  };

  const handleSearch = async () => {
    const token = localStorage.getItem("token"); // Retrieve the JWT token from local storage
    const header = { headers: { Authorization: `Bearer ${token}` } }; // Create the authorization header

    let sortedData = (
      await axios.get(
        "http://flaundry.somee.com/api/v1/Store/GetAll/0/100",
        header
      )
    ).data.items;

    sortedData = sortedData.filter((item) =>
      item.storeName.toLowerCase().includes(searchValue.toLowerCase())
    );
    setShopsData(sortedData);
  };

  useEffect(() => {
    const token = localStorage.getItem("token"); // Retrieve the JWT token from local storage
    const header = { headers: { Authorization: `Bearer ${token}` } }; // Create the authorization header

    axios
      .get("http://flaundry.somee.com/api/v1/Store/GetAll/0/100", header)
      .then((response) => setShopsData(response.data.items));
  }, []);

  return (
    <div className="mt-8 mx-4 px-10 pt-4 bg-white rounded-3xl">
      <Header category="Page" title="Stores" />
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
          <AddStoreModal setShopsData={setShopsData} />
        </span>
      </div>

      <div className="py-4">
        <GridComponent
          id="gridcomp"
          dataSource={shopsData}
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
            {storesGrid.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
          </ColumnsDirective>
          <Inject
            services={[
              Resize,
              Sort,
              ContextMenu,
              Filter,
              Page,
              ExcelExport,
              Edit,
              PdfExport,
            ]}
          />
        </GridComponent>
      </div>
    </div>
  );
};
export default Stores;
