import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { TabButton } from "../../utilities/Buttons";
import Select from "react-select";
import Switch from "react-switch";
import { BASE_URL } from "../../utilities/URL";
import axios from "axios";
import { MiniLoader } from "../../components/Loader";
import {
  error_toaster,
  info_toaster,
  success_toaster,
} from "../../utilities/Toaster";
import { PostAPI } from "../../utilities/PostAPI";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function Settings() {
  const adminId = localStorage.getItem("userId");
  const [tab, setTab] = useState("Profile");
  const [loader, setLoader] = useState(false);
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [preference, setPreference] = useState();
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [profile, setProfile] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    password: ""
  });

  const handleOnChangeEvent = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const updateProfile = async () => {
    setLoader(true);
    let res = await PostAPI("admin/udpateProfile", {
      id: profile?.id,
      name: profile?.name,
      email: profile?.email,
      password: profile?.password,
    });
    if (res?.data?.status === "1") {
      reFetch();
      success_toaster(res?.data?.message);
      setLoader(false);
    } else {
      error_toaster(res?.data?.message);
      setLoader(false);
    }
  };

  const updatePassword = async () => {
    if (password?.newPassword !== password?.confirmPassword) {
      info_toaster("New Password does not match with Confirm Password");
    } else {
      setLoader(true);
      let res = await PostAPI("admin/udpatePassword", {
        id: adminId,
        password: password?.newPassword,
        confirmPassword: password?.confirmPassword,
      });
      if (res?.data?.status === "1") {
        reFetch();
        success_toaster(res?.data?.message);
        setLoader(false);
      } else {
        error_toaster(res?.data?.message);
        setLoader(false);
      }
    }
  };

  const updateStatus = async (id, values) => {
    setLoader(true);
    const value = parseInt(values);
    if (value === 1) {
      let res = await PostAPI("admin/changeSetting", {
        id: id,
        value: 0,
      });
      if (res?.data?.status === "1") {
        setLoader(false);
        success_toaster(res?.data?.message);
        reFetch();
      } else {
        setLoader(false);
        error_toaster(res?.data?.message);
      }
    } else {
      let res = await PostAPI("admin/changeSetting", {
        id: id,
        value: 1,
      });
      if (res?.data?.status === "1") {
        setLoader(false);
        success_toaster(res?.data?.message);
        reFetch();
      } else {
        setLoader(false);
        error_toaster(res?.data?.message);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      };

      try {
        let response;
        if (tab === "Profile") {
          setLoader(true);
          response = await axios.get(
             `https://shippinghack.myace.app/admin/getProfile/${localStorage.getItem("userId")}`,
            config
          ); 
          setLoader(false);
          setProfile({
            id: response?.data?.data?.userData?.id,
            name: response?.data?.data?.userData?.name,
            email: response?.data?.data?.userData?.email,
            phone: response?.data?.data?.userData?.phone,
            address: response?.data?.data?.userData?.address,
            city: response?.data?.data?.userData?.city,
            country: response?.data?.data?.userData?.country,
          });
        } else if (tab === "Preferences") {
          setLoader(true);
          response = await axios.get("https://fominobackend.myace.app/admin/getSettings", config);
          setLoader(false);
          setPreference(response);
        }
      } catch (err) {
        console.error("Error in request:", err);
      }
    };

    fetchData();
  }, [tab]);

  const reFetch = async () => {
    var config = {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    };
    try {
      let response;
      if (tab === "Profile") {
        response = await axios.get(
          `https://shippinghack.myace.app/admin/getProfile/${localStorage.getItem("userId")}`,
          config
        );
        setProfile({
          id: response?.data?.data?.userData?.id,
          name: response?.data?.data?.userData?.name,
          email: response?.data?.data?.userData?.email,
          phone: response?.data?.data?.userData?.phone,
          address: response?.data?.data?.userData?.address,
          city: response?.data?.data?.userData?.city,
          country: response?.data?.data?.userData?.country,
        });
      } else if (tab === "Preferences") {
        response = await axios.get("https://fominobackend.myace.app/admin/getSettings", config);
        setPreference(response);
      }
    } catch (err) {
      info_toaster(err);
    }
  };

  return (
    <Layout
      content={
        <div className="p-5 space-y-5">
          <div className="flex justify-between items-center flex-wrap gap-5">
            <h2 className="text-themeDarkBlue text-2xl font-bold font-poppins">
              Settings
            </h2>
          </div>

          <div className="py-5 space-y-1.5">
            <ul className="flex flex-wrap items-center gap-8">
              <TabButton
                title="Profile"
                tab={tab}
                onClick={() => setTab("Profile")}
              />
              {/* <TabButton
                title="Preferences"
                tab={tab}
                onClick={() => setTab("Preferences")}
              /> */}
              <TabButton
                title="Change Password"
                tab={tab}
                onClick={() => setTab("Change Password")}
              />
            </ul>
          </div>

          {tab === "Profile" ? (
            <div className="bg-white rounded-lg p-5 space-y-5">
              {loader ? (
                <div className="h-[360px]">
                  <MiniLoader />
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-5">
                  <div className="flex flex-col gap-y-2">
                    <label
                      htmlFor="name"
                      className="text-themeBlack font-medium font-manrope"
                    >
                      Name
                    </label>
                    <input
                      value={profile?.name}
                      type="text"
                      name="name"
                      placeholder="Enter Name"
                      className="border border-themeBorderGray rounded-md outline-none px-3 py-2 placeholder:font-manrope font-manrope"
                      onChange={handleOnChangeEvent}
                    />
                  </div>

                  <div className="flex flex-col gap-y-2">
                    <label
                      htmlFor="email"
                      className="text-themeBlack font-medium font-manrope"
                    >
                      Email
                    </label>
                    <input
                      value={profile?.email}
                      type="email"
                      name="email"
                      placeholder="Enter Email"
                      className="border border-themeBorderGray rounded-md outline-none px-3 py-2 placeholder:font-manrope font-manrope"
                      onChange={handleOnChangeEvent}
                    />
                  </div>

                  <div className="flex flex-col gap-y-2">
                    <label
                      htmlFor="number"
                      className="text-themeBlack font-medium font-manrope"
                    >
                      Mobile number
                    </label>
                    <input
                      value={profile?.phone}
                      type="number"
                      name="number"
                      placeholder="Enter Number"
                      className="border border-themeBorderGray rounded-md outline-none px-3 py-2 placeholder:font-manrope font-manrope"
                      onChange={handleOnChangeEvent}
                    />
                  </div>

                  <div className="flex flex-col gap-y-2">
                    <label
                      htmlFor="password"
                      className="text-themeBlack font-medium font-manrope"
                    >
                      Password
                    </label>
                    <input
                      value={profile?.address}
                      type="password"
                      name="password"
                      placeholder="Enter address"
                      className="border border-themeBorderGray rounded-md outline-none px-3 py-2 placeholder:font-manrope font-manrope"
                      onChange={handleOnChangeEvent}
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 col-span-2">
                    <button
                      className="flex items-center justify-center gap-2 text-sm border border-theme 
                text-white font-semibold font-manrope rounded-md px-5 py-2 h-10 bg-theme hover:bg-transparent hover:text-theme duration-200"
                      onClick={() => window.history.back()}
                    >
                      Cancel
                    </button>
                    <button
                      className="flex items-center justify-center gap-2 text-sm border border-theme 
                 text-white font-semibold font-manrope rounded-md px-5 py-2 h-10 bg-theme hover:bg-transparent hover:text-theme duration-200"
                      onClick={updateProfile}
                    >
                      Save
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : tab === "Preferences" ? (
            <div className="bg-white rounded-lg p-5 space-y-5">
              {loader ? (
                <div className="h-[360px]">
                  <MiniLoader />
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-5">
                  {preference?.data?.data?.data?.map((pre, ind) => (
                    <div className="flex items-center justify-between border-[1.5px] rounded-lg p-2.5 gap-y-2 border-[#EBEDF0]">
                      <label
                        htmlFor="email"
                        className="text-themeBlack font-medium font-manrope flex flex-col"
                      >
                        <span className="font-semibold text-lg">
                          {pre?.key === "emailNotification"
                            ? "Email notification"
                            : pre?.key === "newsLetter"
                            ? "Neweletters"
                            : "Automated reports"}
                        </span>
                        <span className="text-[#767C8C]">
                          {pre?.key === "emailNotification"
                            ? "Allow to receive email notification"
                            : pre?.key === "newsLetter"
                            ? "Allow to stay updated and receive neweletter"
                            : "Allow to send us report automatically incase of any issue"}
                        </span>
                      </label>
                      <div>
                        <Switch
                          onChange={() => {
                            updateStatus(pre?.id, pre?.value);
                          }}
                          checked={pre?.value === "1" ? true : false}
                          uncheckedIcon={false}
                          checkedIcon={false}
                          onColor="#C40C34"
                          onHandleColor="#fff"
                          className="react-switch"
                          boxShadow="none"
                          width={48}
                        />
                      </div>
                    </div>
                  ))}

                  {/* <div className="flex items-center justify-end gap-2">
                    <button
                      className="flex items-center justify-center gap-2 text-sm border border-theme 
                text-white font-semibold font-manrope rounded-md px-5 py-2 h-10 bg-theme hover:bg-transparent hover:text-theme duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      className="flex items-center justify-center gap-2 text-sm border border-theme 
                 text-white font-semibold font-manrope rounded-md px-5 py-2 h-10 bg-theme hover:bg-transparent hover:text-theme duration-200"
                    >
                      Save
                    </button>
                  </div> */}
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-lg p-5 space-y-5">
              {loader ? (
                <div className="h-[360px]">
                  <MiniLoader />
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-5">
                  {/* <div className="flex flex-col gap-y-2 relative">
                    <label
                      htmlFor="oldPassword"
                      className="text-themeBlack font-medium font-manrope"
                    >
                      Old Password
                    </label>
                    <input
                      type={showOld ? "text" : "password"}
                      name="oldPassword"
                      placeholder="Enter Old password"
                      className="border border-themeBorderGray rounded-md outline-none px-3 py-2 placeholder:font-manrope"
                      onChange={handlePasswordChange}
                    />
                    <button
                      onClick={() => setShowOld(!showOld)}
                      type="button"
                      className="text-themeBlack absolute right-4 top-10"
                    >
                      {showOld ? (
                        <AiOutlineEye size={24} />
                      ) : (
                        <AiOutlineEyeInvisible size={24} />
                      )}
                    </button>
                  </div> */}

                  <div className="flex flex-col gap-y-2 relative">
                    <label
                      htmlFor="newPassword"
                      className="text-themeBlack font-medium font-manrope"
                    >
                      New password
                    </label>
                    <input
                      type={showNew ? "text" : "password"}
                      name="newPassword"
                      placeholder="Enter New Password"
                      className="border border-themeBorderGray rounded-md outline-none px-3 py-2 placeholder:font-manrope"
                      onChange={handlePasswordChange}
                    />
                    <button
                      onClick={() => setShowNew(!showNew)}
                      type="button"
                      className="text-themeBlack absolute right-4 top-10"
                    >
                      {showNew ? (
                        <AiOutlineEye size={24} />
                      ) : (
                        <AiOutlineEyeInvisible size={24} />
                      )}
                    </button>
                  </div>

                  <div className="flex flex-col gap-y-2 relative">
                    <label
                      htmlFor="confirmPassword"
                      className="text-themeBlack font-medium font-manrope"
                    >
                      Confirm Password
                    </label>
                    <input
                      type={showConfirm ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Enter Confirm Password"
                      className="border border-themeBorderGray rounded-md outline-none px-3 py-2 placeholder:font-manrope"
                      onChange={handlePasswordChange}
                    />
                    <button
                      onClick={() => setShowConfirm(!showConfirm)}
                      type="button"
                      className="text-themeBlack absolute right-4 top-10"
                    >
                      {showConfirm ? (
                        <AiOutlineEye size={24} />
                      ) : (
                        <AiOutlineEyeInvisible size={24} />
                      )}
                    </button>
                  </div>

                  <div className="flex items-center justify-end gap-2 col-span-2">
                    <button
                      className="flex items-center justify-center gap-2 text-sm border border-theme 
                text-white font-semibold font-manrope rounded-md px-5 py-2 h-10 bg-theme hover:bg-transparent hover:text-theme duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      className="flex items-center justify-center gap-2 text-sm border border-theme 
                 text-white font-semibold font-manrope rounded-md px-5 py-2 h-10 bg-theme hover:bg-transparent hover:text-theme duration-200"
                      onClick={updatePassword}
                    >
                      Save
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      }
    />
  );
}
