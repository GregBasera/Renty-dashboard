import React from 'react';

// Layout
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import UserFieldElements from './UserFieldChildren/UserFieldElements.js';
import CircularProgress from '@material-ui/core/CircularProgress';

class UserField extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      userInfo: null,
    });

    this.listenToFirebase = this.listenToFirebase.bind(this);
    this.listenToFirebase();
    this.updateValue = this.updateValue.bind(this);
  }

  listenToFirebase() {
    this.props.query.onSnapshot((doc) => {
      // console.log("Current data: ", doc.data());
      this.setState({ userInfo: { id: doc.id, data: doc.data() } });
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.query !== this.props.query) {
      this.listenToFirebase();
    }
  }

  updateValue() {

  }

  render() {
    const addressEvaluator = (addressObj) => {
      let addrsString = addressObj.unit_num + ", " +
      addressObj.residence + ", " +
      addressObj.barangay + ", " +
      addressObj.city_munici + ", " +
      addressObj.postal_code + ", " +
      addressObj.region + ", " +
      addressObj.country;

      return addrsString;
    };

    return (
      <Grid container spacing={2}>
        {/*(this.state.userInfo) ? <UserFieldElements info={this.state.userInfo} /> : <CircularProgress />*/}
        <Grid item xs={6}> {/* user_ID text */}
          <TextField
            id="user_ID"
            label="User ID"
            value={(this.state.userInfo) ? this.state.userInfo.id : ""}
            variant="outlined"
            fullWidth
            size="small"
            name="item_name"
            onChange={this.updateValue}
          />
        </Grid>
        <Grid item xs={6}> {/* name text */}
          <TextField
            id="user_name"
            label="Name"
            value={(this.state.userInfo) ? this.state.userInfo.data.full_name : ""}
            variant="outlined"
            fullWidth
            size="small"
            name="item_name"
            onChange={this.updateValue}
          />
        </Grid>
        <Grid item xs={3}>
          <Grid container spacing={2}>
            <Grid item xs={12}> {/* verified switch */}
              <FormControlLabel
                control={
                  <Switch checked={(this.state.userInfo) ? this.state.userInfo.data.verified : false} />
                }
                label="Verified"
                name="verified"
                onChange={this.updateValue}
              />
            </Grid>
            <Grid item xs={12}> {/* acc_created text */}
              <TextField
                id="acc_created"
                label="Account Created"
                value={(this.state.userInfo) ? this.state.userInfo.data.acc_created.toDate().toLocaleDateString("en-US", {
                  year: 'numeric', month: 'short', day: 'numeric' }) : ""}
                variant="outlined"
                fullWidth
                size="small"
                name="item_name"
                onChange={this.updateValue}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={9}> {/* address text */}
          <TextField
            id="address"
            label="Home Address"
            value={(this.state.userInfo) ? addressEvaluator(this.state.userInfo.data.address) : ""}
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            size="small"
            name="item_name"
            onChange={this.updateValue}
          />
        </Grid>
        <Grid item xs={4}> {/* phone text */}
          <TextField
            id="phone"
            label="Phone Number"
            value={(this.state.userInfo) ? this.state.userInfo.data.phone : ""}
            variant="outlined"
            fullWidth
            size="small"
            name="phone"
            onChange={this.updateValue}
          />
        </Grid>
        <Grid item xs={4}> {/* email text */}
          <TextField
            id="email"
            label="Email"
            value={(this.state.userInfo) ? this.state.userInfo.data.email : ""}
            variant="outlined"
            fullWidth
            size="small"
            name="email"
            onChange={this.updateValue}
          />
        </Grid>
        <Grid item xs={4}> {/* occupation text */}
          <TextField
            id="occupation"
            label="Occupation"
            value={(this.state.userInfo) ? this.state.userInfo.data.occupation : ""}
            variant="outlined"
            fullWidth
            size="small"
            name="occupation"
            onChange={this.updateValue}
          />
        </Grid>
        <Grid item xs={6} style={{backgroundColor:"coral", height:"100px"}}>
          Legal Documents
        </Grid>
        <Grid item xs={6} style={{backgroundColor:"teal", height:"100px"}}>
          User's History
        </Grid>
      </Grid>
    )
  }
}

export default UserField;
