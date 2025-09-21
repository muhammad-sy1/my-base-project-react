import React from "react";

const ServicesCards = ({ serviceInfo }) => {
  const { serviceIcon, serviceTitle, serviceBody } = serviceInfo;
  return (
    <div className="lg:col-span-2 md:col-span-3 col-span-6 flex flex-col items-center gap-y-3 p-5 shadow-lg border border-my-green rounded-lg">
      <div className="text-4xl ">{serviceIcon}</div>
      <div className="font-semibold text-xl text-center">{serviceTitle}</div>
      <div className="text-lg text-center">{serviceBody}</div>
    </div>
  );
};

export default ServicesCards;
