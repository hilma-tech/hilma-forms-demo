import React from "react";
import { FormProvider, FormToggleGroup } from "@hilma/forms";

import { noop } from "../common/helpers";
import {
    Languages,
    useSwitchedPath,
    usePathLanguage,
    useDirection,
    useTranslate,
} from "../common/i18n";
import { useNavigate } from "react-router-dom";

const LanguageToggle: React.FC = () => {
    const language = usePathLanguage();
    const toHe = useSwitchedPath(Languages.He);
    const toEn = useSwitchedPath(Languages.En);

    const navigate = useNavigate();
    const dir = useDirection();
    const t = useTranslate();

    const switchboard = {
        [Languages.He]: toHe,
        [Languages.En]: toEn,
    };

    return (
        <FormProvider
            initialValues={{ language }}
            onSubmit={noop}
            dir={dir}
              sx={{ position: "fixed", top: "8rem", insetInlineEnd: "1rem", width: "fit-content" }}
        >
            <FormToggleGroup
                name="language"
                options={[
                    { content: t((i18n) => i18n.languages[Languages.He]), value: Languages.He },
                    { content: t((i18n) => i18n.languages[Languages.En]), value: Languages.En },
                ]}
                onChange={(_, value: Languages) => {
                    navigate(switchboard[value]);
                }}
            />
        </FormProvider>
    );
};

export default LanguageToggle;
