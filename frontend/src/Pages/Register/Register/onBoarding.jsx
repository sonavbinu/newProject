import React, { useState } from "react";
import { Outlet } from "react-router-dom";

const Onboarding = () => {
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

  return <Outlet context={{ storeData, setStoreData }} />;
};

export default Onboarding;
