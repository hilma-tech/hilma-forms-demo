import { FormSwitch, FormTextArea } from "@hilma/forms";

import {
  FormProvider,
  FormSubmitButton,
  FormTextInput,
  useAlert,
  useForm,
  useFormConfig,
} from "@hilma/forms";
import { provide } from "@hilma/tools";
import { Divider } from "@mui/material";
import React from "react";
import * as yup from "yup";

import { FormsDevtools } from "@hilma/forms-devtools";
import { noop } from "../common/helpers";
import { useDirection, useTranslate } from "../common/i18n";
import FormSlider from "../components/custom-forms/FormSlider";

const schema = yup.object({
  textArea: yup.string().required().min(10).max(240),

  settings: yup.object({
    disabled: yup.boolean().required(),
    fast: yup.boolean().required(),
    isLoading: yup.boolean().required(),
    rounded: yup.boolean().required(),
    rows: yup
      .tuple([yup.number().nullable(), yup.number().nullable()])
      .required()
      .default([3, 7]),
    maxLength: yup.number().required().nullable(),
    placeholder: yup.string().required(),
  }),
});

type FormValues = yup.InferType<typeof schema>;

const TextAreaDemo: React.FC = () => {
  const { values } = useForm<FormValues>();

  const showAlert = useAlert();
  const t = useTranslate();
  const dir = useDirection();

  function handleSubmit(values: FormValues) {
    showAlert(
      t((i18n) => i18n.misc.onSubmit),
      "success",
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

  return (
    <>
      <FormTextArea
        name={"textArea"}
        {...values.settings}
        minRows={values.settings.rows[0] ?? undefined}
        maxRows={values.settings.rows[1] ?? undefined}
        maxLength={values.settings.maxLength ?? undefined}
        label={t((i18n) => i18n.labels.textArea)}
      />

      <FormSubmitButton sx={{ mt: 5 }}>
        {t((i18n) => i18n.misc.submit)}
      </FormSubmitButton>

      <Divider sx={{ mb: 10 }} />

      <FormSwitch
        name={"settings.disabled"}
        label={t((i18n) => i18n.misc.settings.disabled)}
      />
      <FormSwitch
        name={"settings.fast"}
        label={t((i18n) => i18n.misc.settings.fast)}
      />
      <FormSwitch
        name={"settings.isLoading"}
        label={t((i18n) => i18n.misc.settings.isLoading)}
      />
      <FormSwitch
        name={"settings.rounded"}
        label={t((i18n) => i18n.misc.settings.rounded)}
      />
      <FormSlider
        name={"settings.rows"}
        label={`${t((i18n) => i18n.misc.settings.minRows)} - ${t(
          (i18n) => i18n.misc.settings.maxRows,
        )}`}
        displayValue={(value) => {
          if (!Array.isArray(value)) return `${value}`;

          return <span dir="ltr">{value.join(" - ")}</span>;
        }}
        stepSize={1}
        maxValue={10}
      />
      <FormSlider
        name={"settings.maxLength"}
        label={t((i18n) => i18n.misc.settings.maxLength)}
      />
      <FormTextInput
        fast
        name={"settings.placeholder"}
        label={t((i18n) => i18n.misc.settings.placeholder)}
      />

      <FormsDevtools buttonPosition="bottom-right" />
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
])(TextAreaDemo);
