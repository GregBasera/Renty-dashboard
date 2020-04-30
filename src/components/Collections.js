import React from 'react';
import { useDispatch } from 'react-redux';
import { changeDocView, changeFieldView } from '../actions/collectionsActs';

// Layout
// import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Chip from '@material-ui/core/Chip';
import ListItemText from '@material-ui/core/ListItemText';

// Icons
import ListItemIcon from '@material-ui/core/ListItemIcon';
import GroupIcon from '@material-ui/icons/Group';
// import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
// import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
// import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import DashboardIcon from '@material-ui/icons/Dashboard';
// import StoreIcon from '@material-ui/icons/Store';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
// import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// import ErrorIcon from '@material-ui/icons/Warning';
import PhonelinkRingIcon from '@material-ui/icons/PhonelinkRing';

function Collections(props) {
  // const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const dispatch = useDispatch();

  const handleListItemClick = (event, index, title, frbsColl) => {
    setSelectedIndex(index);
    dispatch(changeFieldView(0, null));
    dispatch(changeDocView(index, title, frbsColl));
  };

  return (
    <Container maxWidth="md" disableGutters style={{height:(props.head) ? "88vh": "100vh",overflowY:"auto"}}>
      <Typography variant="h6" style={{marginLeft:"10px", marginTop:"10px"}}>
        Collections
      </Typography>
      <hr size="1"/>

      <List component="nav" aria-label="Collections">
        <ListItem button selected={selectedIndex === 1} onClick={event => handleListItemClick(event, 1, 'All Rentals', 'rentals')} >
          <ListItemIcon>
            <ShoppingBasketIcon />
          </ListItemIcon>
          <ListItemText primary="Rentals" />
          <Chip variant="outlined" size="small" label="100" />
        </ListItem>

        <ListItem button selected={selectedIndex === 2} onClick={event => handleListItemClick(event, 2, 'All Items', 'items')} >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Items" />
        </ListItem>

        <ListItem button selected={selectedIndex === 3} onClick={event => handleListItemClick(event, 3, 'All Users', 'users')} >
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>

        <ListItem button selected={selectedIndex === 4} onClick={event => handleListItemClick(event, 4, 'Client App', null)} >
          <ListItemIcon>
            <PhonelinkRingIcon />
          </ListItemIcon>
          <ListItemText primary="Client App" />
        </ListItem>

        <ListItem button selected={selectedIndex === 5} onClick={event => handleListItemClick(event, 5, 'Operations', 'operations')} >
          <ListItemIcon>
            <PhonelinkRingIcon />
          </ListItemIcon>
          <ListItemText primary="Operations" />
        </ListItem>
      </List>
    </Container>
  );
}

export default Collections;
