import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
// import Box from '@material-ui/core/Box';
// import Typography from '@material-ui/core/Typography';
// import Card from '@material-ui/core/Card';

import Firebase from './../../../Firebase';

function content(coll, id) {
  Firebase.database().ref("/" + coll + "/Model User").once('value').then(function(snapshot) {
    console.log(snapshot.val());
  });

  switch (coll) {
    case 'users':
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
      return ("here"
        // <Grid container spacing={2}>
        //   <Grid item xs={6}> {/* user_ID text */}
        //     <TextField
        //       label="User ID"
        //       value={""}
        //       variant="filled"
        //       fullWidth
        //       size="small"
        //       InputProps={{
        //         readOnly: true,
        //       }}
        //     />
        //   </Grid>
        //   <Grid item xs={6}> {/* name text */}
        //     <TextField
        //       id="user_name"
        //       label="Name"
        //       value={this.peek("full_name")}
        //       variant="filled"
        //       fullWidth
        //       size="small"
        //       InputProps={{
        //         readOnly: true,
        //       }}
        //     />
        //   </Grid>
        //   <Grid item xs={3}>
        //     <Grid container spacing={2}>
        //       <Grid item xs={12}> {/* verified switch */}
        //         <FormControlLabel
        //           control={
        //             <Switch checked={this.peek("verified")} />
        //           }
        //           label="Verified"
        //           name="verified"
        //           onChange={this.updateValue}
        //         />
        //       </Grid>
        //       <Grid item xs={12}> {/* acc_created text */}
        //         <TextField
        //           id="acc_created"
        //           label="Acc Created"
        //           value={(this.peek("acc_created") !== "--") ? this.peek("acc_created").toDate().toLocaleDateString("en-US", {
        //             year: 'numeric', month: 'numeric', day: 'numeric' }) : "--"}
        //           variant="filled"
        //           fullWidth
        //           size="small"
        //           InputProps={{
        //             readOnly: true,
        //           }}
        //         />
        //       </Grid>
        //     </Grid>
        //   </Grid>
        //   <Grid item xs={9}> {/* address text */}
        //     <TextField
        //       id="address"
        //       label="Home Address"
        //       value={(this.peek("address") !== "--") ? addressEvaluator(this.peek("address")) : "--"}
        //       variant="filled"
        //       fullWidth
        //       multiline
        //       rows={3}
        //       size="small"
        //       InputProps={{
        //         readOnly: true,
        //       }}
        //     />
        //   </Grid>
        //   <Grid item xs={4}> {/* phone text */}
        //     <TextField
        //       id="phone"
        //       label="Phone Number"
        //       value={this.peek("phone")}
        //       variant="filled"
        //       fullWidth
        //       size="small"
        //       InputProps={{
        //         readOnly: true,
        //       }}
        //     />
        //   </Grid>
        //   <Grid item xs={4}> {/* email text */}
        //     <TextField
        //       id="email"
        //       label="Email"
        //       value={this.peek("email")}
        //       variant="filled"
        //       fullWidth
        //       size="small"
        //       InputProps={{
        //         readOnly: true,
        //       }}
        //     />
        //   </Grid>
        //   <Grid item xs={4}> {/* occupation text */}
        //     <TextField
        //       id="occupation"
        //       label="Occupation"
        //       value={this.peek("occupation")}
        //       variant="filled"
        //       fullWidth
        //       size="small"
        //       InputProps={{
        //         readOnly: true,
        //       }}
        //     />
        //   </Grid>
        // </Grid>
      );
    default:
      return null;
  }
}

function OtherCollectionDialog(props) {
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"user: " + props.id}</DialogTitle>
        <DialogContent>
          {content(props.coll, props.id)}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {console.log("modal");}} color="primary">
            Disagree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default OtherCollectionDialog;
