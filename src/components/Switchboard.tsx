import React, { useEffect, useState } from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

import { useDirection, useTranslate } from "../common/i18n";
import { RTL } from "@hilma/forms";

const Switchboard: React.FC = () => {
    const [value, setValue] = useState("");
    const t = useTranslate();
    const navigate = useNavigate();
    const dir = useDirection();

    const { pathname } = useLocation();

    useEffect(() => {
        setValue(pathname.split("/").slice(2).join("/"));
    }, [pathname]);

    return (
        <RTL active={dir !== "ltr"}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(_, newValue) => {
                    navigate(newValue);
                }}
                sx={{
                    position: "fixed",
                    bottom: "1rem",
                    left: 0,
                    right: 0,
                    flexWrap: "wrap",
                    rowGap: "1rem",
                    height: "fit-content",
                }}
            >
                <BottomNavigationAction
                    label={t((i18n) => i18n.labels.autocomplete)}
                    value="autocomplete"
                />
                <BottomNavigationAction
                    label={t((i18n) => i18n.labels.checkbox)}
                    value="checkbox"
                />
                <BottomNavigationAction label={t((i18n) => i18n.labels.file)} value="file" />
                <BottomNavigationAction label={t((i18n) => i18n.labels.image)} value="image" />
                <BottomNavigationAction
                    label={t((i18n) => i18n.labels.recording)}
                    value="recording"
                />
                <BottomNavigationAction label={t((i18n) => i18n.labels.select)} value="select" />
                <BottomNavigationAction label={t((i18n) => i18n.labels.switch)} value="switch" />
                <BottomNavigationAction
                    label={t((i18n) => i18n.labels.textArea)}
                    value="text-area"
                />
                <BottomNavigationAction
                    label={t((i18n) => i18n.labels.textInput)}
                    value="text-input"
                />
                <BottomNavigationAction label={t((i18n) => i18n.labels.time)} value="time/input" />
                <BottomNavigationAction
                    label={t((i18n) => i18n.labels.timeRange)}
                    value="time/range"
                />
                <BottomNavigationAction label={t((i18n) => i18n.labels.date)} value="date/input" />
                <BottomNavigationAction
                    label={t((i18n) => i18n.labels.dateRange)}
                    value="date/range"
                />
                <BottomNavigationAction
                    label={t((i18n) => i18n.labels.toggleGroup)}
                    value="toggle-group"
                />
            </BottomNavigation>
        </RTL>
    );
};

export default Switchboard;
