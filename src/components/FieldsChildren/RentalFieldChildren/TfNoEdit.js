import React from 'react';

import TextField from '@material-ui/core/TextField';

function TfNoEdit(props) {
  return (
    <TextField
      label={props.label}
      value={props.value}
      variant="filled"
      fullWidth
      size="small"
      onClick={props.onClick}
      InputProps={{
        readOnly: true,
      }}
    />
  );
}

export default TfNoEdit;
