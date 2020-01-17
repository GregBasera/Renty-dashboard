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
