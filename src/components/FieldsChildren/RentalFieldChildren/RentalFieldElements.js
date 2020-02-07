import React from 'react';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

function RentalFieldElements(props) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <TextField
          id="lender"
          label="Lender's ID"
          defaultValue={(props.info.lender) ? props.info.lender : "--"}
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="renter"
          label="Renter's ID"
          defaultValue={(props.info.renter) ? props.info.renter : "--"}
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="item"
          label="Items's ID"
          defaultValue={(props.info.item) ? props.info.item : "--"}
          variant="outlined"
          fullWidth
        />
      </Grid>
    </Grid>
  );
}

export default RentalFieldElements;
