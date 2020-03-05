import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

function RenderOtherColl(props) {
  props.data.then(function(data) {
    console.log(data);
  })
  const peek = (key) => {
    if(props.data !== null) {
      var returnThis = props.data;
      return (Object.keys(returnThis).indexOf(key) !== -1) ? returnThis[key] : "--"
    } else {
      return "--";
    }
  }

  const addressEvaluator = (addressObj) => {
    if(addressObj !== null) {
      let addrsString = addressObj.unit_num + ", " +
      addressObj.residence + ", " +
      addressObj.barangay + ", " +
      addressObj.city_munici + ", " +
      addressObj.postal_code + ", " +
      addressObj.region + ", " +
      addressObj.country;
      return addrsString;
    } else {
      return "--";
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}> {/* name text */}
        <TextField
          id="user_name"
          label="Name"
          value={props.full_name}
          variant="filled"
          fullWidth
          size="small"
          InputProps={{
            readOnly: true,
          }}
        />
      </Grid>
      <Grid item xs={3}>
        <Grid container spacing={2}>
          <Grid item xs={12}> {/* verified switch */}
            <FormControlLabel
              control={
                <Switch checked={peek("verified")} />
              }
              label="Verified"
              name="verified"
            />
          </Grid>
          <Grid item xs={12}> {/* acc_created text */}
            <TextField
              id="acc_created"
              label="Acc Created"
              value={(peek("acc_created") !== "--") ? peek("acc_created").toDate().toLocaleDateString("en-US", {
                year: 'numeric', month: 'numeric', day: 'numeric' }) : "--"}
              variant="filled"
              fullWidth
              size="small"
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={9}> {/* address text */}
        <TextField
          id="address"
          label="Home Address"
          value={(peek("address") !== "--") ? addressEvaluator(peek("address")) : "--"}
          variant="filled"
          fullWidth
          multiline
          rows={3}
          size="small"
          InputProps={{
            readOnly: true,
          }}
        />
      </Grid>
      <Grid item xs={4}> {/* phone text */}
        <TextField
          id="phone"
          label="Phone Number"
          value={peek("phone")}
          variant="filled"
          fullWidth
          size="small"
          InputProps={{
            readOnly: true,
          }}
        />
      </Grid>
      <Grid item xs={4}> {/* email text */}
        <TextField
          id="email"
          label="Email"
          value={peek("email")}
          variant="filled"
          fullWidth
          size="small"
          InputProps={{
            readOnly: true,
          }}
        />
      </Grid>
      <Grid item xs={4}> {/* occupation text */}
        <TextField
          id="occupation"
          label="Occupation"
          value={peek("occupation")}
          variant="filled"
          fullWidth
          size="small"
          InputProps={{
            readOnly: true,
          }}
        />
      </Grid>
    </Grid>
  );
}

export default RenderOtherColl;
