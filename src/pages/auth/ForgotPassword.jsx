import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { forgotSchema } from "../../schemas";
import { errorStyle } from "../../utilities/Input";
import { PostAPI } from "../../utilities/PostAPI";
import { error_toaster, success_toaster } from "../../utilities/Toaster";
import { FaArrowLeft } from "react-icons/fa";
import Loader from "../../components/Loader";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
      },
      validationSchema: forgotSchema,
      onSubmit: async (values, action) => {
        setLoader(true);
        let res = await PostAPI("admin/forgetPasswordRequest", {
          email: values.email,
        });
        if (res?.data?.status === "1") {
          setLoader(false);
          success_toaster(res?.data?.message);
          navigate("/verify-otp", {
            state: {
              data: res?.data?.data,
            },
          });
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
            type="button"
            onClick={() => window.history.back()}
          className="w-8 h-8 bg-[#F0F1F5] rounded-full flex justify-center items-center hover:bg-theme hover:text-white duration-200"
          >
            <FaArrowLeft />
          </button>
          <div>
            <h2 className="text-themeBlack font-bold text-[32px] font-poppins">
              Enter Email Address
            </h2>
            <p className="text-themeGray font-medium font-manrope">
              We will send you a reset password link to your email address.
            </p>
          </div>

          <div className={errors.email && touched.email && errorStyle}>
            <div className="flex flex-col gap-y-2">
              <label
                htmlFor="email"
                className="text-themeBlack font-medium font-manrope"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your Email"
                className="border border-themeBorderGray rounded-md outline-none px-3 py-2 placeholder:font-manrope"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.email && touched.email && (
                <div className="text-red-500">
                  <p>{errors.email}</p>
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="py-2.5 px-5 w-full font-semibold text-base
            text-themeGray font-manrope bg-themeLightGray border
            border-themeLightGray rounded hover:bg-theme hover:text-white
            duration-200 text-center"
          >
            Reset Password
          </button>
        </form>
      </div>

      <div className="col-span-3 bg-theme">
        <div className="flex justify-center items-center h-full"></div>
      </div>
    </div>
  );
}
