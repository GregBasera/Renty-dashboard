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
            <React.Fragment key={item.item_id}>
            <ListItem selected={selectedIndex === index} onClick={event => handleListItemClick(event, index, item.item_id)}>
              <ListItemText primary={
                <Typography variant="subtitle1">
                  {item.item_name}
                </Typography>
              } secondary={
                <div>
                <Typography variant="caption">
                  {item.date_entered.toDate().toLocaleDateString("en-US", { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
                </Typography>
                <Typography variant="subtitle1" component="span">
                  {" | "}
                </Typography>
                <Typography variant="overline" style={{color:(item.is_approved) ? "forestgreen" : "crimson"}}>
                  {(item.is_approved) ? "Approved" : "Not Approved"}
                </Typography>
                </div>
              } />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
            </React.Fragment>
          )
        })
      }
    </div>
  )
}

export default ItemsListItem;
