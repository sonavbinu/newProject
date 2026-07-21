import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const Onboarding = () => {
  const selectedStore = useSelector((state) => state.store.selectedStore);
  const [storeData, setStoreData] = useState({
    ownerName: "",
    ownerEmail: "",
    ownerPhone: "",
    whatsapp: "",

    storeName: "",
    address: "",
    storePhone: "",

    workingDays: [],
    openingTime: "",
    closingTime: "",

    storeImage: null,

    pan: "",
    gst: "",
    bankName: "",
    accountNumber: "",
    ifsc: "",
    qrImage: null,
  });
  console.log("Selected Store:", selectedStore);

  useEffect(() => {
    if (selectedStore) {
      setStoreData({
        ownerName: selectedStore.ownerName || "",
        ownerEmail: selectedStore.email || "",
        ownerPhone: selectedStore.phone || "",
        whatsapp: selectedStore.phone || "",

        storeName: selectedStore.storeName || "",
        address: selectedStore.address || "",
        storePhone: selectedStore.phone || "",

        workingDays: selectedStore.workingDays || [],
        openingTime: selectedStore.openingTime || "",
        closingTime: selectedStore.closingTime || "",
        storeImage: selectedStore.storeImage || null,

        pan: "",
        gst: selectedStore.gstNumber || "",
        bankName: selectedStore.bankName || "",
        accountNumber: selectedStore.accountNumber || "",
        ifsc: selectedStore.ifscCode || "",

        qrImage: selectedStore.qrImage || null,
      });
    }
  }, [selectedStore]);

  return <Outlet context={{ storeData, setStoreData }} />;
};

export default Onboarding;
