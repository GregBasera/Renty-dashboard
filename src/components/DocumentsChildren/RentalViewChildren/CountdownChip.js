import React, { useEffect, useState } from "react";
import Chip from '@material-ui/core/Chip';

function CountdownChip(props) {
  

  return(
    <Chip size="small" label={(true) ? "helo" : "Time's up!"} />
  )
}

export default CountdownChip;
