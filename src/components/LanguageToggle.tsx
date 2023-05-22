import React from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, Typography } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";

import { useSwitchedPath, useTranslate } from "../common/i18n";

const LanguageToggle: React.FC = () => {
  const navigate = useNavigate();
  const to = useSwitchedPath();

  const t = useTranslate();

  return (
    <>
      <Typography sx={{ lineHeight: 1, mt: 0.5 }}>
        {t((i18n) => i18n.languages.changeLanguage)}
      </Typography>
      <IconButton onClick={() => navigate(to)}>
        <LanguageIcon />
      </IconButton>
    </>
  );
};

export default LanguageToggle;
