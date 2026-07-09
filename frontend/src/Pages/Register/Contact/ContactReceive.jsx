import React from "react";
import handShake from "./../../../../src/assets/handshake.jpeg";
import { Phone, MessageCircle } from "lucide-react";

const ContactReceive = () => {
  return (
    <div className=" max-w-md w-full mx-auto px-4 py-6  flex flex-col gap-6 ">
      <div className=" w-full aspect-[3/1] overflow-hidden rounded-lg">
        <img
          src={handShake}
          alt=""
          className=" w-full h-full
        
        "
        />
        <div className=" items-center ">
          <h1 className="text-2xl font-bold">Contact Form</h1>
          <p className=" text-sm text-gray-500 mt-2 ">
            Fill the contact form, One of our <br /> executives will reach out
            to you shortly
          </p>
        </div>
      </div>
      <div className=" p-6 border border-gray-300 rounded-lg p-6 text-center ">
        <h1 className="text-xl font-bold">
          We have Received Your <br /> Contact Form
        </h1>
        <p className="mt-3 text-gray-600 text-sm">
          We will get back to you Shortly, If you have any quires <br /> contact
          us below
        </p>
      </div>
      <div className="  border border-gray-300 rounded-lg  p-6 shadow-sm">
        <h1 className="text-xl font-bold text-center">Contact Us</h1>
        <p className="text-sm text-gray-600 mt-2 mb-5 text-center">
          For any enquiries contact us
        </p>
        <div className="space-y-3 ">
          <button
            className="w-full flex items-center justify-center gap-2
        border border-[var(--primary-color)]
        text-[var(--primary-color)]
        py-3 rounded-md
        hover:bg-[var(--primary-light)]
        transition     cursor-pointer     
          "
          >
            <Phone size={20} />
            <h3 className="text-[var(--primary-color)] ">Contact Via Call</h3>
          </button>
          <button
            className="w-full flex items-center justify-center gap-2
        border border-[var(--primary-color)]
        text-[var(--primary-color)]
        py-3 rounded-md
        hover:bg-[var(--primary-light)]
        transition     cursor-pointer    "
          >
            <MessageCircle size={20} />
            <h3 className="text-[var(--primary-color)] text-center">
              Contact Via WhatsApp
            </h3>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactReceive;
