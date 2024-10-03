import React, { useState } from "react";
import Layout from "../../components/Layout";
import LineChartDots from "../../components/LineChartDots";
import { FaSackDollar, FaLocationDot } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import MyDataTable from "../../components/MyDataTable";
import { useNavigate } from "react-router-dom";
import GetAPI from "../../utilities/GetAPI";
import Loader from "../../components/Loader";
import dayjs from "dayjs";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
} from "@chakra-ui/react";

export default function Home() {
  const navigate = useNavigate();
  const { data } = GetAPI("admin/dashboard");
  const [modal, setModal] = useState(false);
  console.log("🚀 ~ Home ~ data:", data);

  const columns = [
    { field: "id", header: "Order Id" },
    { field: "amount", header: "Amount" },
    { field: "date", header: "Date" },
    { field: "status", header: "Status" },
  ];

  const datas = [];
  data?.data?.todayOrders?.map((values, index) => {
    return datas.push({
      id: values?.id,
      amount: `$${values?.amount}`,
      date: dayjs(values?.createdAt).format("DD MMM, YYYY h:mm a"),
      status: (
        <div>
          {values?.status === "Completed" ? (
            <div className="bg-[#21965314]  text-themeGreen font-semibold p-2 rounded-md flex justify-center">
              Completed
            </div>
          ) : values?.status === "Cancelled" ? (
            <div
              className="bg-[#EE4A4A14] text-themeRed font-semibold p-2 rounded-md 
          flex justify-center"
            >
              Cancelled
            </div>
          ) : values?.status === "Rejected" ? (
            <div className="bg-[#1860CC33] text-[#1860CC] font-semibold p-2 rounded-md flex justify-center">
              Rejected
            </div>
          ) : values?.status === "Placed" ? (
            <div className="bg-[#faff7533] text-yellow-400 font-semibold p-2 rounded-md flex justify-center">
              Placed
            </div>
          ) : (
            <div className="bg-[#EC6C3033] text-[#EC6C30] font-semibold p-2 rounded-md flex justify-center">
              Scheduled
            </div>
          )}
        </div>
      ),
    });
  });

  return data?.length === 0 ? (
    <Loader />
  ) : (
    <Layout
      content={
        <div className="p-5 space-y-5 font-poppins">
          <div className="flex justify-between">
            <h2 className="text-themeDarkBlue text-2xl font-bold font-poppins">
              Dashboard
            </h2>

            <div className="bg-[#64748B] flex justify-center items-center gap-2 rounded-md py-1 px-2 text-white font-poppins">
              <p>Current charges</p>
              <p className="bg-black p-1 rounded-md">$23</p>
            </div>

            <button
              className="underline font-poppins font-medium"
              onClick={() => setModal(true)}
            >
              View calender
            </button>
          </div>
          <div className="flex gap-2">
            <div className="flex-1 bg-[#e8ecef] min-w-[200px] h-[300px] rounded-sm flex flex-col gap-1 relative overflow-hidden">
              <select
                className="w-[100px] ml-auto my-4 mr-4 bg-transparent"
                name=""
                id=""
              >
                <option value="option"> This week</option>
              </select>
              <div className="p-2 rounded-full w-[50px] flex justify-center items-center text-black text-2xl mx-auto">
                <FaSackDollar />
              </div>
              <h2 className="text-black text-[35px] font-bold mx-auto">
                $24,000
              </h2>
              <p className="text-black opacity-[.7] mx-auto">Total Profit</p>
              {/* <p className="ml-auto text-green-400 mr-3">5%</p> */}
              <div className="w-full absolute bottom-0 left-0">
                <LineChartDots />
              </div>
            </div>
            <div className="flex-1 bg-[#e8ecef] min-w-[200px] h-[300px] rounded-sm relative overflow-hidden">
              <p className="text-black text-[18px] font-medium text-center mt-12">
                Number of employee
              </p>
              <h2 className="text-black text-[35px] font-bold text-center">
                {data?.data?.totalUsers ? data?.data?.totalUsers : 0}
              </h2>
              <div className="w-full flex mb-5 relative right-[-35px]">
                <div className="w-[50px] h-[50px] rounded-full overflow-hidden border-white border-[2px] relative">
                  <img
                    className="w-full h-full object-cover"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpcUSfmXs8sTM9O4XFYxCr8x-90yOUsZcI2w&s"
                    alt=""
                  />
                </div>
                <div className="w-[50px] h-[50px] rounded-full overflow-hidden border-white border-[2px] relative right-[18px]">
                  <img
                    className="w-full h-full object-cover"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpcUSfmXs8sTM9O4XFYxCr8x-90yOUsZcI2w&s"
                    alt=""
                  />
                </div>
                <div className="w-[50px] h-[50px] rounded-full overflow-hidden border-white border-[2px] relative right-[36px]">
                  <img
                    className="w-full h-full object-cover"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpcUSfmXs8sTM9O4XFYxCr8x-90yOUsZcI2w&s"
                    alt=""
                  />
                </div>
                <div className="w-[50px] h-[50px] rounded-full overflow-hidden border-white border-[2px] relative right-[54px] ">
                  <img
                    className="w-full h-full object-cover"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpcUSfmXs8sTM9O4XFYxCr8x-90yOUsZcI2w&s"
                    alt=""
                  />
                </div>
                <div className="w-[50px] h-[50px] bg-gray-200 flex justify-center items-center text-lg font-semibold rounded-full overflow-hidden border-white border-[2px] relative right-[72px]">
                  {data?.data?.totalUsers - 4}+
                </div>
              </div>
              <div className="w-[90%] mx-auto py-1 flex bg-white rounded-2xl relative">
                <input
                  className="w-full h-full mx-4 pl-3 text-sm outline-none bg-transparent"
                  placeholder="Search"
                  type="text"
                />
                <IoIosSearch className="absolute top-[50%] translate-y-[-50%] left-2" />
              </div>
              {/* <p className="tect-lg font-semibold underline text-right w-[90%] mt-4">
                View all
              </p> */}
            </div>
            <div className="flex-1 bg-[#e8ecef] min-w-[200px] h-[300px] rounded-sm relative overflow-hidden">
              <p className="text-black text-[18px] font-medium mt-12 text-center">
                Completed Bookings
              </p>
              <h2 className="text-black text-[35px] font-bold text-center">
                {data?.data?.completedOrders ? data?.data?.completedOrders : 0}
              </h2>

              {/* <p className="text-red-400 w-full text-right pr-4 mt-14">-5%</p> */}
              <div className="w-full absolute bottom-0 left-0">
                <LineChartDots />
              </div>
            </div>
            <div className="flex-1 bg-white min-w-[200px] h-[300px] rounded-sm flex justify-center items-center flex-col gap-1 overflow-hidden relative">
              <p
                className="bg-black rounded-lg px-2 text-white absolute top-10 left-2 text-[12px] flex items-center gap-2 py-1 cursor-pointer"
                onClick={() => navigate("/station-details")}
              >
                <FaLocationDot />
                View all charging stations
              </p>
              <iframe
                className="w-full h-full"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d46830151.11795831!2d-119.8093025!3d44.24236485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54eab584e432360b%3A0x1c3bb99243deb742!2sUnited%20States!5e0!3m2!1sen!2s!4v1722684699275!5m2!1sen!2s"
              ></iframe>
            </div>
          </div>
          {/* =========================== */}
          <div className="w-full bg-[#e8ecef] flex gap-4 rounded-md">
            <div className="w-[75%] mt-10">
              <div className="flex justify-between mb-8">
                <p className="text-lg font-semibold pl-3">
                  Todays's Order{" "}
                  <span className="text-gray-400">
                    {`(${data?.data?.todayOrders?.length})`}
                  </span>
                </p>
                {/* <p className="text-gray-400">See All </p> */}
              </div>
              <MyDataTable columns={columns} data={datas} />
            </div>
            <div className="w-[25%] px-2 border-black border-l-[1px]">
              <div className="flex justify-between mt-10">
                <p className="text-sm font-medium">Available employees</p>
                {/* <p className="text-gray-400">See All</p> */}
              </div>
              <div className="space-y-4 mt-4">
                <div className="flex justify-center items-center gap-5">
                  <img
                    className="w-8 h-8 rounded-full border-white border-[2px]"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpcUSfmXs8sTM9O4XFYxCr8x-90yOUsZcI2w&s"
                    alt=""
                  />
                  <p className="font-medium">Wade Warren</p>
                </div>
                <div className="flex justify-center items-center gap-5">
                  <img
                    className="w-8 h-8 rounded-full border-white border-[2px]"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpcUSfmXs8sTM9O4XFYxCr8x-90yOUsZcI2w&s"
                    alt=""
                  />
                  <p className="font-medium">Wade Warren</p>
                </div>
                <div className="flex justify-center items-center gap-5">
                  <img
                    className="w-8 h-8 rounded-full border-white border-[2px]"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpcUSfmXs8sTM9O4XFYxCr8x-90yOUsZcI2w&s"
                    alt=""
                  />
                  <p className="font-medium">Wade Warren</p>
                </div>
                <div className="flex justify-center items-center gap-5">
                  <img
                    className="w-8 h-8 rounded-full border-white border-[2px]"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpcUSfmXs8sTM9O4XFYxCr8x-90yOUsZcI2w&s"
                    alt=""
                  />
                  <p className="font-medium">Wade Warren</p>
                </div>
              </div>
            </div>
          </div>

          <Modal onClose={() => setModal(false)} isOpen={modal} isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalBody padding={0}>
                <div>
                  <Calendar minDate={new Date()} />
                </div>
              </ModalBody>
            </ModalContent>
          </Modal>
        </div>
      }
    />
  );
}
