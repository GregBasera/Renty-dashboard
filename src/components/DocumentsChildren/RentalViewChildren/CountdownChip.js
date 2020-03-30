import React, { useEffect, useState } from "react";
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';

function calculateTimeLeft(end, status) {
  const difference = end.toDate() - +new Date();
  let timeLeft = {};

  if (difference > 0 && status === 5) {
    timeLeft = {
      d: Math.floor(difference / (1000 * 60 * 60 * 24)),
      h: Math.floor((difference / (1000 * 60 * 60)) % 24),
      m: Math.floor((difference / 1000 / 60) % 60),
      s: Math.floor((difference / 1000) % 60)
    };
    return timeLeft;
  } else {
    return -1;
  }
}

function CountdownChip(props) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(props.end, props.status));

  useEffect(() => {
    if(timeLeft !== -1){
      var clear = setTimeout(() => {
        setTimeLeft(calculateTimeLeft(props.end, props.status));
      }, 1000);
    } else {
      setTimeLeft("Times up!");
    }

    return function cleanup() {
      if(typeof clear !== 'undefined')
        clearTimeout(clear);
    };
  }, [timeLeft, props.end, props.status]);

  // console.log(typeof timeLeft);

  return((typeof timeLeft === "object") ? (
    <Chip size="small" label={timeLeft.d + "d " + timeLeft.h + "h " + timeLeft.m + "m " + timeLeft.s + "s"}
      style={{backgroundColor:(timeLeft.d+timeLeft.h === 0 && timeLeft.m <= 15) ? "orange" : "forestgreen",color:"white"}} />
  ) : (
    <Chip size="small" label={"Times up!"}
      style={{backgroundColor:"crimson",color:"white"}} />
  ));
}

export default CountdownChip;
