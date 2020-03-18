import React from 'react';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
// import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';

// import TfNoEdit from './TfNoEdit';
import Firebase from './../../../Firebase';
import CircularProgress from '@material-ui/core/CircularProgress';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

class Fcm extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      fcmInfo: null,
      initialState: null,
      androidCollapse: false,
      iOSCollapse: false,
      unsubscribe: "nada"
    });

    this.listenToFirebase = this.listenToFirebase.bind(this);
    this.listenToFirebase();
    this.collapseChanges = this.collapseChanges.bind(this);
  }

  listenToFirebase() {
    var unsub = Firebase.firestore().collection('operations').doc('blast').onSnapshot((doc) => {
      // console.log("snapshot");
      if(this.state.userInfo === null) {
        this.setState({ initialState: doc.data() });
        console.log("updated initialState");
      }
      this.setState({
        fcmInfo: doc.data(),
        unsubscribe: unsub,
      });
    });
  }

  componentWillUnmount() {
    console.log("unmount unsub");
    this.state.unsubscribe();
  }

  collapseChanges(platform, newState) {
    switch (platform) {
      case 'android':
        this.setState({
          androidCollapse: newState,
        });
        break;
      case 'iOS':
        this.setState({
          iOSCollapse: newState,
        });
        break;
      default:
        return null;
    }
  }

  render() {
    return (this.state.fcmInfo === null) ? (<CircularProgress/>) : (
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Body"
              variant="outlined"
              fullWidth
              multiline
              rows="5"
            />
          </Grid>
          <Grid item xs={12} style={{display:"flex",justifyContent:"center"}}>
            <FormControlLabel
              control={<Checkbox color="primary" />}
              label="Android"
              labelPlacement="end"
            />
            <FormControlLabel
              control={<Checkbox color="primary" />}
              label="iOS"
              labelPlacement="end"
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="secondary" fullWidth> send to users </Button>
          </Grid>
        </Grid>

        <Collapse in={this.state.androidCollapse} collapsedHeight={40}>
          <TableContainer style={{marginTop:"10px"}}>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell key="fcm" align="center">
                    All Android users FCM Tokens
                    <IconButton size="small" onClick={() => {this.collapseChanges('android', !this.state.androidCollapse)}}>
                      <ArrowDropDownIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.fcmInfo.android.map((token, index) => (
                  <TableRow key={index}>
                    <TableCell key={index} align="left">
                      {token.substring(0, 25) + " ... " + token.substring(token.length - 25, token.length)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Collapse>

        <Collapse in={this.state.iOSCollapse} collapsedHeight={40}>
          <TableContainer>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell key="fcm" align="center">
                    All iOS users FCM Tokens
                    <IconButton size="small" onClick={() => {this.collapseChanges('iOS', !this.state.iOSCollapse)}}>
                      <ArrowDropDownIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.fcmInfo.iOS.map((token, index) => (
                  <TableRow key={index}>
                    <TableCell key={index} align="left">
                      {token.substring(0, 25) + " ... " + token.substring(token.length - 25, token.length)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Collapse>
      </div>
    )
  }
}

export default Fcm;
