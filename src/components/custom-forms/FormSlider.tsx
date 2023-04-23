import React from "react";
import { ErrorMsg, useFormDirection } from "@hilma/forms";
import { useKeyableField } from "@hilma/forms/dist/common/hooks/useKeyableField.hook";
import Slider from "@mui/material/Slider";
import { Typography } from "@mui/material";
import { Stack } from "@mui/system";

interface FormSliderProps {
    name: string | { _key: string };
    label?: string;
    stepSize?: number;
    maxValue?: number;
    displayValue?: (value: number | number[]) => React.ReactNode;
}

const FormSlider: React.FC<FormSliderProps> = (props) => {
    const { name, label, stepSize = 10, maxValue = 100, displayValue } = props;

    const dir = useFormDirection();

    const [field, meta, helpers] = useKeyableField(name);

    return (
        <Stack width="60%">
            <Typography>{label}</Typography>
            <Stack direction="row" gap={4} alignItems="center">
                <Slider
                    {...field}
                    onChange={(_, value) => {
                        helpers.setValue(value || null);
                        // we want the slider to be `touched` and display errors
                        // as soon as it is moved
                        helpers.setTouched(true);
                    }}
                    sx={
                        dir !== "ltr"
                            ? {
                                  "& .MuiSlider-thumb": {
                                      transform: "translate(50%, -50%)", // needed because of RTL
                                  },
                              }
                            : undefined
                    }
                    marks={Array(maxValue / stepSize + 1)
                        .fill(null)
                        .map((_, i) => ({ value: i * stepSize }))}
                    step={null}
                    max={maxValue}
                />
                <Typography color="primary.main" sx={{ width: "4rem" }}>
                    {displayValue ? displayValue(field.value) : field.value}
                </Typography>
            </Stack>
            <ErrorMsg error={meta.error} activeWhen={meta.touched} />
        </Stack>
    );
};

export default FormSlider;
