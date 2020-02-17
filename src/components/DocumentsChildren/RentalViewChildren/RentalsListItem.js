import React from 'react';
import { useDispatch } from 'react-redux';
import { changeFieldView } from '../../../actions/collectionsActs';

// Layout
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

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
            <React.Fragment key={rental.rent_id}>
            <ListItem button selected={selectedIndex === index} onClick={event => handleListItemClick(event, index, rental.rent_id)}>
              <ListItemText primary={
                <Typography variant="subtitle1">
                  {rental.item}
                </Typography>
              } secondary={
                <React.Fragment>
                  <Typography variant="caption">
                    {"Lender: " + rental.lender}
                  </Typography>
                  <Typography variant="subtitle1" component="span">
                    {" → "}
                  </Typography>
                  <Typography variant="caption">
                    {"Renter: " + rental.renter}
                  </Typography>
                </React.Fragment>
              } />
            </ListItem>
            <Divider />
            </React.Fragment>
          )
        })
      }
    </div>
  );
}

export default RentalsListItem;
