import React, { useState } from "react";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import Menu from "@mui/icons-material/Menu";
import { TranslatedI18n } from "@hilma/i18n";
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
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import { I18n, useDirection, useTranslate } from "../common/i18n";
import { AppBar, Drawer, DrawerHeader } from "./Drawer";
import LanguageToggle from "./LanguageToggle";

interface NavListItemProps {
  path: string;
  getLabel: (i18n: TranslatedI18n<I18n>) => string;
  icon: React.ReactNode;
  open: boolean;
  isActive: boolean;
}

const NavListItem: React.FC<NavListItemProps> = (props) => {
  const { open, path, getLabel, icon, isActive } = props;

  const navigate = useNavigate();
  const t = useTranslate();

  return (
    <ListItem disablePadding sx={{ display: "block" }}>
      <ListItemButton
        onClick={() => navigate(path)}
        sx={(theme) => ({
          minHeight: 48,
          justifyContent: open ? "initial" : "center",
          px: 2.5,
          ...(isActive && {
            backgroundColor: theme.palette.grey[300],
          }),
        })}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            marginInlineEnd: open ? 3 : undefined,
            justifyContent: "center",
          }}
        >
          {icon}
        </ListItemIcon>
        <ListItemText
          primary={t((i18n) => getLabel(i18n))}
          sx={{ opacity: open ? 1 : 0 }}
        />
      </ListItemButton>
    </ListItem>
  );
};

const routes: Pick<NavListItemProps, "path" | "icon" | "getLabel">[] = [
  {
    path: "autocomplete",
    getLabel: (i18n) => i18n.labels.autocomplete,
    icon: <AutocompleteDemoIcon />,
  },
  {
    path: "checkbox",
    getLabel: (i18n) => i18n.labels.checkbox,
    icon: <CheckboxDemoIcon />,
  },
  {
    path: "file",
    getLabel: (i18n) => i18n.labels.file,
    icon: <FileDemoIcon />,
  },
  {
    path: "image",
    getLabel: (i18n) => i18n.labels.image,
    icon: <ImageDemoIcon />,
  },
  {
    path: "recording",
    getLabel: (i18n) => i18n.labels.recording,
    icon: <RecordingDemoIcon />,
  },
  {
    path: "radio-group",
    getLabel: (i18n) => i18n.labels.radioGroup,
    icon: <RadioGroupDemoIcon />,
  },
  {
    path: "select",
    getLabel: (i18n) => i18n.labels.select,
    icon: <SelectDemoIcon />,
  },
  {
    path: "switch",
    getLabel: (i18n) => i18n.labels.switch,
    icon: <SwitchDemoIcon />,
  },
  {
    path: "text-area",
    getLabel: (i18n) => i18n.labels.textArea,
    icon: <TextAreaDemoIcon />,
  },
  {
    path: "text-input",
    getLabel: (i18n) => i18n.labels.textInput,
    icon: <TextInputDemoIcon />,
  },
  {
    path: "time/input",
    getLabel: (i18n) => i18n.labels.time,
    icon: <TimeInputDemoIcon />,
  },
  {
    path: "time/range",
    getLabel: (i18n) => i18n.labels.timeRange,
    icon: <TimeRangeDemoIcon />,
  },
  {
    path: "date/input",
    getLabel: (i18n) => i18n.labels.date,
    icon: <DateInputDemoIcon />,
  },
  {
    path: "date/range",
    getLabel: (i18n) => i18n.labels.dateRange,
    icon: <DateRangeDemoIcon />,
  },
  {
    path: "toggle-group",
    getLabel: (i18n) => i18n.labels.toggleGroup,
    icon: <ToggleGroupDemoIcon />,
  },
];

const Switchboard: React.FC<{ children?: React.ReactNode }> = (props) => {
  const { children } = props;

  const [open, setOpen] = useState(false);

  const t = useTranslate();
  const { pathname } = useLocation();
  const dir = useDirection();

  const active = routes.find(({ path }) => pathname.includes(path));

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" open={open} sx={{ height: "4rem" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen(true)}
            edge="start"
            sx={{
              ...(open && { display: "none" }),
            }}
          >
            <Menu />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              marginInlineStart: 2,
              flexGrow: 1,
              textAlign: dir === "rtl" ? "right" : "left",
            }}
          >
            {!!active && t(active.getLabel)}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader sx={{ justifyContent: "flex-end" }}>
          <LanguageToggle />
          {open && (
            <IconButton onClick={() => setOpen(false)}>
              <ChevronLeftIcon />
            </IconButton>
          )}
        </DrawerHeader>
        <List>
          {routes.map((props) => (
            <NavListItem
              {...props}
              key={props.path}
              open={open}
              isActive={pathname.includes(props.path)}
            />
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, pt: "5rem" }}>
        {children}
      </Box>
    </Box>
  );
};

export default Switchboard;
