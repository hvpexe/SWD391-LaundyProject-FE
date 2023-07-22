import React, { useState, useEffect } from "react";
import request from "../Utils/request";
import { GoPrimitiveDot } from "react-icons/go";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { BsBoxSeam, BsTruck } from "react-icons/bs";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { HiOutlineRefresh } from "react-icons/hi";
import { BiStore } from "react-icons/bi";
import { Stacked, Button, LineChart, SparkLine } from "../Components";
import {
  recentTransactions,
  dropdownData,
  SparklineAreaData,
} from "../Data/dummy";
import { useStateContext } from "../Contexts/ContextProvider";

const DropDown = ({ currentMode }) => (
  <div className="w-28 border-1 border-color px-2 py-1 rounded-md">
    <DropDownListComponent
      id="time"
      fields={{ text: "Time", value: "Id" }}
      style={{ border: "none", color: currentMode === "Dark" && "white" }}
      value="1"
      dataSource={dropdownData}
      popupHeight="220px"
      popupWidth="120px"
    />
  </div>
);

const Ecommerce = () => {
  const { currentColor, currentMode } = useStateContext();

  const [noCustomer, setNoCustomer] = useState(0);
  const [noOrder, setNoOrder] = useState(0);
  const [noStore, setNoStore] = useState(0);
  const [noDriver, setNoDriver] = useState(0);

  useEffect(() => {
    request
      .get("v1/Customer/GetCount")
      .then((response) => setNoCustomer(Number.parseInt(response.data)))
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    request
      .get("v1/Order/GetCount")
      .then((response) => setNoOrder(Number.parseInt(response.data)))
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    request
      .get("v1/Store/GetCount")
      .then((response) => setNoStore(Number.parseInt(response.data)))
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    request
      .get("v1/Driver/GetCount")
      .then((response) => setNoDriver(Number.parseInt(response.data)))
      .catch((error) => console.log(error));
  }, []);
  var earningData = [
    {
      icon: <MdOutlineSupervisorAccount />,
      amount: noCustomer,
      title: "Customers",
      iconColor: "#03C9D7",
      iconBg: "#E5FAFB",
    },
    {
      icon: <BsBoxSeam />,
      amount: noOrder,
      title: "Orders",
      iconColor: "rgb(255, 244, 229)",
      iconBg: "rgb(254, 201, 15)",
    },
    {
      icon: <BiStore />,
      amount: noStore,
      title: "Stores",
      iconColor: "rgb(228, 106, 118)",
      iconBg: "rgb(255, 244, 229)",
    },
    {
      icon: <BsTruck />,
      amount: noDriver,
      title: "Drivers",
      iconColor: "rgb(0, 194, 146)",
      iconBg: "rgb(235, 250, 242)",
    },
  ];

  return (
    <div className="mt-12">
      {/* Start Number overview */}
      <div className="flex flex-wrap lg:flex-nowrap justify-center gap-5">
        {earningData.map((item) => (
          <div
            key={item.title}
            className="bg-white h-44 md:w-56  p-4 pt-9 rounded-2xl "
          >
            <button
              type="button"
              style={{ color: item.iconColor, backgroundColor: item.iconBg }}
              className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
            >
              {item.icon}
            </button>
            <p className="mt-3">
              <span className="text-lg font-semibold">{item.amount}</span>
            </p>
            <p className="text-sm text-gray-400  mt-1">{item.title}</p>
          </div>
        ))}
      </div>

      {/* revenue */}
      <div className="bg-white mt-8 p-4 rounded-2xl md:w-780  mx-auto">
        <div className="flex justify-between">
          <p className="font-semibold text-xl">Revenue Updates</p>
          <div className="flex items-center gap-4">
            <p className="flex items-center gap-2 text-gray-600 hover:drop-shadow-xl">
              <span>
                <GoPrimitiveDot />
              </span>
              <span>Expense</span>
            </p>
            <p className="flex items-center gap-2 text-green-400 hover:drop-shadow-xl">
              <span>
                <GoPrimitiveDot />
              </span>
              <span>Budget</span>
            </p>
          </div>
        </div>
        <div className="mt-10 flex gap-10 flex-wrap justify-center">
          <div className=" border-r-1 border-color m-4 pr-10">
            <div>
              <p>
                <span className="text-3xl font-semibold">$93,438</span>
                <span className="p-1.5 hover:drop-shadow-xl cursor-pointer rounded-full text-white bg-green-400 ml-3 text-xs">
                  23%
                </span>
              </p>
              <p className="text-gray-500 mt-1">Budget</p>
            </div>
            <div className="mt-8">
              <p className="text-3xl font-semibold">$48,487</p>

              <p className="text-gray-500 mt-1">Expense</p>
            </div>

            <div className="mt-5">
              <SparkLine
                currentColor={currentColor}
                id="line-sparkLine"
                type="Line"
                height="80px"
                width="250px"
                data={SparklineAreaData}
                color={currentColor}
              />
            </div>
          </div>
          <div>
            <Stacked currentMode={currentMode} width="320px" height="360px" />
          </div>
        </div>
      </div>

      <div className="flex gap-10 m-4 flex-wrap justify-center">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-96 md:w-760">
          <div className="flex justify-between items-center gap-2 mb-10">
            <p className="text-xl font-semibold">Sales Overview</p>
            <DropDown currentMode={currentMode} />
          </div>
          <div className="md:w-full overflow-auto">
            <LineChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ecommerce;
