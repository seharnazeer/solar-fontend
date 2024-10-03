import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { newPasswordSchema } from "../../schemas";
import { errorStyle } from "../../utilities/Input";
import { PostAPI } from "../../utilities/PostAPI";
import { error_toaster, success_toaster } from "../../utilities/Toaster";
import { FaArrowLeft } from "react-icons/fa";
import Loader from "../../components/Loader";

export default function NewPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location?.state?.data;
  console.log("🚀 ~ NewPassword ~ data:", data);
  const [visible, setVisible] = useState(false);
  const [show, setShow] = useState(false);
  const [loader, setLoader] = useState(false);

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: newPasswordSchema,
    onSubmit: async (values, action) => {
      setLoader(true);
      let res = await PostAPI("admin/changePasswordAfterOtp", {
        OTP: data?.otp,
        password: values.newPassword,
        userId: data?.data?.userId,
        forgetRequestId: data?.data?.forgetRequestId,
      });
      if (res?.data?.status === "1") {
        setLoader(false);
        navigate("/login");
        success_toaster(res?.data?.message);
      } else {
        setLoader(false);
        error_toaster(res?.data?.message);
      }
      action.resetForm();
    },
  });

  return loader ? (
    <Loader />
  ) : (
    <div className="w-full h-screen grid grid-cols-5">
      <div className="flex flex-col justify-center col-span-2">
        <form className="space-y-6 w-3/4 mx-auto" onSubmit={handleSubmit}>
          <button
            onClick={() => window.history.back()}
            className="w-8 h-8 bg-[#F0F1F5] rounded-full flex justify-center items-center hover:bg-theme hover:text-white duration-200"
          >
            <FaArrowLeft />
          </button>
          <div>
            <h2 className="text-themeBlack font-bold text-[32px] font-poppins">
              Create New Password
            </h2>
            <p className="text-themeGray font-medium font-manrope">
              We’ve sent a One Time Password (OTP) to your email. Please enter
              it below.
            </p>
          </div>

          <div
            className={errors.newPassword && touched.newPassword && errorStyle}
          >
            <div className="flex flex-col gap-y-2 relative">
              <label
                htmlFor="newPassword"
                className="text-themeBlack font-medium font-manrope"
              >
                New Password
              </label>
              <input
                type={visible ? "text" : "password"}
                name="newPassword"
                placeholder="Enter your Password"
                className="border border-themeBorderGray rounded-md outline-none px-3 py-2 placeholder:font-manrope"
                value={values.newPassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <button
                onClick={() => setVisible(!visible)}
                type="button"
                className="text-themeBlack absolute right-4 top-10"
              >
                {visible ? (
                  <AiOutlineEye size={24} />
                ) : (
                  <AiOutlineEyeInvisible size={24} />
                )}
              </button>

              {errors.newPassword && touched.newPassword && (
                <div className="text-red-600">
                  <p>{errors.newPassword}</p>
                </div>
              )}
            </div>
          </div>

          <div
            className={
              errors.confirmPassword && touched.confirmPassword && errorStyle
            }
          >
            <div className="flex flex-col gap-y-2 relative">
              <label
                htmlFor="confirmPassword"
                className="text-themeBlack font-medium font-manrope"
              >
                Confirm New Password
              </label>
              <input
                type={show ? "text" : "password"}
                name="confirmPassword"
                placeholder="Enter your Password"
                className="border border-themeBorderGray rounded-md outline-none px-3 py-2 placeholder:font-manrope"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <button
                onClick={() => setShow(!show)}
                type="button"
                className="text-themeBlack absolute right-4 top-10"
              >
                {show ? (
                  <AiOutlineEye size={24} />
                ) : (
                  <AiOutlineEyeInvisible size={24} />
                )}
              </button>

              {errors.confirmPassword && touched.confirmPassword && (
                <div className="text-red-600">
                  <p>{errors.confirmPassword}</p>
                </div>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="py-2.5 px-5 w-full font-semibold text-base text-themeGray font-manrope
             bg-themeLightGray border border-themeLightGray rounded hover:bg-theme
              hover:text-white duration-200"
            >
              Save Password
            </button>
          </div>
        </form>
      </div>

      <div className="col-span-3 bg-theme">
        <div className="flex justify-center items-center h-full"></div>
      </div>
    </div>
  );
}
