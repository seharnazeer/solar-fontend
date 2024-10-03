import React from "react";
import { LuSearch } from "react-icons/lu";
import { useLocation } from "react-router-dom";

export default function Helment(props) {
  return (
    <>
      <div className="relative">
        <input
          type="search"
          placeholder="Search"
          className="w-80 h-[42px] bg-white rounded-md pl-9 pr-2 outline-none placeholder:text-themeGray placeholder:font-manrope"
          onChange={props?.searchOnChange}
          value={props?.searchValue}
        />
        <LuSearch
          size={18}
          color="#767C8C"
          className="absolute top-3 left-3"
        />
      </div>
    </>
  );
}
