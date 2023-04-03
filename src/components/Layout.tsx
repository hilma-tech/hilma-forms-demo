import React from "react";
import { Outlet } from "react-router-dom";
import LanguageToggle from "./LanguageToggle";

const Layout: React.FC = () => {
    return (
        <>
            <Outlet />
            <LanguageToggle />
        </>
    );
};

export default Layout;
