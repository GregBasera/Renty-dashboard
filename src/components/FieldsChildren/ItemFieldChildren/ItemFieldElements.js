import React from 'react';
import { useForm } from 'react-hook-form';

// Layout
import { useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import MobileStepper from '@material-ui/core/MobileStepper';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import warning from './warning_sign.png';

function ItemFieldElements(props) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = (props.info.pictures) ? props.info.pictures.length : 1;
  const [checked, setChecked] = React.useState((props.info.is_approved) ? props.info.is_approved : false);

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };
  const toggleChecked = () => {
    setChecked(prev => !prev);
  };

  const { handleSubmit, register } = useForm();
  const onSubmit = values => {
    console.log(values);
  };

  return(
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <FormControlLabel
            control={
              <Switch checked={checked} onChange={toggleChecked} />
            }
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
            name="item_name"
            inputRef={register}
          />
        </Grid>
        <Grid item xs={5}>
          <Card style={{backgroundColor:"#c3c3c3"}}>
            <CardMedia
              style={{height:"200px"}}
              image={(props.info.pictures) ? props.info.pictures[activeStep].https : warning}
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
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="description"
                label="Description"
                multiline
                fullWidth
                rows="7"
                defaultValue={(props.info.description) ? props.info.description : "--"}
                variant="outlined"
                name="description"
                name="description"
                inputRef={register}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="lender"
                label="Lender"
                defaultValue={(props.info.lender) ? props.info.lender : "--"}
                variant="outlined"
                fullWidth
                name="lender"
                inputRef={register}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <TextField
            id="lenders_rate"
            label="Lender Rate (₱)"
            defaultValue={(props.info.rent_rate) ? props.info.rent_rate : "--"}
            variant="outlined"
            fullWidth
            name="lenders_rate"
            inputRef={register}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            id="rent_type"
            label="Span"
            defaultValue={(props.info.rent_type) ? props.info.rent_type : "--"}
            variant="outlined"
            fullWidth
            name="rent_type"
            inputRef={register}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            id="service_fee"
            label="Service Fee (%)"
            defaultValue={(props.info.service_fee) ? props.info.service_fee : "--"}
            variant="outlined"
            fullWidth
            name="service_fee"
            inputRef={register}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            id="in_store_price"
            label="In-store (₱)"
            defaultValue={(props.info.in_store_price) ? props.info.in_store_price : "--"}
            variant="outlined"
            fullWidth
            name="in_store_price"
            inputRef={register}
          />
        </Grid>
      </Grid>
      <ButtonBase type="submit">
        <Button variant="contained" color="primary">
          Submit
        </Button>
      </ButtonBase>
    </form>
  )
}

export default ItemFieldElements;
