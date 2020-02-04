import React from 'react';

// Layout
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

function ItemFieldElements(props) {
  console.log(props.info.pic);
  return(
    <form noValidate autoComplete="off">
      <Grid container spacing={1} style={{width:"100%"}}>
        <Grid item xs={6}>
          <TextField
            id="item_name"
            label="Item Name"
            value={props.info.item_name}
            variant="outlined"
            fullWidth={true}
          />
        </Grid>
        <Grid item xs={12}>
          <img src={props.info.pic} alt="pics"/>
        </Grid>
      </Grid>
    </form>
  )
}

export default ItemFieldElements;
