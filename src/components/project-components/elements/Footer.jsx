import React from "react";
import { useEffect, useState } from "react";

import { CiLight } from "react-icons/ci";
import { BsMoonStars } from "react-icons/bs";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import LanguageSelect from "./components/LanguageSelect";
import { useTranslation } from "react-i18next";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
// import getLatestTripsAndSocialLinks from "../services/latestTrips-socialLinks";
// import useHomeStore from "../services/latestTrips-socialLinks";

const Footer = () => {
  const { t } = useTranslation();
  const [theme, setTheme] = useState(localStorage.theme || "system");
  // const [socialInfo, setSocialInfo] = useState({});

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else if (theme === "light") {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    } else {
      // system
      localStorage.removeItem("theme");
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [theme]);

  const buttons = [
    { id: "light", icon: <CiLight /> },
    { id: "dark", icon: <BsMoonStars /> },
    { id: "system", icon: <HiOutlineDesktopComputer /> },
  ];

  // const icons = {
  //   facebook: <FaFacebook />,
  //   instagram: <FaInstagram />,
  //   youtube: <FaYoutube />,
  //   linkedin: <FaLinkedin />,
  // };

  // const data = useHomeStore((state) => state.data);
  // console.log(data);
  // if (!data) return <p>No data yet...</p>;

  return (
    <footer>
      <div className="dark:bg-neutral-900 bg-neutral-800 text-my-white py-10 border-t">
        <div className="container lg:px-20 md:px-10 sm:px-5 px-2">
          <div className="grid grid-cols-6 gap-8 w-full">
            {/* Logo + Title + Desc */}
            <div className="lg:col-span-2 md:col-span-3 col-span-6">
              <div className="flex flex-col md:items-start items-center gap-y-2 md:text-start text-center">
                <img src="/imgs/logo.png" alt="logo" className="w-14" />
                <div className="font-semibold text-xl">{t("footer.title")}</div>
                <div className="md:w-4/5">{t("footer.description")}</div>
              </div>
            </div>

            {/* Help */}
            <div className="lg:col-span-2 md:col-span-3 col-span-6">
              <div className="flex flex-col md:items-start items-center gap-y-3">
                <div className="font-semibold text-lg">
                  {t("footer.help.title")}
                </div>
                <ul className="flex flex-col md:items-start items-center gap-y-2">
                  <li>
                    <a href="#">{t("footer.help.faq")}</a>
                  </li>
                  <li>
                    <a href="#">{t("footer.help.center")}</a>
                  </li>
                  <li>
                    <a href="#">{t("footer.help.privacy")}</a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Reservations + Theme + Lang */}
            <div className="lg:col-span-2 md:col-span-3 col-span-6">
              <div className="flex flex-col md:items-start items-center gap-y-3">
                <div className="font-semibold text-lg">
                  {t("footer.reservations.title")}
                </div>
                <ul className="flex flex-col md:items-start items-center gap-y-2">
                  <li>
                    <a href="#">{t("footer.reservations.publish")}</a>
                  </li>
                  <li>
                    <a href="#">{t("footer.reservations.find")}</a>
                  </li>
                </ul>

                {/* Theme Buttons */}
                <div className="flex gap-x-2 px-3 py-1 rounded-lg bg-neutral-700">
                  {buttons.map((btn) => (
                    <button
                      key={btn.id}
                      onClick={() => setTheme(btn.id)}
                      className={`p-2 rounded-full hover:bg-my-green/70 transition-colors ${
                        theme === btn.id ? "bg-my-green/70" : " "
                      }`}
                    >
                      {btn.icon}
                    </button>
                  ))}
                </div>

                {/* Language Select */}
                <LanguageSelect />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-y-5 justify-center items-center">
                {/* <div className="flex items-center gap-x-5">
                  {Object.entries(data.data.info.social).map(
                    ([key, url], index) => (
                      <div className="contents" key={index}>
                        <a
                          className="text-3xl"
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {icons[key]}
                        </a>
                      </div>
                    )
                  )}
                </div> */}
                <div className="flex text-center">{t("footer.rights")}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
