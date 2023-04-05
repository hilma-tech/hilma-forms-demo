import React from "react";
import { Outlet } from "react-router-dom";
import Switchboard from "./Switchboard";
import LanguageToggle from "./LanguageToggle";

const Layout: React.FC = () => {
    return (
        <>
            <LanguageToggle />
            <Outlet />
            <Switchboard />
        </>
    );
};

export default Layout;
