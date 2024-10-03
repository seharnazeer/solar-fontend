import React from "react";
import { FaRegBell } from "react-icons/fa";

export default function Header() {
  return (
    <header className="w-[calc(100%-20%)] ml-[20%] bg-white fixed z-50">
      <div className="col-span-7 py-4 px-10 flex justify-end items-center gap-x-5">
        <div className="w-10 h-10 border border-themeGray flex justify-center items-center rounded-full">
          <FaRegBell size={24} color="#19191A" />
        </div>
        <div>
          <img
            src="/images/user.webp"
            alt="user"
            className="w-10 h-10"
          />
        </div>
        <div className="flex items-center gap-2.5">
          <h2 className="text-themeBlack text-lg font-medium font-manrope">
            {localStorage.getItem("userName")}
          </h2>
        </div>
      </div>
    </header>
  );
}
