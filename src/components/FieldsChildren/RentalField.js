import React from 'react';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

// import LenderToRenterStepper from './RentalFieldChildren/LenderToRenterStepper.js';
// import RenterToLenderStepper from './RentalFieldChildren/RenterToLenderStepper.js';
import OtherCollectionDialog from './RentalFieldChildren/OtherCollectionDialog.js';
// import CircularProgress from '@material-ui/core/CircularProgress';

class RentalField extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      rentalInfo: null,
      initialState: null,
      modal: false,
    });

    this.listenToFirebase = this.listenToFirebase.bind(this);
    this.listenToFirebase();
    this.updateFire = this.updateFire.bind(this);
    this.stepperNavigation = this.stepperNavigation.bind(this);
    this.fcm = this.fcm.bind(this);
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

  fcm(title, body) {
    console.log(title, body);
    fetch('https://fcm.googleapis.com/fcm/send', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Authorization' : 'key=AAAAfIlkwIw:APA91bGDIpxkFFsf4hpqnmiQ5OVKexxce8BQ6xbOixXdzXUh_q13WRy6j33vR7VXI-_TJ3ePsU6xRkr044jDhZvkxEZCYjAC9ti2AtYeiTNPdGStrRt-mz3S10K0W8J3i-8JJrG0PnEW',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to: 'ceFGfb13aSA:APA91bHD9-Gony4oig3ZxOwGsamb47EZl0U0TqsW_yuKHRoxCQnNqEhYPs2-kUUe_9tU48JEYBYOWzzxPzdWpXd-9epQs8tMYL37Pm2X1ZQwWbH3ikeAME80DgameRQASVnxS3mNOCq5',
        // to: '/topics/android',
        notification: {
          title: title,
          body: body
        }
      })
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('FCM API responce:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  stepperNavigation(index) {
    switch (index) {
      case 0:
        // this.fcm(
        //   "A person wants to rent an item you listed.",
        //   "We are currently processing the request. You'll be contacted shortly to confirm the items availability."
        // ); // lender
        // this.fcm(
        //   "Your request has been processed.",
        //   "The lender is now being asked for approval."
        // ); // renter
        return "The LENDER and RENTER was notified. (!) Contact the lender, discuss and confirm the renting and item details.";
        // ! ! ! lender can refuse here
      case 1:
        return "Dispatch a rider to the Lenders address to retrieve the item.";
      case 2:
        // this.fcm(
        //   "Item preparation complete.",
        //   "The item is now on its way to the person who rented it. <renting details>"
        // ); // lender
        // this.fcm(
        //   "Item preparation complete.",
        //   "The item is now on its way to you."
        // ); // renter
        return "The LENDER and RENTER was notified. Item is officially out the hands of the lender and in the hands of Renty.";
      case 3:
        return "Dispatch a rider to the Renters address to deliver the rented item.";
      case 4:
        // this.fcm(
        //   "The item has been received.",
        //   "The item is due <renting details>. Thank you."
        // ); // renter
        return "The RENTER was notified. Item is officially out the hands of Renty and in the hands of the Renter.";
      case 5:
        // this.fcm(
        //   "An item contract just expired.",
        //   "The renter is now being adviced to prepare the item for retrieval. <item details>"
        // ); // lender
        // this.fcm(
        //   "Your contract just expired.",
        //   "Please prepare the item for retrieval. A rider will be visiting your address to retrieve the item."
        // ); // renter
        return "The LENDER and RENTER was notified.";
      case 6:
        return "Dispatch a rider to the Renter's address for retrieval."
      case 7:
        // this.fcm(
        //   "Your item just arrived in the Renty HQ.",
        //   "Its condition is now being inspected."
        // ); // lender
        // this.fcm(
        //   "Item recieved.",
        //   "Renty HQ just received the item you just rented. Thank you! <promotions>"
        // ); // renter
        return "The LENDER and RENTER was notified. Item is officially out the hands of the Lender and in the hands of Renty.";
      case 8:
        return "Dispatch a rider to the Lender's address to return the item."
      case 9:
        // this.fcm(
        //   "Item and Lender reunited.",
        //   "<promotions>."
        // ); // Lender
        return "The LENDER was notified. Item is officially out the hands of Renty and back in the hands of the Lender.";
      case 10:
        return "Transactions complete!"
      default:
        return null;
    }
  }

  closeModal() {
    this.setState({ modal: false });
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
              onClick={() => {this.setState({ modal: true })}}
              />
            <OtherCollectionDialog open={this.state.modal} close={this.closeModal} id={this.peek("lender_ID")} coll={"users"}/>
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
          <Grid item xs={12}> {/* rental stepper */}
            <Box borderRadius={4} border={1} borderColor="grey.400" style={{padding:"5px"}}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Stepper activeStep={this.peek("status")} orientation="horizontal" alternativeLabel style={{padding:"10px"}}>
                    <Step key="Processing Req">
                      <StepLabel>Processing Req</StepLabel>
                    </Step>
                    <Step key="Item to HQ">
                      <StepLabel>Item to HQ</StepLabel>
                    </Step>
                    <Step key="HQ Check">
                      <StepLabel>HQ Check</StepLabel>
                    </Step>
                    <Step key="Item to Renter">
                      <StepLabel>Item to Renter</StepLabel>
                    </Step>
                    <Step key="Renter Received">
                      <StepLabel>Renter Received</StepLabel>
                    </Step>
                  </Stepper>
                </Grid>
                <Grid item xs={12}>
                  <Stepper activeStep={this.peek("status")-5} orientation="horizontal" alternativeLabel style={{padding:"10px"}}>
                    <Step key="Contract Over">
                      <StepLabel>Contract Over</StepLabel>
                    </Step>
                    <Step key="Item to HQ">
                      <StepLabel>Item to HQ</StepLabel>
                    </Step>
                    <Step key="HQ Check">
                      <StepLabel>HQ Check</StepLabel>
                    </Step>
                    <Step key="Item to Lender">
                      <StepLabel>Item to Lender</StepLabel>
                    </Step>
                    <Step key="Lender Received">
                      <StepLabel>Renter Received</StepLabel>
                    </Step>
                  </Stepper>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={1}>
                    <Grid item xs={'auto'}>
                      <Button
                        disabled={(this.peek("status") === 10) ? true : false}
                        variant="contained"
                        color="primary"
                        onClick={() => {this.updateFire((this.peek("status") === null) ? 0 : this.peek("status")+1)}}
                        >
                        {(this.peek("status") === 9) ? 'Finish' : 'Next'}
                      </Button>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="caption" color="error">
                        {this.stepperNavigation(this.peek("status"))}
                      </Typography>
                    </Grid>
                  </Grid>
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
