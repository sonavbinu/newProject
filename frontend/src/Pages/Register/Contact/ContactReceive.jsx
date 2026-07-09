import React from "react";
import handShake from "./../../../../src/assets/handshake.jpeg";
import { Phone, MessageCircle } from "lucide-react";

const ContactReceive = () => {
  return (
    <div className="flex flex-col gap-6 items-center justify-center ">
      <div className="flex flex-col gap-6">
        <img src={handShake} alt="" />
        <div className="flex flex-col items-center ">
          <h1 className="text-2xl font-bold">Contact Form</h1>
          <p className="text-center text-sm text-gray-400 ">
            Fill the contact form, One of our <br /> executives will reach out
            to you shortly
          </p>
        </div>
      </div>
      <div className="text-center border border-gray-300 rounded p-6 flex flex-col item-center justify-center ">
        <h1 className="text-xl font-bold">
          We have Received Your <br /> Contact Form
        </h1>
        <p>
          We will get back to you Shortly, If you have any quires <br /> contact
          us below
        </p>
      </div>
      <div className="flex flex-col gap-3 text-center border border-gray-300 rounded p-6 w-[57%]">
        <h1 className="text-xl">Contact Us</h1>
        <p className="text-sm text-gray-400">For any enquiries contact us</p>
        <div
          className="flex flex-col
        gap-3  "
        >
          <button className="flex gap-2  cursor-pointer border border-gray-300 hover:bg-[var(--primary-light)] p-3 rounded">
            <Phone className="text-[var(--primary-color)]" />
            <h3 className="text-[var(--primary-color)] ">Contact Via Call</h3>
          </button>
          <button className="flex gap-2 cursor-pointer   border border-gray-300 hover:bg-[var(--primary-light)] p-3 rounded">
            <MessageCircle className="text-[var(--primary-color)]" />
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
