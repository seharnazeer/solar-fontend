import React from "react";
import Layout from "../../components/Layout";

export default function Messaging() {
  return (
    <Layout
      content={
        <div className="p-5 space-y-5">
          <div className="flex justify-between items-center flex-wrap gap-5">
            <h2 className="text-themeDarkBlue text-2xl font-bold font-poppins">
              Message user
            </h2>
          </div>

          <div className="bg-white rounded-lg grid grid-cols-2 gap-5 p-5">
            {/* {loader ? (
              <div className="h-[270px]">
                <MiniLoader />
              </div>
            ) : ( */}
            <>
              <div className="flex flex-col gap-y-2">
                <label
                  htmlFor="name"
                  className="text-themeBlack font-medium font-manrope"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Email"
                  className="border border-themeBorderGray rounded-md outline-none px-3 py-2 placeholder:font-manrope"
                  // onChange={handleInputEventChange}
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
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  className="border border-themeBorderGray rounded-md outline-none px-3 py-2 placeholder:font-manrope"
                  // onChange={handleInputEventChange}
                />
              </div>

              <div className="flex flex-col gap-y-2 col-span-2">
                <label
                  htmlFor="message"
                  className="text-themeBlack font-medium font-manrope"
                >
                  Message
                </label>
                <textarea
                  type="text"
                  name="message"
                  rows={5}
                  placeholder="Type message"
                  className="bg-[#F1F5F9] rounded-md outline-none px-3 py-4 placeholder:font-manrope"
                  // onChange={handleInputEventChange}
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
                  // onClick={addNewUser}
                >
                  Send Message
                </button>
              </div>
            </>
          </div>
        </div>
      }
    />
  );
}
