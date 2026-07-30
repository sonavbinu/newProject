import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Gpay from "../../assets/download.png";
import paytm from "../../assets/paytm.png";
import phonepe from "../../assets/phonepe.png";
import { CheckCircle2 } from "lucide-react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import API from "../../api/api";

const Wallet = () => {
  const { t } = useTranslation();
  const selectedStore = useSelector((state) => state.store.selectedStore);
  const storeId = selectedStore?._id || localStorage.getItem("selectedStoreId");

  const [openApp, setOpenApp] = useState(false);
  const [loading, setLoading] = useState(true);
  const [upi, setUpi] = useState({
    gpay: "",
    phonepe: "",
    paytm: "",
  });
  const [bankDetails, setBankDetails] = useState({
    accountHolder: "",
    accountNumber: "",
    ifsc: "",
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

  useEffect(() => {
    if (!storeId) {
      setLoading(false);
      return;
    }
    const fetchStore = async () => {
      try {
        const res = await API.get(`/stores/${storeId}`);
        const store = res.data.store;
        setUpi(store.upiDetails || { gpay: "", phonepe: "", paytm: "" });
        setBankDetails({
          accountHolder: store.accountHolderName || "",
          accountNumber: store.accountNumber || "",
          ifsc: store.ifscCode || "",
        });
      } catch (err) {
        console.error("Failed to load store data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStore();
  }, [storeId]);

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

    setOpenApp(null);

    const appName = upiApps.find((a) => a.key === app)?.name;
    toast.success(t("wallet.upiLinked", { app: appName }));
  };

  const handleSave = async () => {
    if (!storeId) {
      toast.error("No store selected");
      return;
    }
    try {
      await API.put("/stores/wallet", {
        storeId,
        upiDetails: upi,
        accountHolderName: bankDetails.accountHolder,
        accountNumber: bankDetails.accountNumber,
        ifscCode: bankDetails.ifsc,
      });
      toast.success(t("wallet.saved"));
    } catch (err) {
      toast.error("Failed to save wallet details");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-3">
        <div className="h-20 rounded-2xl bg-gray-100 animate-pulse"></div>
        <div className="h-64 rounded-2xl bg-gray-100 animate-pulse"></div>
        <div className="h-64 rounded-2xl bg-gray-100 animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 justify-center ">
      <div className="mb-6 border-b border-gray-100 pb-5">
        <h2 className="font-bold text-2xl sm:text-3xl  text-gray-900">
          {t("wallet.title")}
        </h2>
        <p className=" mt-2 max-w-2xl text-gray-500 leading-6 text-sm sm:text-base">
          {t("wallet.description")}
        </p>
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-5">
          <h3 className="text-lg font-semibold text-gray-900">Bank Details</h3>
          <p className="mt-1 text-sm text-gray-500">
            Enter the bank account where your payouts will be received.
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              {t("wallet.accountHolder")}
            </label>

            <input
              type="text"
              placeholder={t("wallet.accountHolder")}
              value={bankDetails.accountHolder}
              onChange={(e) =>
                setBankDetails({
                  ...bankDetails,
                  accountHolder: e.target.value,
                })
              }
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition-all
        focus:border-[var(--primary-color)]
        focus:ring-2 focus:ring-[var(--primary-color)]/20"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              {t("wallet.accountNumber")}
            </label>

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
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition-all
        focus:border-[var(--primary-color)]
        focus:ring-2 focus:ring-[var(--primary-color)]/20"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              {t("wallet.ifsc")}
            </label>

            <input
              type="text"
              placeholder={t("wallet.ifsc")}
              value={bankDetails.ifsc}
              onChange={(e) =>
                setBankDetails({
                  ...bankDetails,
                  ifsc: e.target.value.toUpperCase(),
                })
              }
              className="w-full rounded-xl border border-gray-300 px-4 py-3 uppercase outline-none transition-all
        focus:border-[var(--primary-color)]
        focus:ring-2 focus:ring-[var(--primary-color)]/20"
            />
          </div>
        </div>
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            {t("wallet.linkUpi")}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Link your preferred UPI apps to receive payments instantly.
          </p>
        </div>

        <div className="space-y-5">
          {upiApps.map((app) => (
            <div key={app.key}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 rounded-2xl border border-gray-200 p-5 hover:border-[var(--primary-color)] hover:shadow-md transition-all duration-200">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100">
                    <img
                      src={app.image}
                      className="w-10 h-10 object-contain"
                      alt={app.name}
                    />
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900">{app.name}</h3>

                    <p className="text-sm text-gray-500 mt-1">
                      {t("wallet.linkYourUpi", { app: app.name })}
                    </p>
                  </div>
                </div>

                {upi[app.key] ? (
                  <div className="text-left sm:text-right">
                    <p className="font-medium text-gray-800 break-all">
                      {upi[app.key]}
                    </p>

                    <div className="inline-flex items-center gap-2 mt-2 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                      <CheckCircle2 size={16} />
                      {t("wallet.linked")}
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setOpenApp(app.key)}
                    className="rounded-xl bg-[var(--primary-color)] px-5 py-2.5 text-white font-medium hover:bg-[var(--primary-hover)] transition cursor-pointer"
                  >
                    {t("wallet.linkUpiButton")}
                  </button>
                )}
              </div>

              {openApp === app.key && (
                <div className="mt-4 rounded-2xl border border-[var(--primary-color)]/20 bg-[#FAFAF7] p-5">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("wallet.enterUpi")}
                  </label>

                  <input
                    type="text"
                    value={upiInput[app.key]}
                    onChange={(e) =>
                      setUpiInput({
                        ...upiInput,
                        [app.key]: e.target.value,
                      })
                    }
                    placeholder={t("wallet.upiPlaceholder")}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                  />

                  <div className="mt-5 flex justify-end gap-3">
                    <button
                      onClick={() => setOpenApp(null)}
                      className="rounded-xl border border-gray-300 px-5 py-2.5 font-medium text-gray-700 hover:bg-gray-100 transition cursor-pointer"
                    >
                      {t("common.cancel")}
                    </button>

                    <button
                      onClick={() => handleLink(app.key)}
                      className="rounded-xl bg-[var(--primary-color)] px-6 py-2.5 font-medium text-white hover:bg-[var(--primary-hover)] transition cursor-pointer"
                    >
                      {t("common.link")}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSave}
            className="rounded-xl bg-[var(--primary-color)] px-8 py-3 font-medium text-white hover:bg-[var(--primary-hover)] transition cursor-pointer"
          >
            {t("common.saveChanges")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
