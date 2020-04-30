import React from 'react';

import TextField from '@material-ui/core/TextField';

function TfNoEdit(props) {
  return (
    <TextField
      label={props.label}
      value={props.value}
      variant={(typeof props.variant === 'string') ? props.variant : "filled"}
      fullWidth
      size="small"
      multiline={(typeof props.multiLine !== 'undefined') ? true : false}
      rows={props.rows}
      onClick={props.onClick}
      InputProps={{
        readOnly: true,
      }}
    />
  );
}

export default TfNoEdit;
