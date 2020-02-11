import React from 'react';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import ItemFieldElements from './ItemFieldChildren/ItemFieldElements.js';
import CircularProgress from '@material-ui/core/CircularProgress';

class ItemField extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      itemInfo: null,
    });

    this.listenToFirebase = this.listenToFirebase.bind(this);
    this.listenToFirebase();
    this.updateValue = this.updateValue.bind(this);
  }

  listenToFirebase() {
    this.props.query.onSnapshot((doc) => {
      // console.log("Current data: ", doc.data());
      this.setState({ itemInfo: doc.data() });
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.query !== this.props.query) {
      this.listenToFirebase();
    }
  }

  uploadChanged = () => {
    this.props.query.set({
      is_approved: true,
    })
  }

  updateValue(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState(prevState => ({
      // itemInfo: { [name]: value }
      itemInfo: {
        ...prevState.itemInfo, [name]: value
      }
    }));
    console.log(this.state);
  }

  render() {
    return (
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <FormControlLabel
            control={
              <Switch checked={(this.state.itemInfo) ? this.state.itemInfo.is_approved : false} />
            }
            label="Approved"
            name="is_approved"
          />
        </Grid>
        <Grid item xs={9}>
          <TextField
            id="item_name"
            label="Item Name"
            value={(this.state.itemInfo) ? this.state.itemInfo.item_name : "--"}
            variant="outlined"
            fullWidth
            name="item_name"
            onChange={this.updateValue}
          />
        </Grid>
        <Grid item xs={5}>
          { (this.state.itemInfo)
            ? <ItemFieldElements info={this.state.itemInfo} up={this.uploadChanged} />
            : <CircularProgress /> }
        </Grid>
        <Grid item xs={7}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
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
            <Grid item xs={12}>
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
        <Grid item xs={3}>
          <TextField
            type="number"
            id="lenders_rate"
            label="Lender Rate (₱)"
            value={(this.state.itemInfo) ? this.state.itemInfo.rent_rate : "--"}
            variant="outlined"
            fullWidth
            name="lenders_rate"
            onChange={this.updateValue}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            id="rent_type"
            label="Span"
            value={(this.state.itemInfo) ? this.state.itemInfo.rent_type : "--"}
            variant="outlined"
            fullWidth
            name="rent_type"
            onChange={this.updateValue}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            type="number"
            id="service_fee"
            label="Service Fee (%)"
            value={(this.state.itemInfo) ? this.state.itemInfo.service_fee : "--"}
            variant="outlined"
            fullWidth
            name="service_fee"
            onChange={this.updateValue}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            type="number"
            id="in_store_price"
            label="In-store (₱)"
            value={(this.state.itemInfo) ? this.state.itemInfo.in_store_price : "--"}
            variant="outlined"
            fullWidth
            name="in_store_price"
            onChange={this.updateValue}
          />
        </Grid>
      </Grid>
    )
  }
}

export default ItemField;
