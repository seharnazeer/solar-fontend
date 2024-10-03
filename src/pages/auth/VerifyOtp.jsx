import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import OTPInput from "react-otp-input";
import { useLocation, useNavigate } from "react-router-dom";
import { info_toaster } from "../../utilities/Toaster";

export default function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const inputStyle = {
    width: "50px",
    height: "50px",
    border: "1.5px solid #EBEDF0",
    borderRadius: "5px",
    margin: "0 5px",
    fontSize: "18px",
    textAlign: "center",
  };

  const navigateNewPassword = () => {
    if (otp === "") {
      info_toaster("Please Enter OTP");
    } else {
      navigate("/new-password", {
        state: {
          data: {
            data: location?.state?.data,
            otp: otp,
          },
        },
      });
    }
  };

  return (
    <div className="w-full h-screen grid grid-cols-5">
      <div className="flex flex-col justify-center col-span-2">
        <div className="space-y-6 w-3/4 mx-auto">
          <button
            onClick={() => window.history.back()}
            className="w-8 h-8 bg-[#F0F1F5] rounded-full flex justify-center items-center hover:bg-theme hover:text-white duration-200"
          >
            <FaArrowLeft />
          </button>
          <div>
            <h2 className="text-themeBlack font-bold text-[32px] font-poppins">
              Verification Required
            </h2>
            <p className="text-themeGray font-medium font-manrope">
              We’ve sent a One Time Password (OTP) to your email. Please enter
              it below.
            </p>
          </div>

          <div>
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span>-</span>}
              renderInput={(props) => <input {...props} style={inputStyle} />}
            />
          </div>

          <div>
            <button
              onClick={navigateNewPassword}
              className="py-2.5 px-5 w-full
              font-semibold text-base text-themeGray font-manrope
              bg-themeLightGray border border-themeLightGray rounded
              hover:bg-theme hover:text-white duration-200 text-center"
            >
              Continue
            </button>
          </div>

          <div className="flex justify-center text-themeRed text-base font-semibold font-manrope">
            <button>Resend OTP</button>
          </div>
        </div>
      </div>

      <div className="col-span-3 bg-theme">
        <div className="flex justify-center items-center h-full"></div>
      </div>
    </div>
  );
}
