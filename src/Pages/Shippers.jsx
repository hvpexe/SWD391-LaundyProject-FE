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

const Shippers = () => {
  const [shippersData, setShippersData] = useState([]);

  useEffect(() => {
    request
      .post("v1/Driver/GetListWithFilter/0/100")
      .then((response) => setShippersData(response.data.items))
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="mt-8 mx-4 px-10 pt-4 bg-white rounded-3xl">
      <Header category="Page" title="Shippers" />
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
