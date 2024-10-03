import React, { useState } from "react";
import Layout from "../../components/Layout";
import Helment from "../../components/Helment";
import AddButton from "../../utilities/Buttons";
import MyDataTable from "../../components/MyDataTable";
import GetAPI from "../../utilities/GetAPI";
import Loader from "../../components/Loader";
import dayjs from "dayjs";
import Switch from "react-switch";
import { error_toaster, success_toaster } from "../../utilities/Toaster";
import { PostAPI } from "../../utilities/PostAPI";

export default function Property() {
  const { data, reFetch } = GetAPI("admin/getAllUsers");
  console.log("🚀 ~ Property ~ data:", data);
  const [search, setSearch] = useState("");

  const userData = () => {
    const filteredData = data?.data?.userData?.filter((dat) => {
      return (
        search === "" ||
        (dat?.id && dat?.id.toString().includes(search.toLowerCase())) ||
        (dat?.name && dat?.name.toLowerCase().includes(search.toLowerCase()))
      );
    });
    return filteredData;
  };

  const updateStatus = async (userId, userStatus) => {
    if (userStatus === true) {
      let res = await PostAPI(`admin/userChangeStatus`, {
        userId: userId,
        status: false,
      });
      if (res?.data?.status === "1") {
        success_toaster(res?.data?.message);
        reFetch();
      } else {
        error_toaster(res?.data?.message);
      }
    } else {
      let res = await PostAPI(`admin/userChangeStatus`, {
        userId: userId,
        status: true,
      });
      if (res?.data?.status === "1") {
        success_toaster(res?.data?.message);
        reFetch();
      } else {
        error_toaster(res?.data?.message);
      }
    }
  };

  const columns = [
    { field: "id", header: "User Id" },
    {
      field: "name",
      header: "Name",
    },
    {
      field: "email",
      header: "Email",
    },
    {
      field: "type",
      header: "Charger type",
    },
    {
      field: "logIn",
      header: "Last Logged in",
    },
    {
      field: "status",
      header: "Status",
    },
    {
      field: "action",
      header: "Action",
    },
  ];

  const datas = [];
  userData()?.map((values, index) => {
    return datas.push({
      id: values?.id,
      name: values?.name,
      email: values?.email,
      type: "EVDC-120KW",
      logIn: dayjs(values?.lastLogin).format("DD MMM, YYYY h:mm a"),
      status: (
        <div>
          {values?.status ? (
            <div
              className="bg-[#21965314] text-themeGreen font-semibold p-2 rounded-md flex 
              justify-center"
            >
              Active
            </div>
          ) : (
            <div
              className="bg-[#EE4A4A14] text-themeRed font-semibold p-2 rounded-md flex 
              justify-center"
            >
              Block
            </div>
          )}
        </div>
      ),
      action: (
        <div className="flex items-center gap-3">
          <label>
            <Switch
              onChange={() => {
                updateStatus(values?.id, values?.status);
              }}
              checked={values?.status}
              uncheckedIcon={false}
              checkedIcon={false}
              onColor="#139013"
              onHandleColor="#fff"
              className="react-switch"
              boxShadow="none"
            />
          </label>
        </div>
      ),
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
              User Management
            </h2>
            <div className="flex gap-2">
              <AddButton
                text="Message user"
                onClick={() => navigate("/add-user")}
              />
            </div>
          </div>

          <div className="space-y-3">
            <Helment
              search={true}
              searchOnChange={(e) => setSearch(e.target.value)}
              searchValue={search}
            />

            <MyDataTable columns={columns} data={datas} />
          </div>
        </div>
      }
    />
  );
}
