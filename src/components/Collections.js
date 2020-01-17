import React from 'react';
import { useDispatch } from 'react-redux';
import { changeDocView } from '../actions/collectionsActs';

// Layout
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
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
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

function Collections() {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const dispatch = useDispatch();

  const handleListItemClick = (event, index, title) => {
    setSelectedIndex(index);
    dispatch(changeDocView(index, title));
  };

  return (
    <Container maxWidth="md" disableGutters="true" style={{height:"90vh",overflowY:"auto"}}>
      <Typography variant="h6" style={{marginLeft:"10px"}}>
        Collections
      </Typography>
      <hr size="1"/>

      <List component="nav" aria-label="Collections" dense="true">
        <ListItem button selected={selectedIndex === 1} onClick={event => handleListItemClick(event, 1, 'All Rentals')} >
          <ListItemIcon>
            <ShoppingBasketIcon />
          </ListItemIcon>
          <ListItemText primary="Rentals" />
        </ListItem>
        <ListItem button className={classes.nested} selected={selectedIndex === 2} onClick={event => handleListItemClick(event, 2, 'Due')} >
          <ListItemIcon>
            <ErrorIcon />
          </ListItemIcon>
          <ListItemText primary="Due" />
        </ListItem>
        <ListItem button className={classes.nested} selected={selectedIndex === 3} onClick={event => handleListItemClick(event, 3, 'Pending')} >
          <ListItemIcon>
            <HourglassEmptyIcon />
          </ListItemIcon>
          <ListItemText primary="Pending" />
        </ListItem>
        <ListItem button className={classes.nested} selected={selectedIndex === 4} onClick={event => handleListItemClick(event, 4, 'Leased')} >
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Leased" />
        </ListItem>

        <ListItem button selected={selectedIndex === 5} onClick={event => handleListItemClick(event, 5, 'All Items')} >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Items" />
        </ListItem>
        <ListItem button className={classes.nested} selected={selectedIndex === 6} onClick={event => handleListItemClick(event, 6, 'In App')} >
          <ListItemIcon>
            <StoreIcon />
          </ListItemIcon>
          <ListItemText primary="In-App" />
        </ListItem>
        <ListItem button className={classes.nested} selected={selectedIndex === 7} onClick={event => handleListItemClick(event, 7, 'For-Approval')} >
          <ListItemIcon>
            <HourglassEmptyIcon />
          </ListItemIcon>
          <ListItemText primary="For-Approval" />
        </ListItem>

        <ListItem button selected={selectedIndex === 8} onClick={event => handleListItemClick(event, 8, 'All Users')} >
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>
        <ListItem button className={classes.nested} selected={selectedIndex === 9} onClick={event => handleListItemClick(event, 9, 'Verified')}>
          <ListItemIcon>
            <VerifiedUserIcon />
          </ListItemIcon>
          <ListItemText primary="Verified" />
        </ListItem>
        <ListItem button className={classes.nested} selected={selectedIndex === 10} onClick={event => handleListItemClick(event, 10, 'Pending')}>
          <ListItemIcon>
            <HourglassEmptyIcon />
          </ListItemIcon>
          <ListItemText primary="Pending" />
        </ListItem>
        <ListItem button className={classes.nested} selected={selectedIndex === 11} onClick={event => handleListItemClick(event, 11, 'Not Verified')}>
          <ListItemIcon>
            <ErrorOutlineIcon />
          </ListItemIcon>
          <ListItemText primary="Not Verified" />
        </ListItem>

        <ListItem button selected={selectedIndex === 8} onClick={event => handleListItemClick(event, 8, 'All Users')} >
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
