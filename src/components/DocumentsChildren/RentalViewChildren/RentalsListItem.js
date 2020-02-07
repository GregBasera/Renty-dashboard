import React from 'react';
import { useDispatch } from 'react-redux';
import { changeFieldView } from '../../../actions/collectionsActs';

// Layout
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

function RentalsListItem(props) {
  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const dispatch = useDispatch();

  const handleListItemClick = (event, index, id) => {
    setSelectedIndex(index);
    dispatch(changeFieldView(index, id));
  };

  return (
    <div>
      <Divider />
      {props.rentals.map((rental, index) =>
        {
          return (
            <div>
            <ListItem button selected={selectedIndex === index} onClick={event => handleListItemClick(event, index, rental.rent_id)}>
              <ListItemText primary={rental.renter} secondary={rental.lender} />
            </ListItem>
            <Divider />
            </div>
          )
        })
      }
    </div>
  );
}

export default RentalsListItem;
