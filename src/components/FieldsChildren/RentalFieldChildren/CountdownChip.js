import React, { useEffect, useState } from "react";
import Chip from '@material-ui/core/Chip';

function CountdownChip(props) {
  const calculateTimeLeft = () => {
    const difference = props.end - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        d: Math.floor(difference / (1000 * 60 * 60 * 24)),
        h: Math.floor((difference / (1000 * 60 * 60)) % 24),
        m: Math.floor((difference / 1000 / 60) % 60),
        s: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach(interval => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span>
        {timeLeft[interval]}{interval}{" "}
      </span>
    );
  });

  return(
    <Chip size="small" label={timerComponents.length ? timerComponents : "Time's up!"} />
  )
}

export default CountdownChip;
