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
import CircularProgress from '@material-ui/core/CircularProgress';
import TfNoEdit from './ItemFieldChildren/TfNoEdit';

class UserField extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      userInfo: null,
      initialState: null,
      applyButton: false,
    });

    this.listenToFirebase = this.listenToFirebase.bind(this);
    this.listenToFirebase();
    this.updateValue = this.updateValue.bind(this);
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
      this.setState({
        initialState: null,
        userInfo: null,
        applyButton: false,
      });
      this.listenToFirebase();
    }
  }

  uploadChanged = () => {
    console.log("submit was called");
    let stateRef = this.state.userInfo.data;
    this.props.query.update({
      verified: (typeof stateRef.verified !== 'undefined') ? stateRef.verified : "error: notfound",
    });
    this.setState({ applyButton: false });
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
      applyButton: (JSON.stringify(this.state.itemInfo) !== JSON.stringify(this.state.initialState)) ? true : false,
    }));
  }

  peek = (key) => {
    if(this.state.userInfo !== null) {
      var returnThis = this.state.userInfo.data;
      return (Object.keys(returnThis).indexOf(key) !== -1) ? returnThis[key] : "--"
    } else {
      return "--";
    }
  }

  render() {
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

    return (this.state.userInfo === null) ? <CircularProgress /> : (
      <Grid container spacing={2}>
        <Grid item xs={6}> {/* user_ID text */}
          <TfNoEdit label="User ID" value={this.state.userInfo.id}/>
        </Grid>
        <Grid item xs={6}> {/* name text */}
          <TfNoEdit label="Name" value={this.state.userInfo.data.full_name}/>
        </Grid>
        <Grid item xs={3}>
          <Grid container spacing={2}>
            <Grid item xs={12}> {/* verified switch */}
              <FormControlLabel
                control={
                  <Switch checked={this.peek("verified")} />
                }
                label="Verified"
                name="verified"
                onChange={this.updateValue}
              />
            </Grid>
            <Grid item xs={12}> {/* acc_created text */}
              <TfNoEdit label="Acc Created" value={this.state.userInfo.data.acc_created.toDate().toLocaleDateString("en-US", {
                year: 'numeric', month: 'numeric', day: 'numeric' })}/>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={9}> {/* address text */}
          <TextField
            id="address"
            label="Home Address"
            value={(this.peek("address") !== "--") ? addressEvaluator(this.peek("address")) : "--"}
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
          <TfNoEdit label="Phone Number" value={this.state.userInfo.data.phone}/>
        </Grid>
        <Grid item xs={4}> {/* email text */}
          <TfNoEdit label="Email" value={this.state.userInfo.data.email}/>
        </Grid>
        <Grid item xs={4}> {/* occupation text */}
          <TfNoEdit label="Occupation" value={this.state.userInfo.data.occupation}/>
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
        <Grid item xs={12}> {/* apply changes button */}
          <Box display={(this.state.applyButton) ? "block" : "none"}>
            <Button fullWidth style={{backgroundColor:"#ce2458",color:"white"}} onClick={() => {this.uploadChanged()}}>apply changes</Button>
          </Box>
        </Grid>
      </Grid>
    )
  }
}

export default UserField;
