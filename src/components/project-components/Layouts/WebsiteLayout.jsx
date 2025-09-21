import React from "react";
import { Outlet } from "react-router";

const WebsiteLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default WebsiteLayout;
