import React from "react";
import { useFormik, Formik } from "formik";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";

// Form Data Type Definition
type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  heading: string;
  complain: string;
  country: string;
};

// Validation Schema using Yup
const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),
  heading: Yup.string().required("Heading is required"),
  complain: Yup.string().required("Complain field is required"),
  country: Yup.string().required("Country is required"),
});

const Feedback: React.FC = () => {
  const formik = useFormik<FormData>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      heading: "",
      complain: "",
      country: "",
    },
    validationSchema,
    onSubmit:  async(values) => {
      // Add API submission logic here
      try {
        const response = await axios.post('http://localhost:8000/complain/',values);
        console.log("Response", response)
        if(response.status === 200) {
          console.log(response.data.message);
          // console.log(response.data.payload);
          toast(response.data.message);
        }

        if(response.status === 400) {
          console.log("failed...", response.data.message);
          toast(response.data.message)
        }

        if(response.status === 500){
          console.log("Internal Server Error...details...", response.data.message);
          toast(response.data.message)
        }
      } catch (error) {
        console.log("Unexpected Error...", error);
        toast("Unexpected Error")
      }finally{
        formik.resetForm()

      }
    },
  });

  return (
    <div className="sm:p-[15px] bg-green-50  lg:bg-[#F8F8FA] h-auto overflow-auto lg:h-screen w-screen flex flex-col justify-center items-center py-2">
      <ToastContainer />
      <div
        style={{ boxShadow: "0px 10px 20px 5px #BABAE2" }}
        className=" gap-1 lg:gap-0 lg:bg-[#9896EA] bg-white rounded-3xl flex flex-col justify-center items-center h-[97%] lg:h-[85%] sm:w-[70%] lg:w-[75%] h-auto xl:w-[60%] w-[95%]"
      >
        <div className="w-[95%] rounded-t-3xl lg:w-full lg:h-[15%] mt-4  lg:m-0 bg-white flex flex-col-reverse items-center justify-between h-[20%]">
          <div className="drop-shadow-md text-green-600 antialiased font-stretch-semi-expanded --my-font font-medium ml-[10px] lg:text-3xl text-xl">
            <h1>Complaints Form</h1>
          </div>

          <div className="lg:h-11 h-7">
            <img
              className="h-full w-auto"
              src="https://workspace.optiven.co.ke/static/media/optiven-logo-full.f498da6255572ff1ab8a.png"
              alt="Optiven Image"
            />
          </div>
        </div>

        <form
          onSubmit={formik.handleSubmit}
          className="  lg:gap-0 flex flex-col lg:flex-row items-center justify-around lg:justify-center min-h-[1050px] w-[100%] lg:min-h-[85%]"
        >
          {/* Left Column */}
          <div className="lg:rounded-bl-3xl w-[95%] bg-white flex flex-col justify-items-around lg:justify-center items-center py-7 lg:p-0 lg:h-full basis-1/2">
            <div className="flex flex-col justify-between lg:h-[90%] xl:h-[85%] lg:w-[70%] lg-[100%] w-[95%] h-[95%]">
              <div className="col-span-full">
                <label
                  htmlFor="heading"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Heading
                </label>
                <div className="mt-2 lg:mt-1">
                  <textarea
                    id="heading"
                    name="heading"
                    rows={3}
                    className="h-[60px] block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    value={formik.values.heading}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.heading && formik.errors.heading ? (
                    <p className="text-red-500 text-sm">
                      {formik.errors.heading}
                    </p>
                  ) : null}
                </div>
                <p className="mt-3 text-sm/6 text-gray-600">
                  Describe your issue in a few words.
                </p>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="complain"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Body
                </label>
                <div className="mt-2 lg:mt-1">
                  <textarea
                    id="complain"
                    name="complain"
                    rows={3}
                    className="h-[110px] lg:h-[90%] block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    value={formik.values.complain}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.complain && formik.errors.complain ? (
                    <p className="text-red-500 text-sm">
                      {formik.errors.complain}
                    </p>
                  ) : null}
                </div>
                <p className="mt-3 text-sm/6 text-gray-600">Go into details.</p>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="country"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Country
                </label>
                <div className="mt-2 lg:mt-0 grid grid-cols-1">
                  <select
                    id="country"
                    name="country"
                    className="font-md indent-[15px] h-[35px] col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    value={formik.values.country}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="">Select a country</option>
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="Mexico">Mexico</option>
                  </select>
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="h-[30px] pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                  />
                  {formik.touched.country && formik.errors.country ? (
                    <p className="text-red-500 text-sm">
                      {formik.errors.country}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:rounded-br-3xl w-[95%] lg:justify-center bg-white flex flex-col justify-items-around items-center basis-1/2 py-4 lg:p-0 lg:h-full">
            <div className="flex flex-col justify-between lg:h-[85%] lg:w-[70%] lg-[100%] w-[95%] h-[95%]">
              <div className="mb-5 lg:mb-0">
                <label
                  htmlFor="firstName"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  First name
                </label>
                <div className="mt-2">
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="e.g Mike"
                    className="indent-[15px] h-[35px] block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.firstName && formik.errors.firstName ? (
                    <p className="text-red-500 text-sm">
                      {formik.errors.firstName}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="mb-5 lg:mb-0">
                <label
                  htmlFor="lastName"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="e.g Mutuku"
                    className="indent-[15px] h-[35px] block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.lastName && formik.errors.lastName ? (
                    <p className="text-red-500 text-sm">
                      {formik.errors.lastName}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="mb-5 lg:mb-0">
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="example@gmail.com"
                    className="indent-[15px] h-[35px] block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <p className="text-red-500 text-sm">
                      {formik.errors.email}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="mb-5 lg:mb-0">
                <label
                  htmlFor="phone"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Phone
                </label>
                <div className="mt-2">
                  <input
                    id="phone"
                    name="phone"
                    type="text"
                    placeholder="0700000000"
                    className="indent-[15px] h-[35px] block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.phone && formik.errors.phone ? (
                    <p className="text-red-500 text-sm">
                      {formik.errors.phone}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="mt-4 lg:mt-2 shadow-blue-400 hover:shadow-blue-600 shadow-lg cursor-pointer shadow-md flex justify-center rounded-lg bg-gradient-to-r from-blue-400 hover:from-blue-600 to-green-400 hover:to-green-600 w-[100%] h-[40px]">
                <button
                  type="submit"
                  className="cursor-pointer w-full h-full text-white font-semibold"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Feedback;

