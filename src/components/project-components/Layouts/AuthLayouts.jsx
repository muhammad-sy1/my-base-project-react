import React from "react";
// import LogIn from "./log-routes/LogIn";
import { Outlet } from "react-router";
import { Toaster } from "@/components/ui/sonner";

const AuthLayouts = () => {
  return (
    <>
      <div className="relative">
        <div className="lg:fixed lg:flex justify-center items-center lg:h-screen h-96 lg:inset-y-0 start-0 end-1/2 bg-my-black">
          <div className="lg:w-1/2 h-full flex justify-center items-center">
            <img className="w-96" src="/imgs/logo.png" alt="logo" />
          </div>
        </div>
        <div className="flex">
          <div className="w-1/2 lg:flex hidden"></div>
          <div className="lg:w-1/2 w-full">
            <div className="flex justify-center items-center  p-10">
              <div className="p-5 lg:w-full sm:w-3/4 w-full h-full flex items-center">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthLayouts;
