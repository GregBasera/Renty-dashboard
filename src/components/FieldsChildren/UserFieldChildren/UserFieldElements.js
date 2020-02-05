import React from 'react';

// Layout
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

function UserFieldElements(props) {
  let phone = props.info.phone;

  return(
    <form noValidate autoComplete="off">
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            id="fullname"
            label="Fullname"
            value={props.info.full_name}
            variant="outlined"
            fullWidth={true}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="phone"
            label="Phone number"
            value={phone.substring(0, 6) + "-" +
                   phone.substring(6, 9) + "-" +
                   phone.substring(9)}
            variant="outlined"
            fullWidth={true}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="email"
            label="Email address"
            value={props.info.email}
            variant="outlined"
            fullWidth={true}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address"
            label="Home Address"
            // value={props.info.address._lat + " - " + props.info.address._long}
            value={"should the address be stored as geopoints?"}
            variant="outlined"
            fullWidth={true}
          />
        </Grid>
      </Grid>
    </form>
  )
}

export default UserFieldElements;
