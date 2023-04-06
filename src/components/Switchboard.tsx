import React, { useEffect, useState } from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

import AutocompleteDemoIcon from "@mui/icons-material/Search";
import CheckboxDemoIcon from "@mui/icons-material/Checklist";
import FileDemoIcon from "@mui/icons-material/AttachFile";
import ImageDemoIcon from "@mui/icons-material/Image";
import RadioGroupDemoIcon from "@mui/icons-material/Radio";
import RecordingDemoIcon from "@mui/icons-material/Mic";
import SelectDemoIcon from "@mui/icons-material/List";
import SwitchDemoIcon from "@mui/icons-material/ToggleOn";
import TextAreaDemoIcon from "@mui/icons-material/EditNote";
import TextInputDemoIcon from "@mui/icons-material/Create";
import TimeInputDemoIcon from "@mui/icons-material/AccessTime";
import TimeRangeDemoIcon from "@mui/icons-material/Timelapse";
import DateInputDemoIcon from "@mui/icons-material/Today";
import DateRangeDemoIcon from "@mui/icons-material/DateRange";
import ToggleGroupDemoIcon from "@mui/icons-material/Tune";

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
                    "& .MuiBottomNavigationAction-root": {
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "space-between",
                    },
                }}
            >
                <BottomNavigationAction
                    label={t((i18n) => i18n.labels.autocomplete)}
                    icon={<AutocompleteDemoIcon />}
                    value="autocomplete"
                />
                <BottomNavigationAction
                    label={t((i18n) => i18n.labels.checkbox)}
                    icon={<CheckboxDemoIcon />}
                    value="checkbox"
                />
                <BottomNavigationAction
                    label={t((i18n) => i18n.labels.file)}
                    icon={<FileDemoIcon />}
                    value="file"
                />
                <BottomNavigationAction
                    label={t((i18n) => i18n.labels.image)}
                    icon={<ImageDemoIcon />}
                    value="image"
                />
                <BottomNavigationAction
                    label={t((i18n) => i18n.labels.recording)}
                    icon={<RecordingDemoIcon />}
                    value="recording"
                />
                <BottomNavigationAction
                    label={t((i18n) => i18n.labels.radioGroup)}
                    icon={<RadioGroupDemoIcon />}
                    value="radio-group"
                />
                <BottomNavigationAction
                    label={t((i18n) => i18n.labels.select)}
                    icon={<SelectDemoIcon />}
                    value="select"
                />
                <BottomNavigationAction
                    label={t((i18n) => i18n.labels.switch)}
                    icon={<SwitchDemoIcon />}
                    value="switch"
                />
                <BottomNavigationAction
                    label={t((i18n) => i18n.labels.textArea)}
                    icon={<TextAreaDemoIcon />}
                    value="text-area"
                />
                <BottomNavigationAction
                    label={t((i18n) => i18n.labels.textInput)}
                    icon={<TextInputDemoIcon />}
                    value="text-input"
                />
                <BottomNavigationAction
                    label={t((i18n) => i18n.labels.time)}
                    icon={<TimeInputDemoIcon />}
                    value="time/input"
                />
                <BottomNavigationAction
                    label={t((i18n) => i18n.labels.timeRange)}
                    icon={<TimeRangeDemoIcon />}
                    value="time/range"
                />
                <BottomNavigationAction
                    label={t((i18n) => i18n.labels.date)}
                    icon={<DateInputDemoIcon />}
                    value="date/input"
                />
                <BottomNavigationAction
                    label={t((i18n) => i18n.labels.dateRange)}
                    icon={<DateRangeDemoIcon />}
                    value="date/range"
                />
                <BottomNavigationAction
                    label={t((i18n) => i18n.labels.toggleGroup)}
                    icon={<ToggleGroupDemoIcon />}
                    value="toggle-group"
                />
            </BottomNavigation>
        </RTL>
    );
};

export default Switchboard;
