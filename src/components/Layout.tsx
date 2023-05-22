import React from "react";
import { Outlet } from "react-router-dom";
import Switchboard from "./Switchboard";

const Layout: React.FC = () => {
  return (
    <>
      <Switchboard>
        <Outlet />
      </Switchboard>
    </>
  );
};

export default Layout;
