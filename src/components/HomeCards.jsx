import React from "react";
import { Link } from "react-router-dom";

export default function HomeCards(props) {
  return (
    <Link to={props.to}>
      <div className="bg-white p-5 rounded-lg shadow-lg">
        <div className="flex flex-col gap-5">
          <div className={`${props.bg} w-12 h-12 rounded-md flex justify-center items-center`}>
            <img
              src={`/images/${props.image}.webp`}
              alt={`${props.image}`}
              className="w-8 h-8 object-contain"
            />
          </div>
          <div className="text-2xl font-semibold font-poppins">{props.total}</div>
          <div className="text-base font-normal font-manrope text-themeGray">{props.title}</div>
        </div>
      </div>
    </Link>
  );
}
