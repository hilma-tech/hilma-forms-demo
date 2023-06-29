import React from "react";
import { Stack } from "@mui/material";

import StarFull from "@mui/icons-material/Star";
import StarHalf from "@mui/icons-material/StarHalf";
import StarEmpty from "@mui/icons-material/StarOutline";

import { useDirection } from "../common/i18n";

const StarRating: React.FC<{ rating: number }> = (props) => {
  const { rating } = props;

  const dir = useDirection();

  const color = rating >= 4 ? "success" : "warning";

  return (
    <Stack direction="row" gap="2rem" alignItems="center">
      <Stack direction="row" alignItems="center">
        {Array(5)
          .fill(null)
          .map((_, i) => {
            const leftover = rating - i;
            if (leftover >= 1) return <StarFull key={i} color={color} />;
            if (leftover > 0)
              return (
                <StarHalf
                  sx={{ scale: dir === "rtl" ? "-1 1" : undefined }}
                  key={i}
                  color={color}
                />
              );
            return <StarEmpty key={i} color={color} />;
          })}
      </Stack>
      ({rating.toFixed(2)})
    </Stack>
  );
};

export default StarRating;
