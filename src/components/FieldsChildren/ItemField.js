import React from 'react';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import CheckIcon from '@material-ui/icons/Check';

import MediaCard from './ItemFieldChildren/MediaCard.js';
import TfNoEdit from './ItemFieldChildren/TfNoEdit.js';
import CircularProgress from '@material-ui/core/CircularProgress';

class ItemField extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      itemInfo: null,
      initialState: null,
      applyButton: false,
      unsubscribe: "nada",
    });

    this.listenToFirebase = this.listenToFirebase.bind(this);
    this.listenToFirebase();
    this.updateValue = this.updateValue.bind(this);
  }

  listenToFirebase() {
    var unsub = this.props.query.onSnapshot((doc) => {
      // console.log("Current data: ", doc.data());
      if(this.state.itemInfo === null) {
        this.setState({ initialState: { id: doc.id, data: doc.data() } });
      }
      this.setState({
        itemInfo: { id: doc.id, data: doc.data() },
        unsubscribe: unsub,
      });
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.query !== this.props.query) {
      this.setState({
        initialState: null,
        itemInfo: null,
        applyButton: false,
      });
      this.listenToFirebase();
    }
  }

  componentWillUnmount() {
    console.log("unmount unsub");
    this.state.unsubscribe();
  }

  uploadChanged = () => {
    console.log("submit was called");
    let stateRef = this.state.itemInfo.data;
    this.props.query.update({
      is_approved: (typeof stateRef.is_approved !== 'undefined') ? stateRef.is_approved: "error: notfound",
      item_name: (stateRef.item_name) ? stateRef.item_name : "error: notfound",
      item_description: (stateRef.item_description) ? stateRef.item_description : "error: notfound",
    });
    this.setState({ applyButton: false });
  }

  updateValue(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    var tempState = this.state.itemInfo.data;
    tempState[name] = value;
    this.setState({
      itemInfo: {
        id: this.state.itemInfo.id,
        data: tempState
      },
      applyButton: (JSON.stringify(this.state.itemInfo) !== JSON.stringify(this.state.initialState)) ? true : false,
    });
  }

  peek = (key) => {
    if(this.state.itemInfo !== null) {
      var returnThis = this.state.itemInfo.data;
      return (Object.keys(returnThis).indexOf(key) !== -1) ? returnThis[key] : "--"
    } else {
      return "--";
    }
  }

  render() {
    return (this.state.itemInfo === null) ? <CircularProgress /> : (
      <Grid container spacing={2}>
        <Grid item xs={12}> {/* item_name text @ */}
          <TextField
            label="Item Name"
            value={this.state.itemInfo.data.item_name}
            variant="outlined"
            fullWidth
            name="item_name"
            onChange={this.updateValue}
          />
        </Grid>
        <Grid item xs={3}> {/* is_approved switch @ */}
          <FormControlLabel
            control={
              <Switch checked={this.state.itemInfo.data.is_approved} />
            }
            label="Approved"
            name="is_approved"
            onChange={this.updateValue}
          />
        </Grid>
        <Grid item xs={5}> {/* date_entered text */}
          <TfNoEdit label="Date Entered" value={this.state.itemInfo.data.date_entered.toDate().toLocaleDateString("en-US", {
            year: 'numeric', month: 'short', day: 'numeric', hour:'2-digit', minute:'2-digit' })}  />
        </Grid>
        <Grid item xs={4}> {/* item_id text */}
          <TfNoEdit label="Item ID" value={this.state.itemInfo.id}/>
        </Grid>
        <Grid item xs={5}> {/* pictures card */}
          <MediaCard info={this.state.itemInfo.data}/>
        </Grid>
        <Grid item xs={7}>
          <Grid container spacing={1}>
            <Grid item xs={12}> {/* description text @ */}
              <TextField
                id="description"
                label="Description"
                multiline
                fullWidth
                rows="7"
                value={this.peek("item_description")}
                variant="outlined"
                name="item_description"
                onChange={this.updateValue}
              />
            </Grid>
            <Grid item xs={12}> {/* lender text */}
              <TfNoEdit label="Lender" value={this.state.itemInfo.data.lender}/>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={5}> {/* rent_mode group */}
          <Box borderRadius={4} border={1} borderColor="grey.400" style={{padding:"5px"}}>
            <Typography variant="subtitle1" color="textSecondary">
              Rent Modes
            </Typography>
            <Grid container spacing={1} style={{marginTop:"5px"}}>
              <Grid item xs={12}>
                <TfNoEdit label="perHour (₱)" value={this.state.itemInfo.data.rent_details.perHour}/>
              </Grid>
              <Grid item xs={12}>
                <TfNoEdit label="perDay (₱)" value={this.state.itemInfo.data.rent_details.perDay}/>
              </Grid>
              <Grid item xs={12}>
                <TfNoEdit label="perWeek (₱)" value={this.state.itemInfo.data.rent_details.perWeek}/>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={7}>
          <Grid container spacing={1}>
            <Grid item xs={12}> {/* categories chips */}
              <Typography variant="subtitle1" color="textSecondary">
                Categories
              </Typography>
              {(this.peek("categories") !== "--") ? this.peek("categories").map((category,index) => {
                return (
                  <Chip size="small" label={category} />
                )
              }) : "nothing"}
            </Grid>
            <Grid item xs={12}> {/* Dropoff method group */}
              <Box borderRadius={4} border={1} borderColor="grey.400" style={{padding:"5px"}}>
                <Typography variant="subtitle1" color="textSecondary">
                  Drop-Off Method
                </Typography>
                <Grid container spacing={1} style={{marginTop:"5px"}}>
                  <Grid item xs={12}>
                    <Chip size="small" color="primary" icon={<CheckIcon fontSize="small" />} label={this.peek("acquisition_map").acquisition_type} />
                  </Grid>
                  <Grid item xs={12} style={{display:(this.peek("acquisition_map").pick_up_date === null) ? "none" : "block"}}>
                    <TextField
                      id="date_entered"
                      label="Preffered pick-up date"
                      value={(this.peek("acquisition_map") !== "--")
                        ? (this.peek("acquisition_map").pick_up_date === null) ? "null" : this.peek("acquisition_map").pick_up_date.toDate().toLocaleDateString("en-US", {
                        year: 'numeric', month: 'short', day: 'numeric', hour:'2-digit', minute:'2-digit' }) : "parent undef"}
                      variant="filled"
                      fullWidth
                      size="small"
                      name="date_entered"
                      onChange={this.updateValue}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
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

export default ItemField;
