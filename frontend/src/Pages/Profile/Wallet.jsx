import React, { useEffect, useState } from "react";
import Gpay from "../../assets/download.png";
import paytm from "../../assets/paytm.png";
import phonepe from "../../assets/phonepe.png";
import { CheckCircle2, Key } from "lucide-react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const Wallet = () => {
  const { t } = useTranslation();
  const [openApp, setOpenApp] = useState(false);
  const [upi, setUpi] = useState(() => {
    const saved = localStorage.getItem("walletUpi");
    return saved
      ? JSON.parse(saved)
      : {
          gpay: "",
          phonepe: "",
          paytm: "",
        };
  });
  const [bankDetails, setBankDetails] = useState(() => {
    const saved = localStorage.getItem("bankDetails");
    return saved
      ? JSON.parse(saved)
      : {
          accountHolder: "",
          accountNumber: "",
          ifsc: "",
        };
  });

  const [upiInput, setUpiInput] = useState({
    gpay: "",
    phonepe: "",
    paytm: "",
  });
  const upiApps = [
    { key: "gpay", name: "Google Pay", image: Gpay },
    { key: "phonepe", name: "PhonePe", image: phonepe },
    { key: "paytm", name: "Paytm", image: paytm },
  ];

  const handleLink = (app) => {
    const upiId = upiInput[app].trim();

    if (!upiId) {
      toast.error(t("wallet.enterUpiError"));
      return;
    }

    const upiRegex = /^[\w.-]+@[\w.-]+$/;
    if (!upiRegex.test(upiId)) {
      toast.error(t("wallet.invalidUpi"));
      return;
    }

    setUpi((prev) => ({
      ...prev,
      [app]: upiId,
    }));

    setUpiInput((prev) => ({
      ...prev,
      [app]: "",
    }));

    if (app === "gpay") setOpen(false);
    if (app === "phonepe") setPhonepeOpen(false);
    if (app === "paytm") setPaytmOpen(false);

    toast.success(
      t("wallet.upiLinked", {
        app: app.name,
      }),
    );
  };
  const handleSave = () => {
    localStorage.setItem("bankDetails", JSON.stringify(bankDetails));
    localStorage.setItem("walletUpi", JSON.stringify(upi));

    toast.success(t("wallet.saved"));
  };

  useEffect(() => {
    localStorage.setItem("walletUpi", JSON.stringify(upi));
  }, [upi]);

  useEffect(() => {
    localStorage.setItem("bankDetails", JSON.stringify(bankDetails));
  }, [bankDetails]);
  return (
    <div className="flex flex-col gap-3 justify-center ">
      <div>
        <h2 className="font-semibold text-lg sm:text-xl">
          {t("wallet.title")}
        </h2>
        <p className="text-gray-400 text-sm sm:text-base">
          {t("wallet.description")}
        </p>
      </div>
      <div className="flex flex-col gap-2 shadow px-4 py-2 rounded-xl">
        <label className="text-sm sm:text-base font-bold ">Bank Details</label>
        <input
          placeholder={t("wallet.accountHolder")}
          value={bankDetails.accountHolder}
          onChange={(e) =>
            setBankDetails({
              ...bankDetails,
              accountHolder: e.target.value,
            })
          }
          type="text"
          className="border px-3 py-2.5  rounded  border-gray-300 focus:ring-2 focus:ring-[var(--primary-color)] focus:outline-none"
        />
        <input
          type="text"
          placeholder={t("wallet.accountNumber")}
          value={bankDetails.accountNumber}
          onChange={(e) =>
            setBankDetails({
              ...bankDetails,
              accountNumber: e.target.value,
            })
          }
          className="border px-3 py-2.5 rounded border-gray-300 focus:ring-2 focus:ring-[var(--primary-color)] focus:outline-none"
        />
        <input
          placeholder={t("wallet.ifsc")}
          value={bankDetails.ifsc}
          onChange={(e) => {
            setBankDetails({
              ...bankDetails,
              ifsc: e.target.value.toUpperCase(),
            });
          }}
          type="text"
          className="border px-3 py-2.5 rounded border-gray-300 focus:ring-2 focus:ring-[var(--primary-color)] focus:outline-none"
        />
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
        <h2 className="font-semibold text-lg">{t("wallet.linkUpi")}</h2>

        {upiApps.map((app) => (
          <div key={app.key}>
            <div className="flex items-center justify-between rounded-xl border border-gray-200 p-4 hover:shadow-md transition">
              <div className="flex items-center gap-4">
                <img
                  src={app.image}
                  className="w-12 h-12 rounded-lg object-contain"
                  alt=""
                />
                <div>
                  <h3 className="font-semibold">{app.name}</h3>
                  <p className="text-sm text-gray-500">
                    {t("wallet.linkYourUpi", { app: app.name })}
                  </p>
                </div>
              </div>

              {upi[app.key] ? (
                <div className="text-right">
                  <p className="text-sm font-medium">{upi[app.key]}</p>
                  <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-green-700 text-sm mt-1">
                    <CheckCircle2 size={16} />
                    {t("wallet.linked")}
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setOpenApp(app.key)}
                  className="rounded-lg bg-[var(--primary-color)] cursor-pointer px-5 py-2 text-white hover:bg-[var(--primary-hover)]"
                >
                  {t("wallet.linkUpiButton")}
                </button>
              )}
            </div>
            {openApp === app.key && (
              <div className="mt-3 rounded-xl border border-gray-100  p-5 flex flex-col items-start gap-3">
                <label className="mb-2 block text-sm font-medium">
                  {t("wallet.enterUpi")}
                </label>

                <input
                  type="text"
                  value={upiInput[app.key]}
                  onChange={(e) => {
                    setUpiInput({
                      ...upiInput,
                      [app.key]: e.target.value,
                    });
                  }}
                  placeholder={t("wallet.upiPlaceholder")}
                  className="w-full rounded-lg border px-4 py-3 focus:ring-2 focus:ring-[var(--primary-color)] focus:outline-none border-gray-300"
                />

                <div className="flex justify-end gap-3">
                  <button
                    className="rounded-lg border border-gray-300 cursor-pointer px-5 py-2 hover:bg-gray-100"
                    onClick={() => setOpenApp(null)}
                  >
                    {t("common.cancel")}
                  </button>
                  <button
                    className="rounded-lg bg-[var(--primary-color)] px-5 py-2 text-white hover:bg-[var(--primary-hover)] cursor-pointer "
                    onClick={() => handleLink(app.key)}
                  >
                    {t("common.link")}
                  </button>
                </div>
              </div>
            )}{" "}
          </div>
        ))}
        <div>
          <button
            className="rounded-xl hover: bg-[var(--primary-color)] px-8 py-3 font-medium text-white hover:bg-[var(--primary-hover)] transition"
            onClick={handleSave}
          >
            {t("common.saveChanges")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
