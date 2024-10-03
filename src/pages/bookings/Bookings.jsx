import React, { useState } from "react";
import Layout from "../../components/Layout";
import GetAPI from "../../utilities/GetAPI";
import Loader from "../../components/Loader";
import dayjs from "dayjs";
import { FaRegBell, FaRegClock } from "react-icons/fa";
import { MdCalendarMonth } from "react-icons/md";

export default function Bookings() {
  const { data, reFetch } = GetAPI("admin/getAllOrders");
  console.log("🚀 ~ Bookings ~ data:", data);
  const [search, setSearch] = useState("");

  return data?.length === 0 ? (
    <Loader />
  ) : (
    <Layout
      content={
        <div className="p-5 space-y-5">
          <div className="flex items-center flex-wrap gap-10">
            <div className="flex items-center gap-10">
              <h2 className="text-themeDarkBlue text-2xl font-bold font-poppins">
                Manage bookings
              </h2>
              {/* <div className="w-[1px] h-10 bg-[#00000080]"></div> */}
            </div>

            {/* <div className="flex items-center gap-10">
              <div className="bg-[#64748B] flex justify-center items-center gap-2 rounded-md py-1 px-2 text-white font-poppins">
                <p>Current charges</p>
                <p className="bg-black p-1 rounded-md">$23</p>
              </div>
              <div className="w-[1px] h-10 bg-[#00000080]"></div>
            </div>

            <div className="flex items-center gap-10">
              <button className="underline text-base font-poppins font-medium">
                Add charges
              </button>
              <div className="w-[0.5px] h-10 bg-[#00000080]"></div>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <FaRegBell size={24} color="#19191A" />
                <div className="w-2 h-2 bg-[#FF8B7B] rounded-full absolute top-0.5 right-0.5"></div>
              </div>
              <button className="underline text-base font-poppins font-medium">
                Incoming order
              </button>
            </div> */}
          </div>

          <div className="px-5 py-10 bg-[#9797971A] space-y-3">
            {data?.data?.orderData?.map((book, index) => (
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <div>
                    <img
                      src="/images/user.webp"
                      alt="user"
                      className="w-20 h-20"
                    />
                  </div>
                  <div>
                    <h2 className="text-base font-poppins">
                      {book?.user?.email}
                    </h2>
                    <div className="flex items-center text-[#767676] gap-2">
                      <MdCalendarMonth size={18} />
                      <span className="font-poppins">
                        {dayjs(book?.user?.createdAt).format("DD MMM, YYYY")}
                      </span>
                    </div>

                    <div className="flex items-center text-[#767676] gap-2">
                      <FaRegClock size={18} />
                      <span className="font-poppins">
                        {dayjs(book?.user?.createdAt).format("h:mm a")}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-base font-poppins">{book?.user?.phone}</div>

                <div className="text-base font-poppins">
                  {book?.co2Reduction}
                </div>

                <div className="text-base font-poppins">
                  {book?.preference}
                </div>

                <div>
                  {book?.orderStatus === "Completed" ? (
                    <div className="bg-[#21965314]  text-themeGreen font-semibold p-2 rounded-md flex justify-center">
                      Completed
                    </div>
                  ) : book?.orderStatus === "Cancelled" ? (
                    <div
                      className="bg-[#EE4A4A14] text-themeRed font-semibold p-2 rounded-md 
          flex justify-center"
                    >
                      Cancelled
                    </div>
                  ) : book?.orderStatus === "Rejected" ? (
                    <div className="bg-[#1860CC33] text-[#1860CC] font-semibold p-2 rounded-md flex justify-center">
                      Rejected
                    </div>
                  ) : book?.orderStatus === "Placed" ? (
                    <div className="bg-[#faff7533] text-yellow-400 font-semibold p-2 rounded-md flex justify-center">
                      Placed
                    </div>
                  ) : (
                    <div className="bg-[#EC6C3033] text-[#EC6C30] font-semibold p-2 rounded-md flex justify-center">
                      Scheduled
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      }
    />
  );
}
