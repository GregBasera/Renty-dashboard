import React from 'react';
import { useDispatch } from 'react-redux';
import { changeFieldView } from '../../../actions/collectionsActs';

// Layout
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

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
            <div>
            <ListItem button selected={selectedIndex === index} onClick={event => handleListItemClick(event, index, item.item_id)}>
              <ListItemText primary={item.item_name} secondary={item.rent_rate} />
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
