import React from 'react';

import TextField from '@material-ui/core/TextField';

function TfNoEdit(props) {
  return (
    <TextField
      label={props.label}
      value={(props.value !== null) ? props.value : "--"}
      variant="filled"
      fullWidth
      size="small"
      InputProps={{
        readOnly: true,
      }}
    />
  );
}

export default TfNoEdit;
