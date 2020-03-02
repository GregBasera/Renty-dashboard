import React from 'react';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

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
    let stateRef = this.state.rentalInfo;
    stateRef.status = payload;
    this.setState({ rentalInfo: stateRef });
    this.props.query.update({
      status: payload,
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
    console.log(this.state);
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
          <Grid item xs={12}>
            <Stepper activeStep={this.peek("status")} orientation="horizontal" alternativeLabel style={{padding:"10px"}}>
              <Step key="Processing Req" onClick={() => {this.updateFire(0)}}>
                <StepLabel>Processing Req</StepLabel>
              </Step>
              <Step key="Item to HQ" onClick={() => {this.updateFire(1)}}>
                <StepLabel>Item to HQ</StepLabel>
              </Step>
              <Step key="HQ Check" onClick={() => {this.updateFire(2)}}>
                <StepLabel>HQ Check</StepLabel>
              </Step>
              <Step key="Item to Renter" onClick={() => {this.updateFire(3)}}>
                <StepLabel>Item to Renter</StepLabel>
              </Step>
              <Step key="Renter Received" onClick={() => {this.updateFire(4)}}>
                <StepLabel>Renter Received</StepLabel>
              </Step>
            </Stepper>
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
            <Stepper activeStep={this.peek("status")-5} orientation="horizontal" alternativeLabel style={{padding:"10px"}}>
              <Step key="Contract Over" onClick={() => {this.updateFire(5)}}>
                <StepLabel>Contract Over</StepLabel>
              </Step>
              <Step key="Item to HQ" onClick={() => {this.updateFire(6)}}>
                <StepLabel>Item to HQ</StepLabel>
              </Step>
              <Step key="HQ Check" onClick={() => {this.updateFire(7)}}>
                <StepLabel>HQ Check</StepLabel>
              </Step>
              <Step key="Item to Lender" onClick={() => {this.updateFire(8)}}>
                <StepLabel>Item to Lender</StepLabel>
              </Step>
              <Step key="Lender Received" onClick={() => {this.updateFire(9)}}>
                <StepLabel>Renter Received</StepLabel>
              </Step>
            </Stepper>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default RentalField;
