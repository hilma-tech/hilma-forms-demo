import { FormTimeInput, FormDateInput } from "@hilma/forms";

import React from "react";
import { Divider } from "@mui/material";
import * as yup from "yup";
import {
  useFormConfig,
  useForm,
  useAlert,
  FormProvider,
  FormSubmitButton,
  FormSwitch,
  FormTextInput,
} from "@hilma/forms";
import { provide } from "@hilma/tools";

import { noop } from "../common/helpers";
import { useDirection, useTranslate } from "../common/i18n";
import { mixedDate } from "../common/schema";
import { FormsDevtools } from "@hilma/forms-devtools";

const schema = yup.object({
  date: mixedDate("errors.invalidDate|fields.date"),
  time: mixedDate("errors.invalidTime|fields.time"),

  placeholders: yup.object({
    time: yup.string().defined().default("hh:mm"),
    date: yup.string().defined().default("dd/mm/yyyy"),
  }),

  settings: yup.object({
    rounded: yup.boolean().required(),
  }),
});

const names = schema.names();

type FormValues = yup.InferType<typeof schema>;

const TimeAndDateInputsDemo: React.FC = () => {
  const { values } = useForm<FormValues>();

  const showAlert = useAlert();
  const t = useTranslate();
  const dir = useDirection();

  function handleSubmit(values: FormValues) {
    showAlert(
      t((i18n) => i18n.misc.onSubmit),
      "success",
      dir
    );

    console.log(values);
  }

  useFormConfig<FormValues>(
    (form) => {
      form.onSubmit = handleSubmit;
      form.dir = dir;
      form.translateFn = t;
    },
    [dir, t]
  );

  return (
    <>
      <FormTimeInput
        name={names.time}
        {...values.settings}
        placeholder={values.placeholders.time}
        label={t((i18n) => i18n.labels.time)}
      />
      <FormDateInput
        name={names.date}
        {...values.settings}
        placeholder={values.placeholders.date}
        label={t((i18n) => i18n.labels.date)}
      />

      <FormSubmitButton sx={{ mt: 5 }}>
        {t((i18n) => i18n.misc.submit)}
      </FormSubmitButton>

      <Divider sx={{ mb: 10 }} />

      <FormSwitch
        name={names.settings.rounded}
        label={t((i18n) => i18n.misc.settings.rounded)}
      />

      <FormTextInput
        fast
        name={names.placeholders.time}
        label={`${t((i18n) => i18n.misc.settings.placeholder)} - ${t(
          (i18n) => i18n.labels.time
        )}`}
      />
      <FormTextInput
        fast
        name={names.placeholders.date}
        label={`${t((i18n) => i18n.misc.settings.placeholder)} - ${t(
          (i18n) => i18n.labels.date
        )}`}
      />

      <FormsDevtools noEditor buttonPosition="top-left" />
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
])(TimeAndDateInputsDemo);
