import React from 'react';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import LenderToRenterStepper from './RentalFieldChildren/LenderToRenterStepper.js';
import RenterToLenderStepper from './RentalFieldChildren/RenterToLenderStepper.js';
// import CircularProgress from '@material-ui/core/CircularProgress';

class RentalField extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      rentalInfo: null,
      initialState: null,
    });

    this.listenToFirebase = this.listenToFirebase.bind(this);
    this.listenToFirebase();
    this.updateFire = this.updateFire.bind(this);
  }

  listenToFirebase() {
    this.props.query.onSnapshot((doc) => {
      // console.log("Current data: ", doc.data());
      if(this.state.userInfo === null) {
        this.setState({ initialState: { id: doc.id, data: doc.data() } });
        console.log("updated initialState");
      }
      this.setState({ rentalInfo: { id: doc.id, data: doc.data() } });
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.query !== this.props.query) {
      this.setState({ initialState: null });
      this.setState({ rentalInfo: null });
      this.applyButton = false;
      this.listenToFirebase();
    }
  }

  updateFire(payload) {
    let stateRef = this.state.rentalInfo.data;
    this.props.query.update({
      status: (typeof stateRef.status !== 'undefined') ? payload : "error: notfound",
    });
  }

  peek = (key) => {
    if(this.state.rentalInfo !== null) {
      var returnThis = this.state.rentalInfo.data;
      return (Object.keys(returnThis).indexOf(key) !== -1) ? returnThis[key] : "--"
    } else {
      return "--";
    }
  }

  render() {
    return (
      <div>
        {/*(this.state.rentalInfo) ? <RentalFieldElements info={this.state.rentalInfo} /> : <CircularProgress />*/}
        <Grid container spacing={2}>
          <Grid item xs={12}> {/* item_ID */}
            <TextField
              label="Item ID"
              value={this.peek("item_ID")}
              variant="filled"
              fullWidth
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={6}> {/* lender_ID */}
            <TextField
              label="Lender's ID"
              value={this.peek("lender_ID")}
              variant="filled"
              fullWidth
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={6}> {/* renter_ID */}
            <TextField
              label="Renter's ID"
              value={this.peek("renter_ID")}
              variant="filled"
              fullWidth
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <LenderToRenterStepper
              currStatus={(this.state.rentalInfo) ? this.state.rentalInfo.data.status : null}
              up={this.updateFire}
            />
            <RenterToLenderStepper
              currStatus={(this.state.rentalInfo) ? this.state.rentalInfo.data.status : null}
              up={this.updateFire}
            />
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default RentalField;
