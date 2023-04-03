import React from "react";
import { FormProvider, FormToggleGroup } from "@hilma/forms";

import { noop } from "../common/helpers";
import { Languages, useSwitchedPath, usePathLanguage } from "../common/i18n";
import { useNavigate } from "react-router-dom";

const LanguageToggle: React.FC = () => {
    const language = usePathLanguage();
    const toHe = useSwitchedPath(Languages.He);
    const toEn = useSwitchedPath(Languages.En);

    const navigate = useNavigate();

    const switchboard = {
        [Languages.He]: toHe,
        [Languages.En]: toEn,
    };

    return (
        <FormProvider initialValues={{ language }} onSubmit={noop}>
            <FormToggleGroup
                name="language"
                options={[
                    { content: "HE", value: Languages.He },
                    { content: "EN", value: Languages.En },
                ]}
                onChange={(_, value: Languages) => {
                    navigate(switchboard[value]);
                }}
            />
        </FormProvider>
    );
};

export default LanguageToggle;
