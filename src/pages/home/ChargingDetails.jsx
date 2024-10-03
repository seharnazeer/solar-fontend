import React, { useRef, useState } from "react";
import Layout from "../../components/Layout";
import { IoIosSearch } from "react-icons/io";
import { FaLocationDot, FaChargingStation } from "react-icons/fa6";
import { FaArrowLeft, FaDirections } from "react-icons/fa";
import LineChartDots from "../../components/LineChartDots";
import Switch from "react-switch";
import GetAPI from "../../utilities/GetAPI";
import Loader, { MiniLoader } from "../../components/Loader";
import AddButton from "../../utilities/Buttons";
import { Autocomplete, LoadScript } from "@react-google-maps/api";
import Select from "react-select";
import { Modal, ModalOverlay, ModalContent, ModalBody } from "@chakra-ui/react";
import { GrLocation } from "react-icons/gr";
import {
  error_toaster,
  info_toaster,
  success_toaster,
} from "../../utilities/Toaster";
import { PostAPI } from "../../utilities/PostAPI";

const ChargingDetails = () => {
  const { data, reFetch } = GetAPI("admin/getAllChargingStation");
  const vehicles = GetAPI("admin/getvehicleType");
  const battery = GetAPI("admin/battChargerTypes");
  const [modal, setModal] = useState(false);
  const [address, setAddress] = useState(null);
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const autocompleteRef = useRef(null);
  const [loader, setLoader] = useState(false);
  const [addStation, setAddStation] = useState({
    name: "",
    price: "",
    capacity: "",
    batteryTypeId: "",
    chargerTypeId: "",
    mount: "",
    vehicleTypeId: "",
    combo: "",
    ocp: "",
    address: "",
    city: "",
    state: "",
    lat: "",
    lng: "",
    userId: "",
  });

  const handleOnChangeEvent = (e) => {
    setAddStation({ ...addStation, [e.target.name]: e.target.value });
  };

  const handleSelect = () => {
    const place = autocompleteRef.current.getPlace();
    if (place && place.geometry) {
      setAddress(place.formatted_address);
      const { lat, lng } = place.geometry.location;
      setCoordinates({ lat: lat(), lng: lng() });
    }
  };

  const comboOptions = [
    { value: 1, label: "Yes" },
    { value: 2, label: "No" },
  ];

  const vehicleTypeOptions = [];
  const batteryTypeOptions = [];
  const chargingTypeOptions = [];

  vehicles?.data?.data?.types?.map((veh, ind) => {
    vehicleTypeOptions.push({ value: veh?.id, label: veh?.name });
  });

  battery?.data?.data?.batteryTypes?.map((veh, ind) => {
    batteryTypeOptions.push({ value: veh?.id, label: veh?.name });
  });

  battery?.data?.data?.chargerTypes?.map((veh, ind) => {
    chargingTypeOptions.push({ value: veh?.id, label: veh?.name });
  });

  const addNewStation = async () => {
    if (addStation?.name === "") {
      info_toaster("Please Enter Station Name");
    } else if (addStation?.capacity === "") {
      info_toaster("Please Enter Station Capacity");
    } else if (addStation?.price === "") {
      info_toaster("Please Enter Price");
    } else if (addStation?.mount === "") {
      info_toaster("Please Enter Mount");
    } else if (addStation?.ocp === "") {
      info_toaster("Please Enter OCP");
    } else if (addStation?.combo === "") {
      info_toaster("Please Select Combo");
    } else if (addStation?.vehicleTypeId === "") {
      info_toaster("Please Select Vehicle");
    } else if (addStation?.chargerTypeId === "") {
      info_toaster("Please Select Chaging Type");
    } else if (addStation?.batteryTypeId === "") {
      info_toaster("Please Select Battery Type");
    } else if (address === "") {
      info_toaster("Please Enter Address");
    } else if (addStation?.city === "") {
      info_toaster("Please Enter City");
    } else if (addStation?.state === "") {
      info_toaster("Please Enter State");
    } else {
      setLoader(true);
      let res = await PostAPI("admin/addChargingStation", {
        name: addStation?.name,
        price: addStation?.price,
        capacity: addStation?.capacity,
        batteryTypeId: addStation?.batteryTypeId,
        chargerTypeId: addStation?.chargerTypeId,
        mount: addStation?.mount,
        vehicleTypeId: addStation?.vehicleTypeId,
        combo: addStation?.combo,
        ocp: addStation?.ocp,
        address: address,
        city: addStation?.name,
        state: addStation?.name,
        lat: coordinates?.lat,
        lng: coordinates?.lng,
        userId: localStorage.getItem("userId"),
      });
      if (res?.data?.status === "1") {
        success_toaster(res?.data?.message);
        reFetch();
        setLoader(false);
        setModal(false);
      } else {
        error_toaster(res?.data?.message);
        setLoader(false);
      }
    }
  };

  return data?.length === 0 ? (
    <Loader />
  ) : (
    <Layout
      content={
        <>
          <div className="font-poppins p-5">
            <div className="flex items-center gap-2">
              <button
                onClick={() => window.history.back()}
                className="w-8 h-8 bg-themeMainGray rounded-full flex justify-center items-center hover:bg-theme hover:text-white duration-200"
              >
                <FaArrowLeft />
              </button>
              <div className="flex justify-between w-full">
                <p className=" rounded-lg px-2 text-black font-semibold flex items-center gap-2 py-1 cursor-pointer">
                  <FaLocationDot />
                  {` ${data?.data?.chargingStations[0]?.address} ${data?.data?.chargingStations[0]?.city} `}
                </p>
                <div className="py-1 flex border-black border-[1px] rounded-2xl relative">
                  <input
                    className="w-72 h-full mx-4 pl-3 text-sm outline-none bg-transparent"
                    placeholder="Search"
                    type="text"
                  />
                  <IoIosSearch className="absolute top-[50%] translate-y-[-50%] left-2" />
                </div>
              </div>
            </div>

            {/* ============================== */}
            <div className="w-full flex justify-between mt-4">
              <div className="w-[69%]">
                <div className="w-full h-[400px] rounded-xl overflow-hidden">
                  <iframe
                    className="w-full h-full"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d46830151.11795831!2d-119.8093025!3d44.24236485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54eab584e432360b%3A0x1c3bb99243deb742!2sUnited%20States!5e0!3m2!1sen!2s!4v1722684699275!5m2!1sen!2s"
                  ></iframe>
                </div>
                <div className="w-full mt-4 flex items-center justify-between pl-2 border-black border-[1px] rounded-lg">
                  <p className="font-medium">Available station</p>
                  <AddButton
                    text="Add New Station"
                    onClick={() => setModal(true)}
                  />
                </div>

                {/* ============================== */}
                <div className="grid grid-cols-3 gap-3">
                  {data?.data?.chargingStations?.map((station, index) => (
                    <div className="flex gap-2 text-white mt-4 mb-2">
                      <div className="bg-[#263238] rounded-lg flex-1 px-3">
                        <div className="w-full flex justify-between text-white py-3 text-3xl">
                          <FaChargingStation /> <FaDirections />
                        </div>
                        <p className="text-sm text-gray-300">2.5 miles</p>
                        <p>{station?.name}</p>
                        <div className="flex justify-between text-gray-400 text-[13px]">
                          <div>
                            <p>Charging type</p>
                            <p>{station?.chargerType?.name}</p>
                          </div>
                          <div>
                            <p>price</p>
                            <p>${station?.price}</p>
                          </div>
                          <div>
                            <p>Slot</p>
                            <p>8</p>
                          </div>
                        </div>
                        <button className="flex justify-end w-full font-medium text-right pb-2 underline">
                          view
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* ========================Second Div============================== */}
              <div className="w-[30%] bg-[#263238] text-white px-4 py-4 rounded-lg">
                <p>Vehicle statistics</p>
                <p>
                  <span className="text-gray-300">status: </span>Occupied
                </p>
                <div className="w-[90%] mx-auto">
                  <img
                    className="w-full object-cover"
                    src="/images/car.png"
                    alt=""
                  />
                </div>
                <div className="flex gap-3 w-full justify-center text-sm">
                  <div>
                    <p className="text-gray-400 text-[12px]">Ev Car</p>
                    <p>Tesla</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-[12px]">Ev Car</p>
                    <p>Type2AC</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-[12px]">Ev Car</p>
                    <p>LFP</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-[12px]">Ev Car</p>
                    <p>220KM</p>
                  </div>
                </div>
                <hr className="w-full h-[1px] bg-gray-400 mt-3" />
                {/* ========================== */}
                <div className="w-full bg-[#00000069] rounded-lg p-4 relative overflow-hidden h-[110px] mt-4">
                  <p>Everage energy</p>
                  <p className="text-gray-400">78kw</p>
                  <div className="w-full absolute bottom-[-40px] left-0">
                    <LineChartDots />
                  </div>
                </div>
                <div className="w-full h-[200px] bg-[#00000069] rounded-lg p-4 mt-3 flex gap-2 text-sm">
                  <div className="flex-1 space-y-2">
                    <p className="text-gray-400 ">Battery Status</p>
                    <p>Good</p>
                    <p className="text-gray-400">Car Model</p>
                    <p>Tesla</p>
                    <p className="text-gray-400">Time Left</p>
                    <p>20km</p>
                  </div>
                  <div className="w-[1px] bg-white h-full"></div>
                  <div className="flex-1 shrink-0">
                    <p className="text-gray-400">Charger Location</p>
                    <div className="w-full flex justify-between text-white py-3 text-3xl">
                      <p className="text-sm">15km</p> <FaDirections />
                    </div>
                    <div className="h-[60px]">
                      <iframe
                        className="w-full h-full"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d46830151.11795831!2d-119.8093025!3d44.24236485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54eab584e432360b%3A0x1c3bb99243deb742!2sUnited%20States!5e0!3m2!1sen!2s!4v1722684699275!5m2!1sen!2s"
                      ></iframe>
                    </div>
                  </div>
                </div>
                {/* ========================== */}
                <div className="w-full bg-[#00000069] rounded-lg p-4 mt-3 flex gap-2 text-sm">
                  <div className="flex-1 space-y-2">
                    <p className="text-gray-400 ">Temperature</p>

                    <p>30c</p>
                  </div>
                  <div className="w-[1px] bg-white h-[50px]"></div>
                  <div className="flex-1 text-gray-400">
                    <div className="flex gap-1">
                      <p>English</p>| <p>Metrices</p>
                    </div>
                    <div className="text-right mt-3">
                      <Switch
                        checked={true}
                        // onChange={(checked) =>
                        //   handleSwitchChange(checked)
                        // }
                        uncheckedIcon={false}
                        checkedIcon={false}
                        onColor="#4e73df"
                        onHandleColor="#fff"
                        className="react-switch"
                        boxShadow="none"
                        width={36}
                        height={20}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-4 items-center">
                  <FaChargingStation size={30} /> <p>Charging station</p>
                </div>
              </div>
            </div>

            <Modal
              onClose={() => setModal(false)}
              isOpen={modal}
              size={"3xl"}
              isCentered
            >
              <ModalOverlay />
              <ModalContent>
                {/* <ModalCloseButton /> */}
                <ModalBody>
                  {loader ? (
                    <div className="h-[480px]">
                      <MiniLoader />
                    </div>
                  ) : (
                    <div className="max-h-[480px] overflow-auto">
                      <div className="flex justify-center">
                        <h2 className="text-xl font-semibold font-manrope">
                          Add New Station
                        </h2>
                      </div>

                      <div className="grid grid-cols-2 gap-3 py-4 mr-5">
                        <div className="flex flex-col gap-y-2">
                          <label
                            htmlFor="name"
                            className="text-themeBlack font-medium font-manrope"
                          >
                            Station Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            placeholder="Enter Station Name"
                            className="border border-themeBorderGray rounded-md outline-none px-3 py-2 placeholder:font-manrope"
                            onChange={handleOnChangeEvent}
                          />
                        </div>

                        <div className="flex flex-col gap-y-2">
                          <label
                            htmlFor="capacity"
                            className="text-themeBlack font-medium font-manrope"
                          >
                            Station Capacity(kwh)
                          </label>
                          <input
                            type="number"
                            name="capacity"
                            placeholder="Enter Station Capacity"
                            className="border border-themeBorderGray rounded-md outline-none px-3 py-2 placeholder:font-manrope"
                            onChange={handleOnChangeEvent}
                          />
                        </div>

                        <div className="flex flex-col gap-y-2">
                          <label
                            htmlFor="price"
                            className="text-themeBlack font-medium font-manrope"
                          >
                            Price
                          </label>
                          <input
                            type="number"
                            name="price"
                            placeholder="Enter Price"
                            className="border border-themeBorderGray rounded-md outline-none px-3 py-2 placeholder:font-manrope"
                            onChange={handleOnChangeEvent}
                          />
                        </div>

                        <div className="flex flex-col gap-y-2">
                          <label
                            htmlFor="mount"
                            className="text-themeBlack font-medium font-manrope"
                          >
                            Mount
                          </label>
                          <input
                            type="text"
                            name="mount"
                            placeholder="Enter Mount"
                            className="border border-themeBorderGray rounded-md outline-none px-3 py-2 placeholder:font-manrope"
                            onChange={handleOnChangeEvent}
                          />
                        </div>

                        <div className="flex flex-col gap-y-2">
                          <label
                            htmlFor="ocp"
                            className="text-themeBlack font-medium font-manrope"
                          >
                            OCP
                          </label>
                          <input
                            type="text"
                            name="ocp"
                            placeholder="Enter ocp"
                            className="border border-themeBorderGray rounded-md outline-none px-3 py-2 placeholder:font-manrope"
                            onChange={handleOnChangeEvent}
                          />
                        </div>

                        <div className="flex flex-col gap-y-2">
                          <label
                            htmlFor="combo"
                            className="text-themeBlack font-medium font-manrope"
                          >
                            Combo
                          </label>
                          <Select
                            options={comboOptions}
                            name="combo"
                            onChange={(e) =>
                              setAddStation({
                                ...addStation,
                                combo: e?.label,
                              })
                            }
                          />
                        </div>

                        <div className="flex flex-col gap-y-2">
                          <label
                            htmlFor="vehicleTypeId"
                            className="text-themeBlack font-medium font-manrope"
                          >
                            Vehicle Type
                          </label>
                          <Select
                            options={vehicleTypeOptions}
                            name="vehicleTypeId"
                            onChange={(e) =>
                              setAddStation({
                                ...addStation,
                                vehicleTypeId: e?.value,
                              })
                            }
                          />
                        </div>

                        <div className="flex flex-col gap-y-2">
                          <label
                            htmlFor="chargerTypeId"
                            className="text-themeBlack font-medium font-manrope"
                          >
                            Charging Type
                          </label>
                          <Select
                            options={chargingTypeOptions}
                            name="chargerTypeId"
                            onChange={(e) =>
                              setAddStation({
                                ...addStation,
                                chargerTypeId: e?.value,
                              })
                            }
                          />
                        </div>

                        <div className="flex flex-col gap-y-2">
                          <label
                            htmlFor="batteryTypeId"
                            className="text-themeBlack font-medium font-manrope"
                          >
                            Battery Type
                          </label>
                          <Select
                            options={batteryTypeOptions}
                            name="batteryTypeId"
                            onChange={(e) =>
                              setAddStation({
                                ...addStation,
                                batteryTypeId: e?.value,
                              })
                            }
                          />
                        </div>

                        <div>
                          <LoadScript
                            googleMapsApiKey="AIzaSyCYC3-gTg2XJFIeo9fura6PoNuQzzPeBlc"
                            libraries={["places"]}
                          >
                            <div className="flex flex-col gap-y-2 relative">
                              <label
                                htmlFor="address"
                                className="text-themeBlack font-medium font-manrope"
                              >
                                Address
                              </label>
                              <Autocomplete
                                onLoad={(ref) =>
                                  (autocompleteRef.current = ref)
                                }
                                onPlaceChanged={handleSelect}
                              >
                                <div className="flex items-center">
                                  <input
                                    type="text"
                                    placeholder="Search location"
                                    className="border border-themeBorderGray rounded-md outline-none px-3 py-2 placeholder:font-manrope w-full"
                                  />
                                  <div className="absolute top-[42px] right-2">
                                    <GrLocation size={20} />
                                  </div>
                                </div>
                              </Autocomplete>
                            </div>
                          </LoadScript>
                        </div>

                        <div className="flex flex-col gap-y-2">
                          <label
                            htmlFor="city"
                            className="text-themeBlack font-medium font-manrope"
                          >
                            City
                          </label>
                          <input
                            type="text"
                            name="city"
                            placeholder="Enter Station City"
                            className="border border-themeBorderGray rounded-md outline-none px-3 py-2 placeholder:font-manrope"
                            onChange={handleOnChangeEvent}
                          />
                        </div>

                        <div className="flex flex-col gap-y-2">
                          <label
                            htmlFor="state"
                            className="text-themeBlack font-medium font-manrope"
                          >
                            State
                          </label>
                          <input
                            type="text"
                            name="state"
                            placeholder="Enter Station State"
                            className="border border-themeBorderGray rounded-md outline-none px-3 py-2 placeholder:font-manrope"
                            onChange={handleOnChangeEvent}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-2 col-span-2 mr-5">
                        <button
                          className="flex items-center justify-center gap-2 text-sm border border-theme text-white font-semibold font-manrope rounded-md px-5 py-2 
                        h-10 bg-theme hover:bg-transparent hover:text-theme duration-200"
                          onClick={() => setModal(false)}
                        >
                          Cancel
                        </button>
                        <button
                          className="flex items-center justify-center gap-2 text-sm border border-theme text-white font-semibold font-manrope rounded-md px-5 py-2
                         h-10 bg-theme hover:bg-transparent hover:text-theme duration-200"
                          onClick={addNewStation}
                        >
                          Add Station
                        </button>
                      </div>
                    </div>
                  )}
                </ModalBody>
              </ModalContent>
            </Modal>
          </div>
        </>
      }
    />
  );
};

export default ChargingDetails;
