import React from 'react';
import { useDispatch } from 'react-redux';
import { changeFieldView } from '../../../actions/collectionsActs';

// Layout
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

function ItemsListItem(props) {
  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const dispatch = useDispatch();

  const handleListItemClick = (event, index, id) => {
    setSelectedIndex(index);
    dispatch(changeFieldView(index, id));
  };

  return(
    <div>
      <Divider />
      {props.items.map((item, index) =>
        {
          return (
            <div key={item.item_id}>
            <ListItem key={item.item_id} selected={selectedIndex === index} onClick={event => handleListItemClick(event, index, item.item_id)}>
              <ListItemText key={item.item_id} primary={
                <Typography variant="h6">
                  {item.item_name}
                </Typography>
              } secondary={
                <Typography variant="subtitle2" style={{color:(item.is_approved) ? "limegreen" : "tomato"}}>
                  {(item.is_approved) ? "Approved" : "Not Approved"}
                </Typography>
              } />
              <ListItemSecondaryAction key={item.item_id}>
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
            </div>
          )
        })
      }
    </div>
  )
}

export default ItemsListItem;
