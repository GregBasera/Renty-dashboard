import React from 'react'

import Firebase from '../Firebase'

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

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

function Header(props) {
  const classes = useStyles();

  const handleSignOut = (event) => {
    Firebase.auth().signOut();
    console.log("signout");
  }

  return (
    <div>

      <Slide direction="right" in={props.show} mountOnEnter unmountOnExit>
        <AppBar style={{backgroundColor:"#f06383"}}>
          <Toolbar variant="dense">
            <Typography variant="h6" className={classes.title}>
              Renty
            </Typography>
            <Button style={{backgroundColor:"#ce2458",color:"white"}} onClick={event => handleSignOut(event)}>Sign-out</Button>
            <IconButton size="small" style={{marginLeft:"5px",backgroundColor:"#ce2458",color:"white"}} onClick={() => {props.changes(false)}}>
              <KeyboardArrowLeftIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Slide>
    </div>
  )
}

export default Header;
