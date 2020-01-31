import React from 'react';
import { useDispatch } from 'react-redux';
import { changeFieldView } from '../actions/collectionsActs';

// Layout
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

// Icons
import PersonIcon from '@material-ui/icons/Person';

function UsersListItem(props) {
  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const dispatch = useDispatch();

  const handleListItemClick = (event, index, user_id) => {
    setSelectedIndex(index);
    dispatch(changeFieldView(index, user_id));
  };
  
  return(
    <div>
      {props.users.map((user, index) =>
        {
          return (
            <div>
            <ListItem button selected={selectedIndex === index} onClick={event => handleListItemClick(event, index, user.user_id)}>
              <ListItemAvatar>
                <Avatar>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={user.name} secondary={user.phone} />
            </ListItem>
            <Divider />
            </div>
          )
        })
      }
    </div>
  )
}

export default UsersListItem;

// <ListItem button selected={selected === index} onClick={() => this.updateSelected(index)}>
