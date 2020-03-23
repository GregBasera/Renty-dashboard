import React from 'react';
import { useDispatch } from 'react-redux';
import { changeFieldView } from '../../../actions/collectionsActs';

// Layout
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

// Icons
import PersonIcon from '@material-ui/icons/Person';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import DeleteIcon from '@material-ui/icons/Delete';

function UsersListItem(props) {
  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const dispatch = useDispatch();

  const handleListItemClick = (event, index, user_id) => {
    setSelectedIndex(index);
    dispatch(changeFieldView(index, user_id));
  };

  return(
    <div>
      <Divider />
      {props.users.map((user, index) => {
        return (
          <React.Fragment key={user.user_id}>
          <ListItem button selected={selectedIndex === index} onClick={event => handleListItemClick(event, index, user.user_id)}>
            <ListItemAvatar>
              <Avatar>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={
              <Typography variant="subtitle1">
                {user.name}
              </Typography>
            } secondary={
              <React.Fragment>
                <Typography variant="caption">
                  {user.user_id}
                </Typography>
                <Typography variant="subtitle1" component="span">
                  {" | "}
                </Typography>
                <Typography variant="caption">
                  {user.phone}
                </Typography>
              </React.Fragment>
            } />
            <ListItemSecondaryAction>
              <Tooltip placement="right" title="Verified">
                <IconButton size="small">
                  <VerifiedUserIcon style={{color:"#ce2458"}}/>
                </IconButton>
              </Tooltip>
              <Tooltip placement="right" title="Delete">
                <IconButton size="small" onClick={() => {props.deletion(user.user_id)}}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default UsersListItem;

// <ListItem button selected={selected === index} onClick={() => this.updateSelected(index)}>
