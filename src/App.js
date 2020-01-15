import './App.css';
import React from 'react';

// Layout
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

// Components
import Header from './components/Header';
import Collections from './components/Collections';
import Documents from './components/Documents';
import Fields from './components/Fields';

import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyBeLsH834-Te4Jsrc9fazNiKwiAtJIxh9o",
  authDomain: "gregle.firebaseapp.com",
  databaseURL: "https://gregle.firebaseio.com",
  projectId: "gregle",
  storageBucket: "gregle.appspot.com",
  messagingSenderId: "732514209548",
  appId: "1:732514209548:web:b22c574c31301470bf0329",
  measurementId: "G-EF4LJDKNHJ"
};
const db = firebase.initializeApp(config);
var listen = db.firestore().collection('items').doc('H1cnFUQoyhQGDVh8lKSx');
console.log(listen);

// var name = listen.onSnapshot(doc => {
//   const data = doc.data();
//   // document.write(data.name + "<br>")
// })

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={0} style={{height:"100vh"}}>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper} variant="outlined">
            <Collections />
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper} variant="outlined">
            <Documents />
          </Paper>
        </Grid>
        <Grid item xs={5}>
          <Paper className={classes.paper} variant="outlined">
            <Fields />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
