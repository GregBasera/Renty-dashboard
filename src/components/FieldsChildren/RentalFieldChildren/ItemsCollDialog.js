import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import CheckIcon from '@material-ui/icons/Check';

import Firebase from './../../../Firebase';
import TfNoEdit from './TfNoEdit';
import MediaCard from './MediaCard';

class ItemsCollDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      doc: null,
    });

    this.listenToFirebase = this.listenToFirebase.bind(this);
    this.listenToFirebase(this.props.coll, this.props.id);
  }

  async listenToFirebase(coll, id) {
    var data = null
    await Firebase.firestore().collection(coll).doc(id).get().then(function(snapshot) {
      if (snapshot.exists) {
        data = snapshot.data();
      } else {
        console.log("No such document!");
      }
    }).catch(function(error) {
      console.log("Error getting document:", error);
    });

    this.setState({ doc: data });
  }

  peek = (key) => {
    if(this.state.doc !== null) {
      var returnThis = this.state.doc;
      return (Object.keys(returnThis).indexOf(key) !== -1) ? returnThis[key] : "--"
    } else {
      return "--";
    }
  }

  render() {
    return (this.state.doc === null) ? <CircularProgress /> : (
      <Dialog
        open={this.props.open}
        onClose={this.props.close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{this.props.title + ": " + this.props.id}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}> {/* item_name text @ */}
              <TfNoEdit label="Item Name" value={this.state.doc.item_name}/>
            </Grid>
            <Grid item xs={3}> {/* is_approved switch @ */}
              <FormControlLabel
                control={
                  <Switch checked={this.state.doc.is_approved} />
                }
                label="Approved"
                name="is_approved"
                onChange={this.updateValue}
              />
            </Grid>
            <Grid item xs={5}> {/* date_entered text */}
              <TfNoEdit label="Date Entered" value={this.state.doc.date_entered.toDate().toLocaleDateString("en-US", {
                year: 'numeric', month: 'short', day: 'numeric', hour:'2-digit', minute:'2-digit' })}  />
            </Grid>
            <Grid item xs={4}> {/* item_id text */}
              <TfNoEdit label="Item ID" value={this.state.doc.id}/>
            </Grid>
            <Grid item xs={5}> {/* pictures card */}
              <MediaCard info={this.state.doc}/>
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
                    variant="filled"
                    name="item_description"
                    onChange={this.updateValue}
                  />
                </Grid>
                <Grid item xs={12}> {/* lender text */}
                  <TfNoEdit label="Lender" value={this.state.doc.lender}/>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={5}> {/* rent_mode group */}
              <Typography variant="subtitle1" color="textSecondary">
                Rent Modes
              </Typography>
              <Box borderRadius={4} border={1} borderColor="grey.400" style={{padding:"5px"}}>
                <Grid container spacing={1} style={{marginTop:"5px"}}>
                  <Grid item xs={12}>
                    <TfNoEdit label="perHour (₱)" value={this.state.doc.rent_details.perHour}/>
                  </Grid>
                  <Grid item xs={12}>
                    <TfNoEdit label="perDay (₱)" value={this.state.doc.rent_details.perDay}/>
                  </Grid>
                  <Grid item xs={12}>
                    <TfNoEdit label="perWeek (₱)" value={this.state.doc.rent_details.perWeek}/>
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
                  <Typography variant="subtitle1" color="textSecondary">
                    Drop-Off Method
                  </Typography>
                  <Box borderRadius={4} border={1} borderColor="grey.400" style={{padding:"5px"}}>
                    <Grid container spacing={1}>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.close} color="primary">
            Dismiss
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default ItemsCollDialog;
