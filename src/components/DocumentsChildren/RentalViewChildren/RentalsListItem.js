import React from 'react';
import { useDispatch } from 'react-redux';
import { changeFieldView } from '../../../actions/collectionsActs';

// Layout
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';

function RentalsListItem(props) {
  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const dispatch = useDispatch();
  const steps = ["Processing Req", "Item to HQ", "HQ Check", "Item to Renter", "Renter Received",
  "Contract Over", "Item to HQ", "HQ Check", "Item to Lender", "Lender Received"]

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
              <Grid container spacing={0}>
                <Grid item xs={12}>
                  <ListItemText primary={
                    <React.Fragment>
                      <Typography variant="subtitle1" component="span" color="textSecondary">
                        {"Item: "}
                      </Typography>
                      <Typography variant="subtitle1" component="span" color="textPrimary">
                        {rental.item}
                      </Typography>
                    </React.Fragment>
                  } secondary={
                    <React.Fragment>
                      <Typography variant="caption" component="span" color="textSecondary">
                        {"Lender: "}
                      </Typography>
                      <Typography variant="caption" component="span" color="textPrimary">
                        {rental.lender}
                      </Typography>
                      <Typography variant="caption" component="span" style={{color:"red"}}>
                        {" → "}
                      </Typography>
                      <Typography variant="caption" component="span" color="textSecondary">
                        {"Renter: "}
                      </Typography>
                      <Typography variant="caption" component="span" color="textPrimary">
                        {rental.renter}
                      </Typography>
                    </React.Fragment>
                  } />
                </Grid>
                <Grid item xs={12}>
                  <LinearProgress variant="determinate" value={(rental.status === null) ? 0 : (rental.status)*10} color="primary" style={{margin:"5px 0px"}}/>
                  <Typography variant="subtitle2" align="right" color="textSecondary">
                  {(rental.status === null) ? "Pending..." : (rental.status === 10) ? "Finished" : "[ " + (rental.status+1) + " ] - " + steps[rental.status]}
                  </Typography>
                </Grid>
              </Grid>
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
