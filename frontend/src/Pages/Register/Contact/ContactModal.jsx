import React from "react";
import { Handshake } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ContactModal = () => {
  const navigate = useNavigate();
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur flex items-center justify-center ">
      <div className="relative bg-white flex flex-col justify-center items-center gap-4 p-6 rounded-xl w-full max-w-2xl">
        <Handshake
          size={32}
          className="text-[var(--primary-color)] bg-[var(--primary-light)] rounded-full "
        />
        <h1 className="text-xl font-bold text-center">
          Thanks For Submitting the Contact <br /> Form
        </h1>
        <p className="text-sm text-[var(--primary-color)]">
          We will get back to you shortly
        </p>
        <button
          onClick={() => navigate("/contact-receive")}
          className="bg-[var(--primary-color)] text-white p-2 w-[50%] rounded hover:cursor-pointer hover:bg-[var(--primary-hover)]"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default ContactModal;
