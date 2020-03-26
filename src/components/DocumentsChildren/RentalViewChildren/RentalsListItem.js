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
import Tooltip from '@material-ui/core/Tooltip';

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import DoneAllIcon from '@material-ui/icons/DoneAll';

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
      {props.rentals.map((rental, index) => (
        <React.Fragment key={rental.rent_id}>
          <ListItem button selected={selectedIndex === index} onClick={event => handleListItemClick(event, index, rental.rent_id)}>
            <Grid container spacing={0} justify="space-between">
              <Grid item xs="auto">
                <Typography variant="subtitle1" component="span" color="textSecondary">
                  {"Rent-ID: "}
                </Typography>
                <Typography variant="subtitle1" component="span" color="textPrimary">
                  {rental.rent_id}
                </Typography>
              </Grid>
              {(rental.seen) ? (
                <Grid item xs="auto">
                  <Tooltip title="Seen" placement="right">
                    <DoneAllIcon fontSize="small" style={{color:"forestgreen"}}/>
                  </Tooltip>
                </Grid>) : null}
              <Grid item xs={12}>
                <Tooltip title="Lender" placement="left">
                  <Typography variant="caption" component="span" color="textSecondary">
                    {rental.lender}
                  </Typography>
                </Tooltip>
                <Typography variant="caption" component="span" style={{color:"red"}}>
                  <ArrowForwardIcon style={{height:"10px"}} />
                </Typography>
                <Tooltip title="Renter" placement="right">
                  <Typography variant="caption" component="span" color="textSecondary">
                    {rental.renter}
                  </Typography>
                </Tooltip>
              </Grid>
              <Grid item xs={12}>
                <LinearProgress
                  variant="determinate"
                  value={(rental.status === null) ? 0 : (rental.status/11)*100}
                  color="primary"
                  style={{margin:"5px 0px"}}
                />
                <Typography variant="subtitle2" align="right" color="textSecondary">
                {(rental.status === null) ? "Pending..." : (rental.status === 11) ? "Finished" : steps[rental.status]}
                </Typography>
              </Grid>
            </Grid>
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
    </div>
  );
}

export default RentalsListItem;
