import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useTranslation } from "react-i18next";

const About = () => {
  const [open, setOpen] = useState(false);
  const [terms, setTerms] = useState(false);
  const [privacy, setPrivacy] = useState(false);

  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold text-lg sm:text-xl">{t("about.title")}</h2>
        <p className="text-gray-400 text-sm sm:text-base">
          {t("about.description")}
        </p>
      </div>
      <div>
        <button
          onClick={() => setOpen(!open)}
          className="flex w-full items-center justify-between bg-[var(--primary-color)] px-3 py-4 rounded-t-xl hover:bg-[var(--primary-hover)] cursor-pointer focus:outline-none"
        >
          <h1 className="text-white">{t("about.aboutUs")}</h1>
          {open ? (
            <ChevronUp className="text-[var(--primary-light)]" />
          ) : (
            <ChevronDown className="text-[var(--primary-light)]" />
          )}
        </button>
        {open && (
          <div>
            <p className="shadow p-4 rounded-b-lg text-gray-600">
              {t("about.aboutContent")}
            </p>
          </div>
        )}
      </div>

      <div>
        <button
          onClick={() => setTerms(!terms)}
          className="flex items-center justify-between bg-[var(--primary-color)]  px-3 py-4 w-full text-white rounded-t-xl"
        >
          <h1>{t("about.terms")}</h1>
          {terms ? <ChevronUp /> : <ChevronDown />}
        </button>
        {terms && (
          <div>
            <p className="shadow p-4 rounded-b-xl">{t("about.termsContent")}</p>
          </div>
        )}
      </div>

      <div>
        <button
          className="flex items-center justify-between bg-[var(--primary-color)] px-3 py-4 w-full text-white rounded-t-xl"
          onClick={() => setPrivacy(!privacy)}
        >
          <h1>{t("about.privacy")}</h1>{" "}
          {privacy ? <ChevronUp /> : <ChevronDown />}
        </button>

        {privacy && (
          <div>
            <p className="shadow p-4 rounded-b-xl">
              {t("about.privacyContent")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default About;
