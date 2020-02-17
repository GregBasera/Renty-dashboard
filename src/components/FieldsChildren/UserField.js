import React from 'react';

// Layout
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

// import UserFieldElements from './UserFieldChildren/UserFieldElements.js';
// import CircularProgress from '@material-ui/core/CircularProgress';

class UserField extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      userInfo: null,
      initialState: null,
    });

    this.listenToFirebase = this.listenToFirebase.bind(this);
    this.listenToFirebase();
    this.updateValue = this.updateValue.bind(this);
    this.applyButton = false;
  }

  listenToFirebase() {
    this.props.query.onSnapshot((doc) => {
      // console.log("Current data: ", doc.data());
      if(this.state.userInfo === null) {
        this.setState({ initialState: { id: doc.id, data: doc.data() } });
        console.log("updated initialState");
      }
      this.setState({ userInfo: { id: doc.id, data: doc.data() } });
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.query !== this.props.query) {
      this.setState({ initialState: null });
      this.setState({ itemInfo: null });
      this.applyButton = false;
      this.listenToFirebase();
    }
  }

  uploadChanged = () => {
    console.log("submit was called");
    let stateRef = this.state.userInfo.data;
    this.props.query.update({
      verified: (typeof stateRef.verified !== 'undefined') ? stateRef.verified : "error: notfound",
    });
  }

  updateValue(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState(prevState => ({
      userInfo: {
        id: this.state.userInfo.id,
        data: {
          ...prevState.userInfo.data, [name]: value
        }
      },
    }));
  }

  render() {
    console.log("State", this.state.userInfo);
    this.applyButton = (JSON.stringify(this.state.userInfo) !== JSON.stringify(this.state.initialState)) ? true : false;
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
                label="Acc Created"
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
        <Grid item xs={6}> {/* legal documents group */}
          <Typography variant="subtitle1" color="textSecondary">
            Legal Documents
          </Typography>
          <Box borderRadius={4} border={1} borderColor="grey.400" style={{padding:"5px"}}>
            <Card>
              <CardContent style={{padding:"5px 5px"}}>
                <Typography variant="subtitle1">
                  Document Title
                </Typography>
                <Typography variant="caption">
                  32mb last modified
                </Typography>
              </CardContent>
              <Box justifyContent="flex-end"> { /*!!!*/ }
                <Button size="small" color="primary">
                  download
                </Button>
                <Button size="small" color="primary">
                  preview
                </Button>
              </Box>
            </Card>
          </Box>
        </Grid>
        <Grid item xs={6}> {/* history group */}
          <Typography variant="subtitle1" color="textSecondary">
            User's History
          </Typography>
          <Box borderRadius={4} border={1} borderColor="grey.400" style={{padding:"5px"}}>

          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box display={(this.applyButton) ? "block" : "none"}>
            <Button fullWidth style={{backgroundColor:"#ce2458",color:"white"}} onClick={this.uploadChanged}>apply changes</Button>
          </Box>
        </Grid>
      </Grid>
    )
  }
}

export default UserField;
