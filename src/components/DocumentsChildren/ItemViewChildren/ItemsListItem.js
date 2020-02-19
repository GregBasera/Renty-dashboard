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

import Icon from '@material-ui/core/Icon';
import BeenhereIcon from '@material-ui/icons/Beenhere';
import HelpIcon from '@material-ui/icons/Help';

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
                <React.Fragment>
                <Typography variant="caption">
                  {item.item_id}
                </Typography>
                <Typography variant="subtitle1" component="span">
                  {" | "}
                </Typography>
                <Typography variant="caption">
                  {item.date_entered.toDate().toLocaleDateString("en-US", { year: 'numeric', month: 'numeric', day: 'numeric' })}
                </Typography>
                </React.Fragment>
              } />
              <ListItemSecondaryAction>
                <Typography variant="caption" style={{color:(item.is_approved) ? "forestgreen" : "orange"}}>
                  {(item.is_approved) ? <Icon ><BeenhereIcon /></Icon> : <Icon ><HelpIcon /></Icon>}
                </Typography>
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
