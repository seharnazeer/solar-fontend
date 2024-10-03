import React, { useState } from "react";
import { LuUsers2 } from "react-icons/lu";
import {
  MdOutlineDashboard,
  MdOutlineLogout,
  MdOutlinePayment,
} from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BiMessageDetail } from "react-icons/bi";
import { CgFileDocument } from "react-icons/cg";
import { FiSettings } from "react-icons/fi";
import ListHead from "./ListHead";
import { info_toaster } from "../utilities/Toaster";
import { GrAnalytics } from "react-icons/gr";
import { RiMoonClearLine } from "react-icons/ri";
import { FaRegFileLines } from "react-icons/fa6";
import { GoInfo } from "react-icons/go";
import Switch from "react-switch";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

export default function SideBar() {
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation().pathname;

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("loginStatus");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    navigate("/login");
    info_toaster("Successfully Logged out!");
  };

  return (
    <>
      <nav className="w-1/5 float-left fixed h-full flex bg-white flex-col gap-5">
        <div className="flex col-span-2 py-6 px-4">
          <Link to="/">
            <div className="text-xl font-bold font-manrope">
              Helping Hands EV
            </div>
          </Link>
        </div>
        <ul className="flex flex-col gap-y-10 overflow-auto pb-3">
          <div className="space-y-1">
            <ListHead
              title="Dashboard"
              to="/"
              Icon={MdOutlineDashboard}
              active={location === "/station-details"}
            />
            <ListHead
              title="Booking"
              to="/bookings"
              Icon={FaRegFileLines}
              active={location === "/add-property"}
            />
            <ListHead
              title="Users"
              to="/user-management"
              Icon={LuUsers2}
              active={location === "/add-user" || location === "/update-user"}
            />

            <ListHead
              title="Track"
              to="/track"
              Icon={CgFileDocument}
              active={
                location === "/content-management/blogs" ||
                location === "/content-management/faqs" ||
                location === "/content-management/faqs/add-faq" ||
                location === "/content-management/blogs/add-blog"
              }
            />
            <ListHead
              title="Analysis"
              Icon={GrAnalytics}
              to="/analysis"
              active={location === "/transactions/transaction-details"}
            />
            <ListHead
              title="Messaging"
              Icon={BiMessageDetail}
              to="/messaging"
              active={
                location === "/security/security-questions" ||
                location === "/security/phone-verification"
              }
            />
            <ListHead title="Payments" Icon={MdOutlinePayment} to="/payments" />

            <ListHead
              title="Settings"
              Icon={FiSettings}
              to="/settings"
              // active={location === "/support/ticket-details"}
            />

            <li className="px-3">
              <button
                className="w-full flex gap-x-1.5 items-center py-1.5 lg:py-3 px-2 rounded-md text-themeBlack hover:bg-themeBlack hover:text-white duration-200 font-semibold font-manrope"
                onClick={() => {
                  setModal(true);
                }}
              >
                <MdOutlineLogout size={24} />
                <span>Logout</span>
              </button>
            </li>
          </div>

          {/* <div className="space-y-1">
            <div className="flex gap-x-3 items-center py-2 lg:py-3 px-5 text-[#64748B] font-semibold font-manrope">
              <RiMoonClearLine size={24} />
              <h2>Dark Mode</h2>
              <Switch
                checked={true}
                uncheckedIcon={false}
                checkedIcon={false}
                onColor="#CBD5E1"
                onHandleColor="#fff"
                className="react-switch"
                boxShadow="none"
                width={36}
                height={23}
              />
            </div>

            <ListHead
              title="Settings"
              Icon={FiSettings}
              to="/settings"
              // active={location === "/support/ticket-details"}
            />

            <li className="px-3">
              <button
                className="w-full flex gap-x-1.5 items-center py-1.5 lg:py-3 px-2 rounded-md text-themeBlack hover:bg-themeBlack hover:text-white duration-200 font-semibold font-manrope"
                onClick={() => {
                  setModal(true);
                }}
              >
                <MdOutlineLogout size={24} />
                <span>Logout</span>
              </button>
            </li>
          </div> */}
        </ul>
      </nav>

      <Modal onClose={() => setModal(false)} isOpen={modal} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <div className="flex flex-col items-center gap-3 py-10">
              <div className="text-6xl text-themeRed">
                <GoInfo />
              </div>

              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold font-poppins">Logout</h2>
                <p className="text-[#474C59] font-manrope">
                  Are you sure that you want to logout?
                </p>
              </div>

              <div className="space-y-2">
                <button
                  onClick={logout}
                  className="w-[300px] flex items-center justify-center gap-2 text-sm border border-themeBlack text-white font-semibold font-manrope rounded-md px-5 py-2 
                  h-10 bg-themeBlack hover:bg-transparent hover:text-themeBlack duration-200"
                >
                  Yes
                </button>

                <button
                  onClick={() => setModal(false)}
                  className="w-[300px] flex items-center justify-center gap-2 text-sm border border-themeBlack text-themeBlack font-semibold font-manrope rounded-md px-5 
                  py-2 h-10 bg-transparent hover:bg-themeBlack hover:text-white duration-200"
                >
                  No
                </button>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
