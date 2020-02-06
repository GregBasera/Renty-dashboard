import React from 'react'

import Firebase from '../Firebase'

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Header() {
  const classes = useStyles();

  const handleSignOut = (event) => {
    Firebase.auth().signOut();
    console.log("signout");
  }

  return (
    <div>
      <AppBar style={{backgroundColor:"#f06383"}}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Renty
          </Typography>
          <Button style={{backgroundColor:"#ce2458",color:"white"}} onClick={event => handleSignOut(event)}>Sign-out</Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header;
