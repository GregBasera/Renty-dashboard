import React from 'react';

// Layout
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';


const useStyles = makeStyles({
  media: {
    height: 140,
  },
});

function ItemFieldElements(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = props.info.pictures.length;
  const [checked, setChecked] = React.useState(false);

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };
  const toggleChecked = () => {
    setChecked(prev => !prev);
  };

  return(
    <form noValidate autoComplete="off">
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <FormControlLabel
            control={<Switch checked={checked} onChange={toggleChecked} />}
            label="Approved"
          />
        </Grid>
        <Grid item xs={9}>
          <TextField
            id="item_name"
            label="Item Name"
            defaultValue={(props.info.item_name) ? props.info.item_name : "--"}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={5}>
          <Card style={{backgroundColor:"#c3c3c3"}}>
            <CardMedia
              className={classes.media}
              image={props.info.pictures[activeStep].https}
              title="pictures"
            />
            <MobileStepper
              steps={maxSteps}
              position="static"
              variant="text"
              activeStep={activeStep}
              nextButton={
                <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                  Next
                  {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </Button>
              }
              backButton={
                <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                  {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                  Back
                </Button>
              }
            />
          </Card>
        </Grid>
        <Grid item xs={7}>
          <TextField
            id="description"
            label="Description"
            multiline
            fullWidth
            rows="7"
            defaultValue={(props.info.description) ? props.info.description : "--"}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="lender"
            label="Lender"
            defaultValue={(props.info.lender) ? props.info.lender : "--"}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="rent_rate">Lender's Rate</InputLabel>
          <OutlinedInput
          id="rent_rate"
          defaultValue={(props.info.rent_rate) ? props.info.rent_rate : "--"}
          startAdornment={<InputAdornment position="start">₱</InputAdornment>}
          labelWidth={95}
          />
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="service_fee">Service Fee</InputLabel>
          <OutlinedInput
          id="service_fee"
          defaultValue={20}
          endAdornment={<InputAdornment position="end">%</InputAdornment>}
          labelWidth={85}
          />
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="price-in-store">In-store Price</InputLabel>
          <OutlinedInput
          id="price-in-store"
          defaultValue={212121}
          startAdornment={<InputAdornment position="start">₱</InputAdornment>}
          labelWidth={100}
          />
          </FormControl>
        </Grid>
      </Grid>
    </form>
  )
}

export default ItemFieldElements;
