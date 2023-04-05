import * as yup from "yup";

function isValidTime(value: unknown): value is Date {
    if (!value) return true;

    if (value instanceof Date) {
        return true;
    } else {
        return false;
    }
}

export const mixedDate = (message: string) =>
    yup
        .mixed({ check: isValidTime })
        .required()
        .test({
            test: (value) => {
                return !isNaN(value.getTime());
            },
            message,
            name: "validDate",
        });
