import React from 'react';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import LenderToRenterStepper from './RentalFieldChildren/LenderToRenterStepper.js';
import RenterToLenderStepper from './RentalFieldChildren/RenterToLenderStepper.js';
import CircularProgress from '@material-ui/core/CircularProgress';

class RentalField extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      rentalInfo: null,
    });

    this.listenToFirebase = this.listenToFirebase.bind(this);
    this.listenToFirebase();
  }

  listenToFirebase() {
    this.props.query.onSnapshot((doc) => {
      // console.log("Current data: ", doc.data());
      this.setState({ rentalInfo: { id: doc.id, data: doc.data() } });
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.query !== this.props.query) {
      this.listenToFirebase();
    }
  }

  updateValue(event) {
    // const target = event.target;
    // const value = target.type === 'checkbox' ? target.checked : target.value;
    // const name = target.name;
    //
    // this.setState(prevState => ({
    //   itemInfo: {
    //     id: this.state.itemInfo.id,
    //     data: {
    //       ...prevState.itemInfo.data, [name]: value
    //     }
    //   },
    // }));
  }

  fcm = () => {
    fetch('https://fcm.googleapis.com/fcm/send', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Authorization' : 'key=' + 'AAAAfIlkwIw:APA91bGDIpxkFFsf4hpqnmiQ5OVKexxce8BQ6xbOixXdzXUh_q13WRy6j33vR7VXI-_TJ3ePsU6xRkr044jDhZvkxEZCYjAC9ti2AtYeiTNPdGStrRt-mz3S10K0W8J3i-8JJrG0PnEW',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to: 'cMkwTX1P0iO6EM-YC63Bvs:APA91bHceS85uNrMDFXuOrbT54XRJVQY7zPE7Ej_qJ_HesxobUxsXEcgj6ZguVGop-wQuHea6-4sbx7HD-z68pVIiWIy7Xk170xcUJAvY1L_Uo4mIeKkxo7sI0t7NAR303nsPWLlO__b',
        notification: {
          title: "notif using reactjs/fetch",
          body: "Im currently testing. If you recieve this msg, pls tell me..."
        }
      })
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
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
            <LenderToRenterStepper />
          </Grid>
          <Grid item xs={6}> {/* renter_ID */}
            <RenterToLenderStepper />
            <TextField
              label="Renter's ID"
              value={this.peek("renter_ID")}
              variant="filled"
              fullWidth
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Button onClick={this.fcm}>
            click
          </Button>
        </Grid>
      </div>
    )
  }
}

export default RentalField;
