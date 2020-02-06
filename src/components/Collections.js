import React from 'react';
import { useDispatch } from 'react-redux';
import { changeDocView } from '../actions/collectionsActs';

// Layout
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Chip from '@material-ui/core/Chip';
import ListItemText from '@material-ui/core/ListItemText';

// Icons
import ListItemIcon from '@material-ui/core/ListItemIcon';
import GroupIcon from '@material-ui/icons/Group';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import DashboardIcon from '@material-ui/icons/Dashboard';
import StoreIcon from '@material-ui/icons/Store';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ErrorIcon from '@material-ui/icons/Warning';
import PhonelinkRingIcon from '@material-ui/icons/PhonelinkRing';

const useStyles = makeStyles(theme => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

function Collections() {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const dispatch = useDispatch();

  const handleListItemClick = (event, index, title, frbsColl) => {
    setSelectedIndex(index);
    dispatch(changeDocView(index, title, frbsColl));
  };

  return (
    <Container maxWidth="md" disableGutters style={{height:"85vh",overflowY:"auto"}}>
      <Typography variant="h6" style={{marginLeft:"10px"}}>
        Collections
      </Typography>
      <hr size="1"/>

      <List component="nav" aria-label="Collections" dense={true}>
        <ListItem button selected={selectedIndex === 1} onClick={event => handleListItemClick(event, 1, 'All Rentals', 'rentals')} >
          <ListItemIcon>
            <ShoppingBasketIcon />
          </ListItemIcon>
          <ListItemText primary="Rentals" />
          <Chip variant="outlined" size="small" label="100" />
        </ListItem>
        <ListItem button className={classes.nested} selected={selectedIndex === 2} onClick={event => handleListItemClick(event, 2, 'Due', 'rentals')} >
          <ListItemIcon>
            <ErrorIcon />
          </ListItemIcon>
          <ListItemText primary="Due" />
        </ListItem>
        <ListItem button className={classes.nested} selected={selectedIndex === 3} onClick={event => handleListItemClick(event, 3, 'Pending', 'rentals')} >
          <ListItemIcon>
            <HourglassEmptyIcon />
          </ListItemIcon>
          <ListItemText primary="Pending" />
        </ListItem>
        <ListItem button className={classes.nested} selected={selectedIndex === 4} onClick={event => handleListItemClick(event, 4, 'Leased', 'rentals')} >
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Leased" />
        </ListItem>

        <ListItem button selected={selectedIndex === 5} onClick={event => handleListItemClick(event, 5, 'All Items', 'items')} >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Items" />
        </ListItem>
        <ListItem button className={classes.nested} selected={selectedIndex === 6} onClick={event => handleListItemClick(event, 6, 'In App', 'items')} >
          <ListItemIcon>
            <StoreIcon />
          </ListItemIcon>
          <ListItemText primary="In-App" />
        </ListItem>
        <ListItem button className={classes.nested} selected={selectedIndex === 7} onClick={event => handleListItemClick(event, 7, 'For-Approval', 'items')} >
          <ListItemIcon>
            <HourglassEmptyIcon />
          </ListItemIcon>
          <ListItemText primary="For-Approval" />
        </ListItem>

        <ListItem button selected={selectedIndex === 8} onClick={event => handleListItemClick(event, 8, 'All Users', 'users')} >
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>
        <ListItem button className={classes.nested} selected={selectedIndex === 9} onClick={event => handleListItemClick(event, 9, 'Verified', 'users')}>
          <ListItemIcon>
            <VerifiedUserIcon />
          </ListItemIcon>
          <ListItemText primary="Verified" />
        </ListItem>
        <ListItem button className={classes.nested} selected={selectedIndex === 10} onClick={event => handleListItemClick(event, 10, 'Pending', 'users')}>
          <ListItemIcon>
            <HourglassEmptyIcon />
          </ListItemIcon>
          <ListItemText primary="Pending" />
        </ListItem>
        <ListItem button className={classes.nested} selected={selectedIndex === 11} onClick={event => handleListItemClick(event, 11, 'Not Verified', 'users')}>
          <ListItemIcon>
            <ErrorOutlineIcon />
          </ListItemIcon>
          <ListItemText primary="Not Verified" />
        </ListItem>

        <ListItem button selected={selectedIndex === 12} onClick={event => handleListItemClick(event, 12, 'Client App', null)} >
          <ListItemIcon>
            <PhonelinkRingIcon />
          </ListItemIcon>
          <ListItemText primary="Client App" />
        </ListItem>
      </List>
    </Container>
  );
}

export default Collections;
