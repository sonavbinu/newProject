import React, { useState } from "react";
import Gpay from "../../assets/download.png";
import paytm from "../../assets/paytm.png";
import phonepe from "../../assets/phonepe.png";
import { CheckCircle2 } from "lucide-react";

const Wallet = () => {
  const [open, setOpen] = useState(false);
  const [phonepeOpen, setPhonepeOpen] = useState(false);
  const [paytmOpen, setPaytmOpen] = useState(false);
  const [upi, setUpi] = useState({
    gpay: "",
    phonepe: "",
    paytm: "",
  });

  const [upiInput, setUpiInput] = useState({
    gpay: "",
    phonepe: "",
    paytm: "",
  });

  const handleLink = (app) => {
    if (!upiInput[app].trim()) return;

    setUpi({
      ...upi,
      [app]: upiInput[app],
    });

    if (app === "gpay") setOpen(false);
    if (app === "phonepe") setPhonepeOpen(false);
    if (app === "paytm") setPaytmOpen(false);
  };

  return (
    <div className="flex flex-col gap-3">
      <div>
        <h2 className="font-semibold text-lg sm:text-xl">My Wallet</h2>
        <p className="text-gray-400 text-sm sm:text-base">
          Here you can view your wallet details
        </p>
      </div>
      <div className="flex flex-col gap-2 shadow px-4 py-2 rounded-xl">
        <label className="text-md sm:text-lg ">Bank Details</label>
        <input
          type="text"
          className="border px-3 py-2.5  rounded  border-gray-300 focus:ring-2 focus:ring-[var(--primary-color)] focus:outline-none"
        />
        <input
          type="text"
          className="border px-3 py-2.5 rounded border-gray-300 focus:ring-2 focus:ring-[var(--primary-color)] focus:outline-none"
        />
        <input
          type="text"
          className="border px-3 py-2.5 rounded border-gray-300 focus:ring-2 focus:ring-[var(--primary-color)] focus:outline-none"
        />
      </div>

      <div className="shadow px-4 py-3 rounded-xl flex flex-col gap-4">
        <h2 className="text-md sm:text-lg ">Link UPI</h2>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between shadow p-6 items-center rounded-xl ">
            <img className="w-16" src={Gpay} alt="" />
            {upi.gpay ? (
              <div className="text-right">
                <p className="text-sm font-medium">{upi.gpay}</p>
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle2 size={18} />
                  <span className="font-medium">UPI Linked</span>
                </div>
              </div>
            ) : (
              <button
                className="bg-[var(--primary-color)] text-white px-4 py-3 rounded-lg"
                onClick={() => setOpen(true)}
              >
                Link UPI
              </button>
            )}
          </div>

          {open && (
            <div>
              <form className=" flex flex-col shadow-lg rounded-2xl p-6  border border-gray-100 items-center gap-4">
                <div className="flex items-center  flex-col">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Add UPI
                  </label>
                  <input
                    type="text"
                    value={upiInput.gpay}
                    onChange={(e) =>
                      setUpiInput({
                        ...upiInput,
                        gpay: e.target.value,
                      })
                    }
                    className="border w-full rounded-xl border-gray-300 px-4 py-3 focus:ring-2 focus:outline-none focus:ring-[var(--primary-color)]"
                  />
                </div>

                <div className="flex gap-3 justify-end">
                  <button
                    className=" px-5 py-2.5 rounded-xl border border-gray-300 hover:bg-gray-100 transition cursor-pointer"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLink("gpay")}
                    className="bg-[var(--primary-color)] text-white px-5 py-2.5 hover:bg-[var(--primary-hover)] transition rounded-lg cursor-pointer"
                  >
                    Link
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="flex flex-col gap-4">
            <div className="flex justify-between shadow p-6 items-center rounded-xl">
              <img src={phonepe} alt="" className="w-16" />
              {upi.phonepe ? (
                <div className="text-right">
                  <p className="text-sm font-medium">{upi.phonepe}</p>
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle2 size={18} />
                    <span className="font-medium">UPI Linked</span>
                  </div>
                </div>
              ) : (
                <button
                  className="bg-[var(--primary-color)] text-[var(--primary-light)] hover:bg-[var(--primary-hover)] cursor-pointer rounded-lg px-4 py-3"
                  onClick={() => setPhonepeOpen(true)}
                >
                  Link UPI
                </button>
              )}
            </div>

            {phonepeOpen && (
              <div>
                <form className="  flex flex-col shadow-lg rounded-2xl p-6  border border-gray-100 items-center gap-4">
                  <div className="flex items-center  flex-col">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Add UPI
                    </label>
                    <input
                      type="text"
                      value={upiInput.phonepe}
                      onChange={(e) =>
                        setUpiInput({
                          ...upiInput,
                          phonepe: e.target.value,
                        })
                      }
                      className="border w-full rounded-xl border-gray-300 px-4 py-3 focus:ring-2 focus:outline-none focus:ring-[var(--primary-color)]"
                    />
                  </div>
                  <div className="flex gap-3 justify-end">
                    <button
                      className=" px-5 py-2.5 rounded-xl border border-gray-300 hover:bg-gray-100 transition cursor-pointer"
                      onClick={() => setPhonepeOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => handleLink("phonepe")}
                      className="bg-[var(--primary-color)] text-white px-5 py-2.5 hover:bg-[var(--primary-hover)] transition rounded-lg cursor-pointer"
                    >
                      Link
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center shadow p-6 rounded-xl">
                <img src={paytm} alt="" className="w-16" />

                {upi.paytm ? (
                  <div className="text-right">
                    <p className="text-sm font-medium">{upi.paytm}</p>
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle2 size={18} />
                      <span className="font-medium">UPI Linked</span>
                    </div>
                  </div>
                ) : (
                  <button
                    className="bg-[var(--primary-color)] text-white px-4 py-3 rounded-lg"
                    onClick={() => setPaytmOpen(true)}
                  >
                    Link UPI
                  </button>
                )}
              </div>

              {paytmOpen && (
                <div>
                  <form className=" flex flex-col shadow-lg rounded-2xl p-6  border border-gray-100 items-center gap-4">
                    <div className="flex items-center  flex-col">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Add UPI
                      </label>
                      <input
                        type="text"
                        value={upiInput.paytm}
                        onChange={(e) =>
                          setUpiInput({
                            ...upiInput,
                            paytm: e.target.value,
                          })
                        }
                        className="border w-full rounded-xl border-gray-300 px-4 py-3 focus:ring-2 focus:outline-none focus:ring-[var(--primary-color)]"
                      />
                    </div>
                    <div className="flex gap-3 justify-end">
                      <button
                        className="px-5 py-2.5 rounded-xl border border-gray-300 hover:bg-gray-100 transition cursor-pointer"
                        onClick={() => setPaytmOpen(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        onClick={() => handleLink("paytm")}
                        className="bg-[var(--primary-color)] text-white px-5 py-2.5 hover:bg-[var(--primary-hover)] transition rounded-lg cursor-pointer"
                      >
                        Link
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
