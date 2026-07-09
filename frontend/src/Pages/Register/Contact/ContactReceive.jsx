import React from "react";
import handShake from "./../../../../src/assets/handshake.jpeg";
import { Phone, MessageCircle } from "lucide-react";

const ContactReceive = () => {
  return (
    <div className="  w-full min-h-screen bg-gray-50  ">
      <div className=" flex flex-col gap-6">
        <div className="w-full  rounded-lg overflow-hidden">
          <img
            src={handShake}
            alt=""
            className=" w-full h-full object-cover
        
        "
          />
        </div>
        <div className=" items-center text-center flex flex-col  gap-2 mb-4">
          <div className="max-w-md w-full   p-6 text-center ">
            <h1 className="text-2xl font-bold">Contact Form</h1>
            <p className=" text-sm text-gray-500 mt-2 ">
              Fill the contact form, One of our <br /> executives will reach out
              to you shortly
            </p>
          </div>
          <div className="max-w-md w-full border border-gray-300 rounded-lg p-6 shadow-sm mb-3">
            <h1 className="text-xl font-bold">
              We have Received Your <br /> Contact Form
            </h1>
            <p className="mt-3 text-gray-600 text-sm">
              We will get back to you Shortly, If you have any quires <br />{" "}
              contact us below
            </p>
          </div>
          <div className="max-w-md w-full  border border-gray-300 rounded-lg  p-6 shadow-sm mb-3">
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
                <h3 className="text-[var(--primary-color)] ">
                  Contact Via Call
                </h3>
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
        </div>{" "}
      </div>
    </div>
  );
};

export default ContactReceive;
