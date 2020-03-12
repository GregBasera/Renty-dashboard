import React from 'react';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';

import TfNoEdit from './TfNoEdit';

function ItemView(props) {
  return(
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Service Fee Percentage"
              value={props.data.service_fee_base_percentage}
              variant="outlined"
              fullWidth
              size="small"
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={6}>
        <Box borderRadius={4} border={1} borderColor="grey.400" style={{padding:"5px"}}>
          {props.data.categories.map(function(category, index) {
            return(<TfNoEdit key={index} value={category.name} />);
          })}
        </Box>
      </Grid>
    </Grid>
  )
}

export default ItemView;
