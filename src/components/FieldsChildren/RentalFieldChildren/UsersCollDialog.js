import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

import Firebase from './../../../Firebase';
import TfNoEdit from './TfNoEdit';

class UsersCollectionDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      doc: null,
    });

    this.listenToFirebase = this.listenToFirebase.bind(this);
    this.listenToFirebase(this.props.coll, this.props.id);
  }

  async listenToFirebase(coll, id) {
    var data = null
    await Firebase.firestore().collection(coll).doc(id).get().then(function(snapshot) {
      if (snapshot.exists) {
        data = snapshot.data();
      } else {
        console.log("No such document!");
        data = -1;
      }
    }).catch(function(error) {
      console.log("Error getting document:", error);
    });

    this.setState({ doc: data });
  }

  addressEvaluator = (addressObj) => {
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
  }

  render() {
    return (this.state.doc === null) ? <CircularProgress /> : (this.state.doc === -1) ? (
      <Typography variant="caption" color="error">No such User!</Typography>
    ) : (
      <Dialog
        open={this.props.open}
        onClose={this.props.close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{this.props.title + ": " + this.props.id}</DialogTitle>
        <DialogContent>
          {/*(this.state.doc) ? this.state.doc.full_name : "nothing"*/}
          <Grid container spacing={2}>
            <Grid item xs={12}> {/* name text */}
              <TfNoEdit label="Name" value={this.state.doc.full_name}/>
            </Grid>
            <Grid item xs={3}>
              <Grid container spacing={2}>
                <Grid item xs={12}> {/* verified switch */}
                  <FormControlLabel
                    control={
                      <Switch checked={this.state.doc.verified} />
                    }
                    label="Verified"
                    name="verified"
                  />
                </Grid>
                <Grid item xs={12}> {/* acc_created text */}
                  <TextField
                    id="acc_created"
                    label="Acc Created"
                    value={this.state.doc.acc_created.toDate().toLocaleDateString("en-US", {
                      year: 'numeric', month: 'numeric', day: 'numeric' })}
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
                value={this.addressEvaluator(this.state.doc.address)}
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
              <TfNoEdit label="Phone Number" value={this.state.doc.phone}/>
            </Grid>
            <Grid item xs={4}> {/* email text */}
              <TfNoEdit label="Email" value={this.state.doc.email}/>
            </Grid>
            <Grid item xs={4}> {/* occupation text */}
              <TfNoEdit label="Occupation" value={this.state.doc.occupation}/>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.close} color="primary">
            Dismiss
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default UsersCollectionDialog;
