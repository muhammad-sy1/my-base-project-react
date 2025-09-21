import React from "react";
import { FaRegCircle } from "react-icons/fa";
import { GoArrowSwitch } from "react-icons/go";
import { FaRegUser } from "react-icons/fa6";
import { LuCalendarDays } from "react-icons/lu";
import { GiMoneyStack } from "react-icons/gi";
import { AiTwotoneSecurityScan } from "react-icons/ai";
import { ImPower } from "react-icons/im";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ServicesCards from "./components/ServicesCards";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import TripsSection from "./components/TripsSection";
import ContactSection from "./components/ContactSection";

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="relative">
        <div className="h-[600px]">
          <img
            src="/imgs/banner.png"
            alt="banner"
            className="w-full h-full object-cover"
          />
          <div className="w-full h-full bg-white/60 dark:bg-black/60 absolute inset-0">
            <div className="container lg:px-20 md:px-10 sm:px-5 px-2 h-full">
              <div className="flex flex-col justify-center items-center gap-y-5 h-full text-center">
                <div className="text-my-green font-bold sm:text-4xl text-2xl">
                  {t("banner.title")}
                </div>
                <div className="text-my-black dark:text-my-white font-medium sm:text-2xl text-lg">
                  {t("banner.subtitle")}
                </div>
              </div>
            </div>
          </div>

          <div className="container xl:px-40 lg:px-20 md:px-10 sm:px-5 px-2 relative -top-10">
            <div className="flex lg:flex-row flex-col justify-between items-center gap-y-5 bg-background rounded-xl shadow-xl dark:shadow-my-black/20 px-5 py-3">
              <div className="flex lg:flex-row flex-col items-center gap-y-3 gap-x-10">
                <div className="flex items-center gap-x-5">
                  {/* From */}
                  <div className="flex items-center gap-x-2">
                    <FaRegCircle className="size-5 sm:flex hidden" />
                    <Select>
                      <SelectTrigger className="hover:bg-gray-100">
                        <SelectValue placeholder={t("banner.from")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="city1">City 1</SelectItem>
                        <SelectItem value="city2">City 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button variant="light">
                    <GoArrowSwitch />
                  </Button>

                  {/* To */}
                  <div className="flex items-center gap-x-2">
                    <FaRegCircle className="size-5 sm:flex hidden" />
                    <Select>
                      <SelectTrigger className="hover:bg-gray-100">
                        <SelectValue placeholder={t("banner.to")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="city1">City 1</SelectItem>
                        <SelectItem value="city2">City 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Date & Passengers */}
                <div className="flex items-center gap-x-5">
                  <div className="lg:flex hidden">|</div>
                  <div className="flex items-center gap-x-2">
                    <LuCalendarDays className="size-5 sm:flex hidden" />
                    <Select>
                      <SelectTrigger className="hover:bg-gray-100">
                        <SelectValue placeholder={t("banner.today")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="today">
                          {t("banner.today")}
                        </SelectItem>
                        <SelectItem value="tomorrow">
                          {t("banner.tomorrow")}
                        </SelectItem>
                        <SelectItem value="afterTomorrow">
                          {t("banner.afterTomorrow")}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>|</div>

                  <div className="flex items-center gap-x-2">
                    <FaRegUser className="size-5 sm:flex hidden" />
                    <Select>
                      <SelectTrigger className="hover:bg-gray-100">
                        <SelectValue
                          placeholder={t("banner.passengers", { count: 2 })}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {[...Array(10)].map((_, i) => (
                          <SelectItem key={i} value={`${i + 1}`}>
                            {t("banner.passengers", { count: i + 1 })}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Search button */}
              <Button >{t("banner.search")}</Button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="container lg:px-20 md:px-10 sm:px-5 px-2 lg:pt-20 pt-40 pb-10">
          <div className="flex flex-col gap-y-10">
            <div className="sec-title">{t("services.title")}</div>
            <div className="grid grid-cols-6 gap-10 gap-y-10">
              <ServicesCards
                serviceInfo={{
                  serviceIcon: <GiMoneyStack />,
                  serviceTitle: t("services.cheapTrips"),
                  serviceBody: t("services.cheapTripsBody"),
                }}
              />
              <ServicesCards
                serviceInfo={{
                  serviceIcon: <AiTwotoneSecurityScan />,
                  serviceTitle: t("services.trustPeople"),
                  serviceBody: t("services.trustPeopleBody"),
                }}
              />
              <ServicesCards
                serviceInfo={{
                  serviceIcon: <ImPower />,
                  serviceTitle: t("services.bookFast"),
                  serviceBody: t("services.bookFastBody"),
                }}
              />
            </div>
          </div>
        </div>
        <TripsSection />
        <ContactSection />
      </div>
    </>
  );
};

export default HomePage;
