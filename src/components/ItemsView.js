import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

// Icons
import GroupIcon from '@material-ui/icons/Group';

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
}));

function ItemsView() {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const handleListItemClick = (event, index, title) => {
    setSelectedIndex(index);
  };

  return(
    <div>
      <List component="nav" aria-label="Collections" dense="true">
        <ListItem button selected={selectedIndex === 1} onClick={event => handleListItemClick(event, 1, 'All Rentals')} >
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary="Rentals" />
        </ListItem>
        <ListItem button selected={selectedIndex === 2} onClick={event => handleListItemClick(event, 2, 'All Rentals')} >
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary="Rentals" />
        </ListItem>
        <ListItem button selected={selectedIndex === 3} onClick={event => handleListItemClick(event, 3, 'All Rentals')} >
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary="Rentals" />
        </ListItem>
      </List>
    </div>
  )
}

export default ItemsView;
