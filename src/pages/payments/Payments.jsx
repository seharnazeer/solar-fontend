import React, { useState } from "react";
import Layout from "../../components/Layout";
import AddButton, { TabButton, DetailButton } from "../../utilities/Buttons";
import Helmet from "../../components/Helment";
import MyDataTable from "../../components/MyDataTable";
import GetAPI from "../../utilities/GetAPI";
import Loader from "../../components/Loader";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { MdOutlineCloudDownload } from "react-icons/md";
import { LiaCcVisa } from "react-icons/lia";
import { FaCheckCircle, FaMinusCircle, FaClock } from "react-icons/fa";
import { RiFlag2Fill } from "react-icons/ri";

export default function Support() {
  const [tab, setTab] = useState("All Payments");
  const [search, setSearch] = useState("");
  const { data, reFetch } = GetAPI("admin/getAllTransactions");
  console.log("🚀 ~ Support ~ data:", data);
  const navigate = useNavigate();

  const supportData = () => {
    const filteredData = data?.data?.transactions?.filter((dat) => {
      return (
        search === "" ||
        (dat?.paymentId &&
          dat?.paymentId.toString().includes(search.toLowerCase())) ||
        (dat?.status &&
          dat?.status.toLowerCase().includes(search.toLowerCase())) ||
        (dat?.date && dat?.date.toString().includes(search.toLowerCase()))
      );
    });
    return filteredData;
  };

  const columns = [
    { field: "id", header: "Payment ID" },
    { field: "status", header: "Status" },
    { field: "amount", header: "Amount" },
    { field: "method", header: "Payment Method" },
    { field: "date", header: "Creation Date" },
    // { field: "action", header: "Action" },
  ];

  const datas = [];
  supportData()?.map((values, index) => {
    return datas.push({
      id: values?.paymentId,
      amount: `$${values?.amount}`,
      method: (
        <div className="flex items-center gap-2">
          <span>
            <LiaCcVisa size={24} />
          </span>
          <span>{values?.card}</span>
        </div>
      ),
      date: dayjs(values?.createdAt).format("DD MMM, YYYY h:mm a"),
      status:
        values?.status === "success" ? (
          <div
            className="bg-[#EDFFEA] text-[#165E3D] text-center font-manrope font-semibold 
          p-1.5 rounded-md flex items-center justify-center gap-2"
          >
            <span>
              <FaCheckCircle color="#165E3D" />
            </span>
            <span>Succeeded</span>
          </div>
        ) : values?.status === "pending" ? (
          <div className="bg-[#FFF6E9] text-[#B5850B] text-center font-manrope font-semibold p-1.5 rounded-md flex items-center justify-center gap-2">
            <span>
              <FaClock color="#B5850B" />
            </span>
            <span>Pending</span>
          </div>
        ) : values?.status === "declined" ? (
          <div className="bg-[#FFEAEA] text-[#B83131] text-center font-manrope font-semibold p-1.5 rounded-md flex items-center justify-center gap-2">
            <span>
              <FaMinusCircle color="#B83131" />
            </span>
            <span>Declined</span>
          </div>
        ) : (
          <div className="bg-[#EAECFF] text-[#3D42AD] text-center font-manrope font-semibold p-1.5 rounded-md flex items-center justify-center gap-2">
            <span>
              <RiFlag2Fill color="#3D42AD" />
            </span>
            <span>Create</span>
          </div>
        ),
      // action: (
      //   <div>
      //     <DetailButton text="Transaction Details" />
      //   </div>
      // ),
    });
  });

  return data?.length === 0 ? (
    <Loader />
  ) : (
    <Layout
      content={
        <div className="p-5 space-y-5">
          <div className="flex justify-between items-center flex-wrap gap-5">
            <h2 className="text-themeDarkBlue text-2xl font-bold font-poppins">
              Payments/Charges
            </h2>
            <div className="flex items-center gap-2">
              <button
                className="flex items-center justify-center gap-2 text-sm border border-themeBlack 
                text-white font-semibold font-manrope rounded-md px-5 py-2 h-10 bg-themeBlack hover:bg-transparent hover:text-themeBlack duration-200"
              >
                <span>
                  <MdOutlineCloudDownload size={20} />
                </span>
                <span>Export</span>
              </button>
              <AddButton
                text="Payment link"
                onClick={() => navigate("/create-ticker")}
              />
            </div>
          </div>

          <div className="space-y-3">
            <Helmet
              search={true}
              searchOnChange={(e) => setSearch(e.target.value)}
              searchValue={search}
            />

            <div className="py-5 space-y-1.5">
              <ul className="flex flex-wrap items-center gap-8">
                <TabButton
                  title="All Payments"
                  tab={tab}
                  onClick={() => setTab("All Payments")}
                />
                <TabButton
                  title="Current Charges"
                  tab={tab}
                  onClick={() => setTab("Current Charges")}
                />
                <TabButton
                  title="Refunded"
                  tab={tab}
                  onClick={() => setTab("Refunded")}
                />
              </ul>
            </div>

            {tab === "All Payments" ? (
              <MyDataTable columns={columns} data={datas} />
            ) : tab === "Current Charges" ? (
              <MyDataTable columns={columns} data={datas} />
            ) : (
              <MyDataTable columns={columns} data={datas} />
            )}
          </div>
        </div>
      }
    />
  );
}
