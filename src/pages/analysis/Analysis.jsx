import React from "react";
import Layout from "../../components/Layout";
import { IoIosStats } from "react-icons/io";
import { FaChargingStation } from "react-icons/fa6";
import { PiHandCoinsLight } from "react-icons/pi";
import { AiOutlinePercentage } from "react-icons/ai";
import { SlCalender } from "react-icons/sl";
import { FaCheckCircle } from "react-icons/fa";
import { TiArrowSortedUp } from "react-icons/ti";
import MyDataTable from "../../components/MyDataTable";
import { IoIosCloseCircle } from "react-icons/io";
import { MdError } from "react-icons/md";
import BarChartComponent from "../../components/BarCh";
import LineChartDots from "../../components//LineChartDots";

const Analysis = () => {
  const columns = [
    { field: "name", header: "Name" },
    { field: "status", header: "Status" },
    {
      field: "date",
      header: "Date",
    },
    {
      field: "chargingprogress",
      header: "Charging Progress",
    },
  ];
  const datas = [
    {
      name: <p className="font-semibold">loremipsum</p>,
      status: (
        <p className="text-green-500 font-medium flex items-center gap-2">
          <FaCheckCircle />
          Approved
        </p>
      ),
      date: <p className="font-semibold">20-MAY-2024</p>,
      chargingprogress: (
        <div className="flex w-full bg-gray-300 rounded-full overflow-hidden">
          <hr className="h-2 bg-green-400 rounded-lg w-[70%]" />
        </div>
      ),
    },
    {
      name: <p className="font-semibold">loremipsum</p>,
      status: (
        <p className="text-red-500 font-medium flex items-center gap-2">
          <IoIosCloseCircle size={20} />
          Disable
        </p>
      ),
      date: <p className="font-semibold">20-MAY-2024</p>,
      chargingprogress: (
        <div className="flex w-full bg-gray-300 rounded-full overflow-hidden">
          <hr className="h-2 bg-green-400 rounded-lg w-[70%]" />
        </div>
      ),
    },
    {
      name: <p className="font-semibold">loremipsum</p>,
      status: (
        <p className="text-orange-400 font-medium flex items-center gap-2">
          <MdError size={20} />
          Error
        </p>
      ),
      date: <p className="font-semibold">20-MAY-2024</p>,
      chargingprogress: (
        <div className="flex w-full bg-gray-300 rounded-full overflow-hidden">
          <hr className="h-2 bg-green-400 rounded-lg w-[70%]" />
        </div>
      ),
    },
  ];
  return (
    <Layout
      content={
        <div className="p-5 space-y-3  font-poppins">
          <h2 className="text-themeDarkBlue text-xl font-medium">
            Analytics and reports
          </h2>
          {/* ====================== */}
          <div className="flex gap-3 w-full">
            <div className="flex-1 flex justify-center items-center flex-col gap-y-1 pb-8 pt-4 bg-white rounded-md">
              <div className="bg-gray-200 rounded-full p-2 text-2xl">
                <IoIosStats />
              </div>
              <p className="text-gray-400">Earnings</p>
              <h4 className="font-bold text-2xl">$350.0</h4>
            </div>
            <div className="flex-1 flex justify-center items-center flex-col gap-y-1 pb-8 pt-4 bg-white rounded-md">
              <div className="bg-gray-200 rounded-full p-2 text-2xl">
                <PiHandCoinsLight />
              </div>
              <p className="text-gray-400">Spend this month</p>
              <h4 className="font-bold text-2xl">$642</h4>
            </div>
            <div className="flex-1 flex justify-center items-center flex-col gap-y-1 pb-8 pt-4 bg-white rounded-md">
              <div className="bg-gray-200 rounded-full p-2 text-2xl">
                <AiOutlinePercentage />
              </div>
              <p className="text-gray-400">Sales</p>
              <h4 className="font-bold text-2xl">$574.0</h4>
              <p className="text-gray-400 text-sm">
                <span className="text-green-400">+23%</span> Since last month
              </p>
            </div>
            <div className="flex-1 flex justify-center items-center flex-col gap-y-1 pb-8 pt-4 bg-white rounded-md relative">
              <select
                className="bg-transparent border-gray-200 text-[10px] font-medium px-2 border-[1px] rounded-md cursor-pointer absolute top-4 right-2"
                name=""
                id=""
              >
                <option value="">This week</option>
                <option value="">This week</option>
              </select>
              <div className="bg-gray-200 rounded-full p-2 text-2xl">
                <FaChargingStation />
              </div>
              <p className="text-gray-400">Total completed charge</p>
              <h4 className="font-bold text-2xl">$65.0</h4>
            </div>
          </div>
          {/* ========================== */}
          <div className="flex gap-3 w-full">
            <div className="w-1/2 flex p-3 bg-white rounded-md relative">
              <div>
                <div className="ml-3">
                  <label
                    className="inline-flex text-gray-400 bg-blue-100 p-2 rounded-md gap-2 cursor-pointer items-center mt-6"
                    htmlFor="calender"
                  >
                    <SlCalender />
                    <p> This month</p>
                  </label>
                  <input type="date" id="calender" hidden="true" />
                </div>
                <p className="font-bold text-2xl mt-10 ml-3">37.5k</p>
                <p className="flex gap-2 ml-3">
                  Total gain
                  <span className="text-green-500 flex gap-1 items-center">
                    <TiArrowSortedUp />
                    +5.3%
                  </span>
                </p>
                <p className="text-green-500 font-medium flex items-center gap-1 mt-8 ml-3">
                  <FaCheckCircle />
                  On track
                </p>
              </div>
              {/* ================ */}
              <div className="w-[60%] absolute bottom-[80px] right-0">
                <LineChartDots />
              </div>
              <div className="w-[60%] absolute bottom-[140px] right-0">
                <LineChartDots />
              </div>
            </div>
            {/* ==================== */}
            <div className="w-1/2 p-3 bg-white rounded-md">
              <p className="font-medium text-xl">Weekly Revenue</p>
              <div className="flex justify-between">
                <div className="mt-6">
                  <p className="font-medium">Wallet balance</p>
                  <p className="font-bold text-xl text-blue-500">$ 1544.00</p>
                </div>
                <p className="font-medium text-lg bg-blue-100 rounded-md p-2 h-10 text-blue-500 flex items-center">
                  Withdraw
                </p>
              </div>
              <div className="h-[200px]">
                <BarChartComponent />
              </div>
            </div>
          </div>
          {/* ======================= */}
          <div className="flex gap-3 rounded-md">
            <div className="w-[60%] bg-white rounded-md overflow-hidden">
              <div className="flex justify-between px-3 py-2 border-black border-b-[1px] text-gray-400">
                <p>NAME</p>
                <p>STATUS</p>
                <p>DATE</p>
                <p>CHARGING PROGRESS</p>
              </div>
              <div className="flex justify-between">
                <div className="text-[14px] space-y-1 mt-2 px-3">
                  <p className="font-semibold">loremipsum</p>
                  <p className="font-semibold">loremipsum</p>
                  <p className="font-semibold">loremipsum</p>
                  <p className="font-semibold">loremipsum</p>
                </div>
                {/* ============== */}
                <div className="text-[14px] text-left space-y-1 mt-2 px-3">
                  <p className="text-green-500 font-medium flex items-center gap-2">
                    <FaCheckCircle size={15} />
                    Approved
                  </p>
                  <p className="text-red-500 font-medium flex items-center gap-2">
                    <IoIosCloseCircle size={15} />
                    Disable
                  </p>
                  <p className="text-orange-400 font-medium flex items-center gap-2">
                    <MdError size={15} />
                    Error
                  </p>
                  <p className="text-green-500 font-medium flex items-center gap-2">
                    <FaCheckCircle size={15} />
                    Approved
                  </p>
                </div>
                <div className="text-[14px] space-y-1 mt-2 ml-4 px-3">
                  <p className="font-semibold">MAY-20-2024</p>
                  <p className="font-semibold">MAY-20-2024</p>
                  <p className="font-semibold">MAY-20-2024</p>
                  <p className="font-semibold">MAY-20-2024</p>
                </div>
                <div className="w-[160px] space-y-4 mt-3 ml-4 px-3">
                  <div className="flex w-full bg-gray-300 rounded-full overflow-hidden">
                    <hr className="h-2 bg-green-400 rounded-lg w-[70%]" />
                  </div>
                  <div className="flex w-full bg-gray-300 rounded-full overflow-hidden">
                    <hr className="h-2 bg-green-400 rounded-lg w-[70%]" />
                  </div>
                  <div className="flex w-full bg-gray-300 rounded-full overflow-hidden">
                    <hr className="h-2 bg-green-400 rounded-lg w-[70%]" />
                  </div>
                  <div className="flex w-full bg-gray-300 rounded-full overflow-hidden">
                    <hr className="h-2 bg-green-400 rounded-lg w-[70%]" />
                  </div>
                </div>
              </div>
              <p className="underline font-medium w-full text-right mt-7 pr-3 cursor-pointer">View all</p>

              {/* <MyDataTable columns={columns} data={datas} /> */}
            </div>

            <div className="w-[40%] bg-white rounded-md px-3 pt-5">
              <div className="flex justify-between">
                <p className="text-gray-400 tex-sm font-medium">
                  Daily traffic
                </p>
                <span className="text-green-500 flex gap-1 items-center">
                  <TiArrowSortedUp />
                  +5.3%
                </span>
              </div>
              <p className="font-bold text-2xl mt-3 ">
                2.579{" "}
                <span className="text-gray-400 text-sm font-medium">
                  Visitors
                </span>
              </p>
              <div className="h-[200px]">
                <BarChartComponent />
              </div>
            </div>
          </div>

          {/* ========== */}
        </div>
      }
    />
  );
};

export default Analysis;
