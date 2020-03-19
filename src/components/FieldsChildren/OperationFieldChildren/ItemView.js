import React from 'react';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

// import TfNoEdit from './TfNoEdit';
import Firebase from './../../../Firebase';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import CategoriesDialog from './CategoriesDialog'

class ItemView extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      operationsInfo: null,
      initialState: null,
      unsubscribe: "nada",
      addModal: false,
    });

    this.listenToFirebase = this.listenToFirebase.bind(this);
    this.listenToFirebase();
    this.modalOpenClose = this.modalOpenClose.bind(this);
  }

  listenToFirebase() {
    var unsub = Firebase.firestore().collection('operations').doc('items').onSnapshot((doc) => {
      // console.log("Current data: ", doc.data());
      if(this.state.userInfo === null) {
        this.setState({ initialState: doc.data() });
        console.log("updated initialState");
      }
      this.setState({
        operationsInfo: doc.data(),
        unsubscribe: unsub,
      });
    });
  }

  componentWillUnmount() {
    console.log("unmount unsub");
    this.state.unsubscribe();
  }

  modalOpenClose() {
    this.setState({
      addModal: !this.state.addModal,
    })
  }

  deleteCategory = () => {

  }

  render() {
    return (this.state.operationsInfo === null) ? (<CircularProgress/>) : (
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Service Fee Percentage"
                value={this.state.operationsInfo.service_fee_base_percentage}
                variant="outlined"
                fullWidth
                size="small"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Box borderRadius={4} border={1} borderColor="grey.400" style={{padding:"5px"}}>
            {this.state.operationsInfo.categories.map((category, index) => (
              <Chip key={index}
                avatar={
                  <Avatar src={category.https} alt="#"/>
                }
                label={category.name}
                size="medium"
                style={{margin:"3px"}}
                deleteIcon={<CloseIcon/>}
                onDelete={() => {console.log("delete")}}
              />
            ))}
            <Chip icon={<AddIcon/>} label="Add" color="secondary" clickable onClick={() => {this.modalOpenClose()}} />
            <CategoriesDialog open={this.state.addModal} close={this.modalOpenClose} />
          </Box>
        </Grid>
      </Grid>
    )
  }
}

export default ItemView;
