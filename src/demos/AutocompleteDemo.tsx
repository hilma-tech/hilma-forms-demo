import { FormAutocomplete, FormSwitch } from "@hilma/forms";

import {
  FormProvider,
  FormSubmitButton,
  useAlert,
  useForm,
  useFormConfig,
} from "@hilma/forms";
import { provide } from "@hilma/tools";
import { Divider, Typography } from "@mui/material";
import React from "react";
import * as yup from "yup";

import { FormsDevtools } from "@hilma/forms-devtools";
import { noop } from "../common/helpers";
import { useDirection, useTranslate } from "../common/i18n";

const schema = yup.object({
  autocomplete: yup
    .object({
      id: yup.number(),
      name: yup.string(),
      email: yup.string(),
      address: yup.object({
        street: yup.string(),
        suite: yup.string(),
        city: yup.string(),
        zipcode: yup.string(),
        geo: yup.object({
          lat: yup.string(),
          lng: yup.string(),
        }),
      }),
      phone: yup.string(),
      website: yup.string(),
      company: yup.object({
        name: yup.string(),
        catchPhrase: yup.string(),
        bs: yup.string(),
      }),
    })
    .nullable(),

  settings: yup.object({
    rounded: yup.boolean().required(),
    freeSolo: yup.boolean().required(),
  }),
});

type FormValues = yup.InferType<typeof schema>;

const AutocompleteDemo: React.FC = () => {
  const { values } = useForm<FormValues>();

  const showAlert = useAlert();
  const t = useTranslate();
  const dir = useDirection();

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

  return (
    <>
      <FormAutocomplete
        name={"autocomplete"}
        options={[
          {
            id: 0,
            name: "",
            username: "",
          },
        ]}
        optionsUrl="https://jsonplaceholder.typicode.com/users"
        getOptionLabel={(value) =>
          typeof value === "string" ? value : value.name
        }
        label={t((i18n) => i18n.labels.autocomplete)}
        {...values.settings}
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
        name={"settings.freeSolo"}
        label={t((i18n) => i18n.misc.settings.freeSolo)}
      />

      <Typography
        component="a"
        href="https://mui.com/material-ui/react-autocomplete/"
        target="_blank"
        rel="noopener noreferrer"
        color="primary.dark"
      >
        {t((i18n) => i18n.misc.autocompleteDemoMessage)}
      </Typography>

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
])(AutocompleteDemo);
