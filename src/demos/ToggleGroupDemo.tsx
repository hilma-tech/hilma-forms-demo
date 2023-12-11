import { FormSwitch, FormToggleGroup } from "@hilma/forms";

import {
  FormProvider,
  FormSubmitButton,
  useAlert,
  useForm,
  useFormConfig,
} from "@hilma/forms";
import { provide } from "@hilma/tools";
import { Divider, useTheme } from "@mui/material";
import React from "react";
import * as yup from "yup";

import { FormsDevtools } from "@hilma/forms-devtools";
import { COLORS, COLORS_TO_HEX, noop } from "../common/helpers";
import { useDirection, useTranslate } from "../common/i18n";

const schema = yup.object({
  toggleGroup: yup.string().required().oneOf(COLORS),

  settings: yup.object({
    rounded: yup.boolean().required().default(true),
    enableDeselect: yup.boolean().required(),
  }),
});

type FormValues = yup.InferType<typeof schema>;

const ToggleGroupDemo: React.FC = () => {
  const { values } = useForm<FormValues>();

  const showAlert = useAlert();
  const t = useTranslate();
  const dir = useDirection();
  const theme = useTheme();

  function handleSubmit(values: FormValues) {
    showAlert(
      t((i18n) => i18n.misc.onSubmit),
      "success",
      dir,
    );

    console.log(values);
  }

  useFormConfig<FormValues>(
    (form) => {
      form.onSubmit = handleSubmit;
      form.dir = dir;
      form.translateFn = t;
    },
    [dir, t],
  );

  const options = COLORS.map((value) => ({
    value: value,
    content: t((i18n) => i18n.misc.colors[value]),
    chosenSx: {
      backgroundColor: value,
    },
    chosenTextColor: theme.palette.getContrastText(COLORS_TO_HEX[value]),
  }));

  return (
    <>
      <FormToggleGroup
        name={"toggleGroup"}
        {...values.settings}
        options={options}
        label={t((i18n) => i18n.labels.toggleGroup)}
      />

      <FormSubmitButton sx={{ mt: 5 }}>
        {t((i18n) => i18n.misc.submit)}
      </FormSubmitButton>

      <Divider sx={{ mb: 10 }} />

      <FormSwitch
        name={"settings.rounded"}
        label={t((i18n) => i18n.misc.settings.rounded)}
      />

      <FormSwitch
        name={"settings.enableDeselect"}
        label={t((i18n) => i18n.misc.settings.enableDeselect)}
      />

      <FormsDevtools noEditor buttonPosition="bottom-right" />
    </>
  );
};

export default provide([
  FormProvider<FormValues>,
  {
    initialValues: schema.initialize(),
    onSubmit: noop,
    validationSchema: schema,
  },
])(ToggleGroupDemo);
