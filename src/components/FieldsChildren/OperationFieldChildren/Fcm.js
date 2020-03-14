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

// import TfNoEdit from './TfNoEdit';
import Firebase from './../../../Firebase';
import CircularProgress from '@material-ui/core/CircularProgress';

class Fcm extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      fcmInfo: null,
      initialState: null,
    });

    this.listenToFirebase = this.listenToFirebase.bind(this);
    this.listenToFirebase();
  }

  listenToFirebase() {
    Firebase.firestore().collection('operations').doc('blast').onSnapshot((doc) => {
      // console.log("Current data: ", doc.data());
      if(this.state.userInfo === null) {
        this.setState({ initialState: doc.data() });
        console.log("updated initialState");
      }
      this.setState({ fcmInfo: doc.data() });
    });
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

        <TableContainer style={{marginTop:"10px"}}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell key="fcm" align="center">All Android users FCM Tokens</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.fcmInfo.android.map((token, index) => (
                <TableRow>
                  <TableCell key={index} align="left">
                    {token.substring(0, 25) + " ... " + token.substring(token.length - 25, token.length)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TableContainer>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell key="fcm" align="center">All iOS users FCM Tokens</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.fcmInfo.iOS.map((token, index) => (
                <TableRow>
                  <TableCell key={index} align="left">
                    {token.substring(0, 25) + " ... " + token.substring(token.length - 25, token.length)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    )
  }
}

export default Fcm;
