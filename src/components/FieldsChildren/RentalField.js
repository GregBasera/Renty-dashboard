import React from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

// import LenderToRenterStepper from './RentalFieldChildren/LenderToRenterStepper.js';
// import RenterToLenderStepper from './RentalFieldChildren/RenterToLenderStepper.js';
import UsersCollDialog from './RentalFieldChildren/UsersCollDialog';
import ItemsCollDialog from './RentalFieldChildren/ItemsCollDialog';
import TfNoEdit from './RentalFieldChildren/TfNoEdit';
import StepperFCM from './RentalFieldChildren/StepperFCM';
// import CircularProgress from '@material-ui/core/CircularProgress';

class RentalField extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      rentalInfo: null,
      initialState: null,
      lenderModal: false,
      renterModal: false,
      itemModal: false,
    });

    this.listenToFirebase = this.listenToFirebase.bind(this);
    this.listenToFirebase();
    // this.updateFire = this.updateFire.bind(this);
    this.closeModal = this.closeModal.bind(this);
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

  // updateFire(payload) {
  //   let stateRef = this.state.rentalInfo;
  //   stateRef.status = payload;
  //   this.setState({ rentalInfo: stateRef });
  //   this.props.query.update({
  //     status: payload,
  //   });
  // }

  peek = (key) => {
    if(this.state.rentalInfo !== null) {
      var returnThis = this.state.rentalInfo.data;
      return (Object.keys(returnThis).indexOf(key) !== -1) ? returnThis[key] : "--"
    } else {
      return "--";
    }
  }

  closeModal() {
    this.setState({
      lenderModal: false,
      renterModal: false,
      itemModal: false,
    });
  }

  render() {
    return (this.state.rentalInfo === null) ? <CircularProgress /> : (
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}> {/* item_ID */}
            <TfNoEdit label="Item ID" value={this.state.rentalInfo.data.item_ID} onClick={() => {this.setState({ itemModal: true })}}/>
            {/*<ItemsCollDialog title="Item" open={this.state.itemModal} close={this.closeModal} id={this.peek("item_ID")} coll={"items"}/>*/}
          </Grid>
          <Grid item xs={6}> {/* lender_ID */}
            <TfNoEdit label="Lender's ID" value={this.state.rentalInfo.data.lender_ID} onClick={() => {this.setState({ lenderModal: true })}}/>
            {/*<UsersCollDialog title="Lender" open={this.state.lenderModal} close={this.closeModal} id={this.peek("lender_ID")} coll={"users"}/>*/}
          </Grid>
          <Grid item xs={6}> {/* renter_ID */}
            <TfNoEdit label="Renter's ID" value={this.state.rentalInfo.data.renter_ID} onClick={() => {this.setState({ renterModal: true })}}/>
            {/*<UsersCollDialog title="Renter" open={this.state.renterModal} close={this.closeModal} id={this.peek("renter_ID")} coll={"users"}/>*/}
          </Grid>
          <Grid item xs={12}> {/* rental stepper */}
            <StepperFCM
              query={this.props.query}
              status={this.state.rentalInfo.data.status}
              lender_fcm_token={this.state.rentalInfo.data.lender_fcm_token}
              render_fcm_token={this.state.rentalInfo.data.render_fcm_token}
            />
          </Grid>
          <Grid item xs={6}> {/* duration */}
            <Box borderRadius={4} border={1} borderColor="grey.400" style={{padding:"5px"}}>
              <Typography variant="subtitle1" color="textSecondary">
              Rent Duration
              </Typography>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <TfNoEdit label="Start date" value={this.state.rentalInfo.data.rent_duration.start_date.toDate().toLocaleDateString("en-US", {
                    year: 'numeric', month: 'short', day: 'numeric', hour:'2-digit', minute:'2-digit' })}/>
                </Grid>
                <Grid item xs={12}>
                  <TfNoEdit label="End date" value={this.state.rentalInfo.data.rent_duration.end_date.toDate().toLocaleDateString("en-US", {
                    year: 'numeric', month: 'short', day: 'numeric', hour:'2-digit', minute:'2-digit' })}/>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={6}> {/* prices */}
            <Box borderRadius={4} border={1} borderColor="grey.400" style={{padding:"5px"}}>
              <Typography variant="subtitle1" color="textSecondary">
                Checkout Details
              </Typography>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <TfNoEdit label="Agreed upon price (₱)" value={this.state.rentalInfo.data.lender_def_price}/>
                </Grid>
                <Grid item xs={12}>
                  <TfNoEdit label="Service Fee (₱)" value={this.state.rentalInfo.data.service_fee}/>
                </Grid>
                <Grid item xs={12}>
                  <TfNoEdit label="Total Price (₱)" value={this.state.rentalInfo.data.total_price}/>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default RentalField;
