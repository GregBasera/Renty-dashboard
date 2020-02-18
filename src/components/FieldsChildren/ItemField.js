import React from 'react';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';


import MediaCard from './ItemFieldChildren/MediaCard.js';
import CircularProgress from '@material-ui/core/CircularProgress';

class ItemField extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      itemInfo: null,
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
      if(this.state.itemInfo === null) {
        this.setState({ initialState: { id: doc.id, data: doc.data() } });
      }
      this.setState({ itemInfo: { id: doc.id, data: doc.data() } });
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
    let stateRef = this.state.itemInfo.data;
    this.props.query.update({
      is_approved: (typeof stateRef.is_approved !== 'undefined') ? stateRef.is_approved: "error: notfound",
      item_name: (stateRef.item_name) ? stateRef.item_name : "error: notfound",
      description: (stateRef.description) ? stateRef.description : "error: notfound",
    });
  }

  updateValue(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState(prevState => ({
      itemInfo: {
        id: this.state.itemInfo.id,
        data: {
          ...prevState.itemInfo.data, [name]: value
        }
      },
    }));
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
    this.applyButton = (JSON.stringify(this.state.itemInfo) !== JSON.stringify(this.state.initialState)) ? true : false;

    return (
      <Grid container spacing={2}>
        <Grid item xs={12}> {/* item_name text @ */}
          <TextField
            id="item_name"
            label="Item Name"
            value={this.peek("item_name")}
            variant="outlined"
            fullWidth
            name="item_name"
            onChange={this.updateValue}
          />
        </Grid>
        <Grid item xs={3}> {/* is_approved switch @ */}
          <FormControlLabel
            control={
              <Switch checked={this.peek("is_approved")} />
            }
            label="Approved"
            name="is_approved"
            onChange={this.updateValue}
          />
        </Grid>
        <Grid item xs={5}> {/* date_entered text */}
          <TextField
            id="date_entered"
            label="Date Entered"
            value={(this.peek("date_entered") !== '--') ? this.peek("date_entered").toDate().toLocaleDateString("en-US", {
              year: 'numeric', month: 'short', day: 'numeric', hour:'2-digit', minute:'2-digit' }) : "--"}
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
        <Grid item xs={4}> {/* item_id text */}
          <TextField
            id="item_ID"
            label="Item ID"
            value={(this.state.itemInfo) ? this.state.itemInfo.id : ""}
            variant="filled"
            fullWidth
            size="small"
            name="item_ID"
            onChange={this.updateValue}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={5}> {/* pictures card */}
          { (this.state.itemInfo)
            ? <MediaCard info={this.state.itemInfo.data} up={this.uploadChanged} />
            : <CircularProgress /> }
        </Grid>
        <Grid item xs={7}>
          <Grid container spacing={2}>
            <Grid item xs={12}> {/* description text @ */}
              <TextField
                id="description"
                label="Description"
                multiline
                fullWidth
                rows="7"
                value={this.peek("description")}
                variant="outlined"
                name="description"
                onChange={this.updateValue}
              />
            </Grid>
            <Grid item xs={12}> {/* lender text */}
              <TextField
                id="lender"
                label="Lender"
                value={this.peek("lender")}
                variant="filled"
                fullWidth
                size="small"
                name="lender"
                onChange={this.updateValue}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={5}> {/* rent_mode group */}
          <Typography variant="subtitle1" color="textSecondary">
            Rent Modes
          </Typography>
          <Box borderRadius={4} border={1} borderColor="grey.400" style={{padding:"5px"}}>
            <Grid container spacing={2} style={{marginTop:"5px"}}>
              <Grid item xs={12}>
                <TextField
                  id="hourly"
                  label="perHour (₱)"
                  value={(this.peek("rent_mode") !== "--") ? this.peek("rent_mode").perHour : "--"}
                  variant="filled"
                  fullWidth
                  size="small"
                  name="rent_mode.perHour"
                  onChange={this.updateValue}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="daily"
                  label="perDay (₱)"
                  value={(this.peek("rent_mode") !== "--") ? this.peek("rent_mode").perDay : "--"}
                  variant="filled"
                  fullWidth
                  size="small"
                  name="rent_mode.perDay"
                  onChange={this.updateValue}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="weekly"
                  label="perWeek (₱)"
                  value={(this.peek("rent_mode") !== "--") ? this.peek("rent_mode").perWeek : "--"}
                  variant="filled"
                  fullWidth
                  size="small"
                  name="rent_mode.perWeek"
                  onChange={this.updateValue}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={7}>
          <Grid container spacing={2}>
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
              <Typography variant="subtitle1" color="textSecondary">
                Drop-Off Method
              </Typography>
              <Box borderRadius={4} border={1} borderColor="grey.400" style={{padding:"5px"}}>

              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}> {/* apply changes button */}
          <Box display={(this.applyButton) ? "block" : "none"}>
            <Button fullWidth style={{backgroundColor:"#ce2458",color:"white"}} onClick={this.uploadChanged}>apply changes</Button>
          </Box>
        </Grid>
      </Grid>
    )
  }
}

export default ItemField;
