import React from 'react';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import ItemFieldElements from './ItemFieldChildren/ItemFieldElements.js';
import CircularProgress from '@material-ui/core/CircularProgress';

class ItemField extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      itemInfo: null,
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
      if(this.state.itemInfo === null) {
        this.setState({ initialState: doc.data() });
      }
      this.setState({ itemInfo: doc.data() });
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.query !== this.props.query) {
      this.setState({ initialState: null });
      this.setState({ itemInfo: null });
      this.setState({ applyButton: false });
      this.listenToFirebase();
    }
  }

  uploadChanged = () => {
    console.log("submit was called");
    this.props.query.set({
      is_approved: this.state.itemInfo.is_approved,
      item_name: this.state.itemInfo.item_name,
    })
  }

  updateValue(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState(prevState => ({
      itemInfo: {
        ...prevState.itemInfo, [name]: value
      },
      applyButton: true,
    }));
    console.log(this.state.itemInfo);
  }

  render() {
    return (
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Grid container spacing={2}>
            <Grid item xs={12}> {/* is_approved switch */}
              <FormControlLabel
              control={
                <Switch checked={(this.state.itemInfo) ? this.state.itemInfo.is_approved : false} />
              }
              label="Approved"
              name="is_approved"
              onChange={this.updateValue}
              />
            </Grid>
            <Grid item xs={12}> {/* date_entered text */}
              <TextField
                id="date_entered"
                label="Date Entered"
                value={"date"}
                variant="outlined"
                fullWidth
                name="date_entered"
                onChange={this.updateValue}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={8}> {/* item_name text */}
          <TextField
            id="item_name"
            label="Item Name"
            value={(this.state.itemInfo) ? this.state.itemInfo.item_name : "--"}
            variant="outlined"
            fullWidth
            multiline
            rows="3"
            name="item_name"
            onChange={this.updateValue}
          />
        </Grid>
        <Grid item xs={5}> {/* pictures card */}
          { (this.state.itemInfo)
            ? <ItemFieldElements info={this.state.itemInfo} up={this.uploadChanged} />
            : <CircularProgress /> }
        </Grid>
        <Grid item xs={7}>
          <Grid container spacing={2}>
            <Grid item xs={12}> {/* description text */}
              <TextField
                id="description"
                label="Description"
                multiline
                fullWidth
                rows="7"
                value={(this.state.itemInfo) ? this.state.itemInfo.description : "--"}
                variant="outlined"
                name="description"
                onChange={this.updateValue}
              />
            </Grid>
            <Grid item xs={12}> {/* lender text */}
              <TextField
                id="lender"
                label="Lender"
                value={(this.state.itemInfo) ? this.state.itemInfo.lender : "--"}
                variant="outlined"
                fullWidth
                name="lender"
                onChange={this.updateValue}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}> {/* rent_mode group */}
          <Typography variant="subtitle2" color="textSecondary">
            Rent Modes
          </Typography>
          <Box borderRadius={4} border={1} borderColor="grey.400" style={{padding:"5px"}}>
            <Grid container spacing={2} style={{marginTop:"5px"}}>
              <Grid item xs={12}>
                <TextField
                  id="hourly"
                  label="perHour (₱)"
                  value={(this.state.itemInfo && this.state.itemInfo.rent_mode) ? this.state.itemInfo.rent_mode.perHour : ""}
                  variant="outlined"
                  fullWidth
                  name="rent_mode.perHour"
                  onChange={this.updateValue}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="daily"
                  label="perDay (₱)"
                  value={(this.state.itemInfo && this.state.itemInfo.rent_mode) ? this.state.itemInfo.rent_mode.perDay : ""}
                  variant="outlined"
                  fullWidth
                  name="rent_mode.perDay"
                  onChange={this.updateValue}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="weekly"
                  label="perWeek (₱)"
                  value={(this.state.itemInfo && this.state.itemInfo.rent_mode) ? this.state.itemInfo.rent_mode.perWeek : ""}
                  variant="outlined"
                  fullWidth
                  name="rent_mode.perWeek"
                  onChange={this.updateValue}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box display={(this.state.applyButton) ? "block" : "none"}>
            <Button style={{backgroundColor:"#ce2458",color:"white"}} onClick={this.uploadChanged}>apply changes</Button>
          </Box>
        </Grid>
      </Grid>
    )
  }
}

export default ItemField;
