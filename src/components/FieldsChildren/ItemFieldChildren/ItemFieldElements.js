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


const useStyles = makeStyles({
  media: {
    height: 140,
  },
});

function ItemFieldElements(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = props.info.pic.length;

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  return(
    <form noValidate autoComplete="off">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card style={{backgroundColor:"coral"}}>
            <CardMedia
              className={classes.media}
              image={props.info.pic[activeStep]}
              title="Contemplative Reptile"
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
        <Grid item xs={12}>
          <TextField
            id="item_name"
            label="Item Name"
            defaultValue={props.info.item_name}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="rent_rate">Rate</InputLabel>
            <OutlinedInput
              id="rent_rate"
              defaultValue={props.info.rent_rate}
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              labelWidth={40}
            />
          </FormControl>
        </Grid>
        <Grid item xs={8}>
          <TextField
            id="description"
            label="Description"
            multiline
            fullWidth
            rows="5"
            defaultValue={props.info.description}
            variant="outlined"
          />
        </Grid>
      </Grid>
    </form>
  )
}

export default ItemFieldElements;
