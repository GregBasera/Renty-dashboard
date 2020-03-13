import React from 'react';

// import Grid from '@material-ui/core/Grid';
// import TextField from '@material-ui/core/TextField';
// import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import TfNoEdit from './TfNoEdit';
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
      this.setState({ operationsInfo: doc.data() });
    });
  }

  render() {
    return (this.state.operationsInfo === null) ? (<CircularProgress/>) : (
      <TableContainer>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell key="id" align="center">Identification</TableCell>
              <TableCell key="fcm" align="center">FCM Token</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell key="dummy" align="left">dummy text</TableCell>
              <TableCell key="dummy" align="left">dummy text</TableCell>
            </TableRow>
            <TableRow>
              <TableCell key="dummy" align="left">dummy text</TableCell>
              <TableCell key="dummy" align="left">dummy text</TableCell>
            </TableRow>
            <TableRow>
              <TableCell key="dummy" align="left">dummy text</TableCell>
              <TableCell key="dummy" align="left">dummy text</TableCell>
            </TableRow>
            <TableRow>
              <TableCell key="dummy" align="left">dummy text</TableCell>
              <TableCell key="dummy" align="left">dummy text</TableCell>
            </TableRow>
            <TableRow>
              <TableCell key="dummy" align="left">dummy text</TableCell>
              <TableCell key="dummy" align="left">dummy text</TableCell>
            </TableRow>
            <TableRow>
              <TableCell key="dummy" align="left">dummy text</TableCell>
              <TableCell key="dummy" align="left">dummy text</TableCell>
            </TableRow>
            <TableRow>
              <TableCell key="dummy" align="left">dummy text</TableCell>
              <TableCell key="dummy" align="left">dummy text</TableCell>
            </TableRow>
            <TableRow>
              <TableCell key="dummy" align="left">dummy text</TableCell>
              <TableCell key="dummy" align="left">dummy text</TableCell>
            </TableRow>
            <TableRow>
              <TableCell key="dummy" align="left">dummy text</TableCell>
              <TableCell key="dummy" align="left">dummy text</TableCell>
            </TableRow>
            <TableRow>
              <TableCell key="dummy" align="left">dummy text</TableCell>
              <TableCell key="dummy" align="left">dummy text</TableCell>
            </TableRow>
            <TableRow>
              <TableCell key="dummy" align="left">dummy text</TableCell>
              <TableCell key="dummy" align="left">dummy text</TableCell>
            </TableRow>
            <TableRow>
              <TableCell key="dummy" align="left">dummy text</TableCell>
              <TableCell key="dummy" align="left">dummy text</TableCell>
            </TableRow>
            <TableRow>
              <TableCell key="dummy" align="left">dummy text</TableCell>
              <TableCell key="dummy" align="left">dummy text</TableCell>
            </TableRow>
            <TableRow>
              <TableCell key="dummy" align="left">dummy text</TableCell>
              <TableCell key="dummy" align="left">dummy text</TableCell>
            </TableRow>
            <TableRow>
              <TableCell key="dummy" align="left">dummy text</TableCell>
              <TableCell key="dummy" align="left">dummy text</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    )
  }
}

export default Fcm;
