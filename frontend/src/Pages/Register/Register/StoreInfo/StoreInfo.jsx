import React, { useState } from "react";
import Stepper from "./Stepper";
import OwnerForm from "./OwnerForm";
import StoreForm from "./StoreForm";
import WorkingDays from "./WorkingDays";
import WorkingTime from "./WorkingTime";
import StoreImage from "./StoreImage";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Store } from "lucide-react";
import { useTranslation } from "react-i18next";

const StoreInfo = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const { storeData, setStoreData } = useOutletContext();

  const [phoneVerified, setPhoneVerified] = useState(false);

  const validateStoreInfo = () => {
    if (!storeData.storeName.trim()) {
      alert(t("storeInfo.storeNameRequired"));
      return false;
    }

    if (!storeData.address.trim()) {
      alert(t("storeInfo.addressRequired"));
      return false;
    }

    if (!storeData.storePhone.trim()) {
      alert(t("storeInfo.phoneRequired"));
      return false;
    }

    if (storeData.storePhone.length !== 10) {
      alert(t("storeInfo.phoneLength"));
      return false;
    }

    if (!storeData.workingDays || storeData.workingDays.length === 0) {
      alert(t("storeInfo.daysRequired"));
      return false;
    }

    if (!storeData.openingTime) {
      alert(t("storeInfo.openingRequired"));
      return false;
    }

    if (!storeData.closingTime) {
      alert(t("storeInfo.closingRequired"));
      return false;
    }

    if (!storeData.storeImage) {
      alert(t("storeInfo.imageRequired"));
      return false;
    }

    if (!phoneVerified) {
      alert(t("storeInfo.phoneVerify"));
      return false;
    }

    return true;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        <div className="text-center mb-12">
          <div className="w-16 h-16 mx-auto rounded-full bg-[var(--primary-light)] flex items-center justify-center mb-5">
            <Store size={30} className="text-[var(--primary-color)]" />
          </div>

          <span className="inline-block px-4 py-1 rounded-full bg-[var(--primary-light)] text-[var(--primary-color)] text-sm font-medium mb-4">
            {t("storeInfo.step")}
          </span>

          <h1 className="text-4xl font-bold text-gray-900">
            {t("storeInfo.title")}
          </h1>

          <p className="mt-3 text-gray-500 max-w-2xl mx-auto">
            {t("storeInfo.subtitle")}{" "}
            <span className="font-semibold">ORIGIN</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          <aside>
            <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 sticky top-24">
              <Stepper />
            </div>
          </aside>

          <main className="space-y-8">
            <OwnerForm storeData={storeData} setStoreData={setStoreData} />

            <StoreForm
              storeData={storeData}
              setStoreData={setStoreData}
              phoneVerified={phoneVerified}
              setPhoneVerified={setPhoneVerified}
            />

            <WorkingDays storeData={storeData} setStoreData={setStoreData} />

            <WorkingTime storeData={storeData} setStoreData={setStoreData} />

            <StoreImage storeData={storeData} setStoreData={setStoreData} />

            <div className="flex pt-4 justify-end">
              <button
                onClick={() => {
                  if (validateStoreInfo()) {
                    navigate("/documents");
                  }
                }}
                className="px-10 py-3 rounded-xl bg-[var(--primary-color)]
                font-semibold shadow-md transition hover:bg-[var(--primary-hover)]
                hover:shadow-lg text-white"
              >
                {t("storeInfo.continue")}
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default StoreInfo;
