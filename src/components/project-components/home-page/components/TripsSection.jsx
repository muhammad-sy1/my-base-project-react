import { useTranslation } from "react-i18next";
import LatestTrips from "./LatestTrips";
// import { useQuery } from "@tanstack/react-query";
// import { useState } from "react";
// import getLatestTripsAndSocialLinks from "@/services/latestTrips-socialLinks";
import dayjs from "@/utils/dayjsConfig";
import { useEffect } from "react";
import useHomeStore from "@/services/latestTrips-socialLinks";

const TripsSection = () => {
  const { i18n, t } = useTranslation();
  const lang = i18n.language;
  // const [tripsInfo, setTripsInfo] = useState([]);

  const { data, loading, error, fetchHomeData } = useHomeStore();

  useEffect(() => {
    if (!data) {
      fetchHomeData();
    }
  }, [data, fetchHomeData]);

  // console.log(data);

  if (loading) return <p className="flex justify-center"></p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <>
      <div className="sec-title py-10">{t("trips.latest")}</div>
      <div className="bg-gradient-to-r from-my-black to-my-green py-10">
        <div className="container lg:px-20 md:px-10 sm:px-5 px-2">
          <div className="flex flex-col gap-y-10">
            <div className="grid grid-cols-6 gap-5 ">
              {data &&
                data.data.trips.map((item) => (
                  <div className="contents" key={item.id}>
                    <LatestTrips
                      cardInfo={{
                        title: `${item.from_location_text} to ${item.to_location_text}`,
                        date: `${dayjs(item.travel_datetime)
                          .locale(lang)
                          .toNow()}`,
                        quantity: `${item.seats} ${t("trips.quantity")}`,
                        price: `${t("trips.price")} ${item.price} $`,
                      }}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TripsSection;
