import React from "react";
import handShake from "./../../../../src/assets/handshake.jpeg";
import { useNavigate } from "react-router-dom";
import GetStarted from "../Register/GetStarted";

const Contact = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 w-full flex flex-col ">
      <div className="py-6 text-center">
        {" "}
        <h1 className="text-4xl font-bold text-[var(--primary-color)]">
          ORIGIN{" "}
        </h1>
        <img src={handShake} alt="" className="w-full" />
        <div className="flex flex-col items-center justify-center gap-4  mt-6 px-6 lg:px-20 py-10 rounded">
          <h1 className="text-2xl font-bold">Contact Form</h1>
          <p className="text-gray-400 text-sm">
            Fill the contact form, One of our <br />
            executives will reach out to you shortly
          </p>
          <form className="flex flex-col gap-4 max-w-md mx-auto w-full">
            <input
              type="text"
              placeholder="Owner Name"
              className="p-3 border  border-gray-300 rounded focus:ring-2 focus:ring-[var(--primary-color)]  focus:outline-none"
            />
            <input
              type="text"
              placeholder="Shop Name"
              className="p-3 border border-gray-300 rounded focus:ring-2 focus:ring-[var(--primary-color)]  focus:outline-none"
            />
            <input
              type="text"
              placeholder="Location"
              className="p-3 border border-gray-300 rounded focus:ring-2 focus:ring-[var(--primary-color)]  focus:outline-none"
            />{" "}
            <input
              type="text"
              placeholder="Phone Number"
              className="p-3 border border-gray-300 rounded focus:ring-2 focus:ring-[var(--primary-color)]  focus:outline-none"
            />
            <button
              onClick={() => navigate("/contact-success")}
              className="bg-[var(--primary-color)] text-white p-3 rounded hover:bg-[var(--primary-hover)] cursor-pointer"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <div className="flex justify-center mb-5">
        <GetStarted />
      </div>
    </div>
  );
};

export default Contact;
