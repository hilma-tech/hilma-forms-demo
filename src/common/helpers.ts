export function noop() {}

export const COLORS = ["red", "green", "orange", "blue", "purple", "yellow"] as const;
export const COLORS_TO_HEX = {
    red: "#ff0000",
    green: "#008000",
    orange: "#ffa500",
    blue: "#0000ff",
    purple: "#800080",
    yellow: "#ffff00",
} as const;
