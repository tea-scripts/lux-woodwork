import { ActionIcon } from "@mantine/core";
import { IconStar } from "@tabler/icons";
import React, { useState } from "react";

const StarRating = ({ rating, setRating }) => {
  const [hover, setHover] = useState(0);

  console.log(rating);

  return (
    <div style={{ display: "flex" }}>
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <ActionIcon
            size={32}
            key={index}
            onClick={() => setRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
            color="yellow"
            variant={index <= (hover || rating) ? "filled" : "subtle"}
            mx={5}
          >
            <IconStar size={32} />
          </ActionIcon>
        );
      })}
    </div>
  );
};

export default StarRating;
