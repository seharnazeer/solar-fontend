import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "../../schemas";
import { errorStyle } from "../../utilities/Input";
import { setLoginStatus } from "../../utilities/AuthCheck";
import { error_toaster, success_toaster } from "../../utilities/Toaster";
import Loader from "../../components/Loader";
import { loginAPI } from "../../utilities/PostAPI";

export default function Login() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
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
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values, action) => {
      setLoader(true);
      let res = await loginAPI("admin/login", {
        email: values.email,
        password: values.password,
      });
      console.log("🚀 ~ onSubmit: ~ res:", res)
      if (res?.data?.status === "1") {
        setLoader(false);
        localStorage.setItem("accessToken", res?.data?.data?.accessToken);
        localStorage.setItem("userId", res?.data?.data?.userId);
        localStorage.setItem("userEmail", res?.data?.data?.email);
        localStorage.setItem("userName", res?.data?.data?.name);
        setLoginStatus(true);
        navigate("/");
        success_toaster("Login Successfully");
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
        <form className="space-y-5 w-3/4 mx-auto" onSubmit={handleSubmit}>
          <div>
            <h2 className="text-themeBlack font-bold text-[32px] font-poppins">
              Log in to Admin panel
            </h2>
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

          <div className={errors.password && touched.password && errorStyle}>
            <div className="flex flex-col gap-y-2 relative">
              <label
                htmlFor="password"
                className="text-themeBlack font-medium font-manrope"
              >
                Password
              </label>
              <input
                type={visible ? "text" : "password"}
                name="password"
                placeholder="Enter your Password"
                className="border border-themeBorderGray rounded-md outline-none px-3 py-2 placeholder:font-manrope"
                value={values.password}
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

              {errors.password && touched.password && (
                <div className="text-red-600">
                  <p>{errors.password}</p>
                </div>
              )}
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="py-2.5 px-5 w-full font-semibold text-base text-themeGray font-manrope
             bg-themeLightGray border border-themeLightGray rounded hover:bg-theme hover:text-white duration-200"
            >
              Login
            </button>
          </div>

          <div>
            <Link
              to="/forgot-password"
              className="flex justify-center text-themeRed text-base font-semibold font-manrope"
            >
              Reset Password
            </Link>
          </div>
        </form>
      </div>

      <div className="col-span-3 bg-theme">
        <div className="flex justify-center items-center h-full"></div>
      </div>
    </div>
  );
}
