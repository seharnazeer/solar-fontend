import React from "react";
import Layout from "../../components/Layout";
import Switch from "react-switch";
import MyDataTable from "../../components/MyDataTable";
import GetAPI from "../../utilities/GetAPI";
import Loader from "../../components/Loader";
import { BASE_URL } from "../../utilities/URL";
import dayjs from "dayjs";

const Track = () => {
  const { data } = GetAPI(
    `admin/userDetails/1}`
  );
  console.log("🚀 ~ Track ~ data:", data);

  const columns = [
    { field: "id", header: "Order Id" },
    { field: "amount", header: "Amount" },
    { field: "date", header: "Date" },
    { field: "preference", header: "Preference" },
    { field: "status", header: "Status" },
  ];

  const datas = [];
  data?.data?.userData?.orders?.map((values, index) => {
    return datas.push({
      id: values?.id,
      amount: `$${values?.amount}`,
      date: dayjs(values?.createdAt).format("DD MMM, YYYY h:mm a"),
      preference: values?.preference,
      status: (
        <div>
          {values?.orderStatus === "Completed" ? (
            <div className="bg-[#21965314]  text-themeGreen font-semibold p-2 rounded-md flex justify-center">
              Completed
            </div>
          ) : values?.orderStatus === "Cancelled" ? (
            <div
              className="bg-[#EE4A4A14] text-themeRed font-semibold p-2 rounded-md 
          flex justify-center"
            >
              Cancelled
            </div>
          ) : values?.orderStatus === "Rejected" ? (
            <div className="bg-[#1860CC33] text-[#1860CC] font-semibold p-2 rounded-md flex justify-center">
              Rejected
            </div>
          ) : values?.orderStatus === "Placed" ? (
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
        <>
          <div className="p-5 space-y-5 font-poppins">
            <div className="flex">
              <h2 className="text-themeDarkBlue text-2xl font-bold font-poppins">
                Track Activity
              </h2>
            </div>
            <div className=" flex bg-white rounded-xl px-4 py-6">
              <div className="flex flex-1 items-center gap-5">
                <img
                  className="w-20 h-20 rounded-full object-cover"
                  src={`${BASE_URL}${data?.data?.userData?.image}`}
                  alt="user"
                />
                <div>
                  <p className="font-semibold">
                    Name :{" "}
                    <span className="font-normal">
                      {data?.data?.userData?.name}
                    </span>
                  </p>
                  <p className="font-semibold">
                    Position :{" "}
                    <span className="font-normal">
                      {data?.data?.userData?.userType}
                    </span>
                  </p>
                  <p className="font-semibold">
                    Empolyee ID :{" "}
                    <span className="font-normal">
                      {data?.data?.userData?.id}
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex-1 border-black border-l-[1px] pl-5">
                <p className="font-semibold">
                  Phone Number :{" "}
                  <span className="font-normal">
                    {data?.data?.userData?.phone
                      ? data?.data?.userData?.phone
                      : "N/A"}
                  </span>
                </p>
                <p className="font-semibold">
                  Age :{" "}
                  <span className="font-normal">
                    {data?.data?.userData?.age
                      ? data?.data?.userData?.age
                      : "N/A"}
                  </span>
                </p>
                <p className="font-semibold">
                  Location :{" "}
                  <span className="font-normal">
                    {data?.data?.userData?.address
                      ? data?.data?.userData?.address
                      : "N/A"}
                  </span>
                </p>
              </div>
              <div className="flex-1 border-black border-l-[1px] pl-5">
                <p className="font-semibold">
                  Car Modal :{" "}
                  <span className="font-normal">
                    {data?.data?.userData?.modal
                      ? data?.data?.userData?.modal
                      : "N/A"}
                  </span>
                </p>
                <p className="font-semibold">
                  Engine Number :{" "}
                  <span className="font-normal">
                    {data?.data?.userData?.engineNumber
                      ? data?.data?.userData?.engineNumber
                      : "N/A"}
                  </span>
                </p>
              </div>
            </div>
            <div className="w-full rounded-lg flex gap-4">
              <div className="w-[60%] h-[300px] relative">
                <button className="absolute top-4 left-4 rounded-lg bg-white border-black border-[1.5px] px-2 font-medium">
                  User activity
                </button>
                <div className="absolute top-2 right-2 w-[220px] h-[285px] bg-gray-400 rounded-lg text-white pl-6 pt-10">
                  <p>User information</p>
                  <div className="my-6">
                    <p>Name of user</p>
                    <p>Type of car</p>
                    <p>Charger type</p>
                    <p>Battery size</p>
                  </div>
                  <p className="text-orange-600 pt-6">Order in progress</p>
                </div>
                <iframe
                  className="w-full h-full"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d46830151.11795831!2d-119.8093025!3d44.24236485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54eab584e432360b%3A0x1c3bb99243deb742!2sUnited%20States!5e0!3m2!1sen!2s!4v1722684699275!5m2!1sen!2s"
                ></iframe>

                <div className=" my-4 bg-white rounded-lg p-4">
                  <button className="rounded-lg bg-white border-black border-[1.5px] px-2 font-medium">
                    User History
                  </button>
                  <MyDataTable columns={columns} data={datas} />
                </div>
              </div>
              <div className="w-[40%] px-4 bg-white py-4">
                <button className="rounded-lg bg-white border-black border-[1.5px] px-2 font-medium">
                  Solar EV
                </button>
                <img
                  className="w-full h-[150px] my-4 object-cover rounded-xl"
                  src="https://cdn.pixabay.com/photo/2023/05/24/21/26/car-8015901_1280.jpg"
                  alt=""
                />
                <div className=" flex justify-center items-baseline rounded-2xl px-4 py-6 border-black border-[2px] bg-gray-200 text-sm">
                  <div className="flex-1 items-center gap-5">
                    <p>Battery</p>
                    <p className="text-[10px] text-gray-500">80 percent</p>
                  </div>
                  <div className="flex-1 text-sm border-black border-l-[1px] border-r-[1px] pl-5">
                    <p>Range</p>
                    <p className="text-[10px] text-gray-500">240 kilometer</p>
                  </div>
                  <div className="flex-1 text-sm pl-5">
                    <p>Temperature</p>

                    <p className="text-[10px] text-gray-500"> 24 censius</p>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2 my-4">
                      <p className="font-semibold">English</p>|
                      <p className="font-semibold">Metrices</p>
                    </div>{" "}
                    <Switch
                      checked={true}
                      // onChange={(checked) =>
                      //   handleSwitchChange(checked)
                      // }
                      uncheckedIcon={false}
                      checkedIcon={false}
                      onColor="#4e73df"
                      onHandleColor="#fff"
                      className="react-switch"
                      boxShadow="none"
                      width={36}
                      height={20}
                    />
                  </div>
                  <div>
                    <p className="font-medium"> Solar Model</p>
                    <p className="font-medium"> Temperature</p>
                    <p className="font-medium"> Engine no</p>
                    <p className="font-medium"> Registration number</p>
                    <p className="font-medium"> Range</p>
                    <p className="font-medium"> Battery capacity</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      }
    />
  );
};

export default Track;
